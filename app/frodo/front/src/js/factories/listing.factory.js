(function(){
    angular.module('frodo').service('listingFactory', ListingFactory);

    ListingFactory.$inject = ['$state', '$injector', '$timeout', '$rootScope', '$mdDialog', '$filter', 'filesService'];

    function ListingFactory($state, $injector, $timeout, $rootScope, $mdDialog, $filter, filesService){

        function setRange(modelData, id, dates){
            var values = [];
            modelData.posts.forEach(function(post){
               values.push(post.data[id]);
            });
            values = values.filter(function(value){
                return value !== undefined && value !== null;
            });
            if(!values.length){
                return undefined;
            }
            values = $filter('orderBy')(values);
            return dates ? [new Date(values[0]), new Date(values[values.length - 1])] : [Math.floor(values[0]), Math.ceil(values[values.length - 1])];
        }

        function createFilters(modelData){
            if($state.current.name !== 'posts'){
                return {
                    textFilter: {
                        type: 'text',
                        value: undefined
                    }
                }
            }
            if(!modelData.fields.length){
                return undefined;
            }
            var checkboxes = {type: 'checkbox', fields: []};
            var numbers = {type: 'number', fields: []};
            var selects = {type: 'select', fields: []};
            var dates = {type: 'date', fields: []};
            var catalogues = {type: 'catalogue', fields: []};

            var filterableFields = ['checkbox', 'number', 'select', 'date', 'catalogue'];

            modelData.fields.forEach(function(field){
               if(filterableFields.indexOf(field.type) > -1){
                   var filterField = {
                       id: field.id,
                       title: field.title
                   };
                   switch(field.type){
                       case 'checkbox':
                           filterField.value = 'all';
                           checkboxes.fields.push(filterField);
                           break;
                       case 'number':
                           filterField.range = setRange(modelData, filterField.id);
                           if(filterField.range){
                               filterField.minValue = filterField.range[0];
                               filterField.maxValue = filterField.range[1];
                               numbers.fields.push(filterField);
                           }
                           break;
                       case 'select':
                           filterField.options = field.options;
                           filterField.values = [];
                           selects.fields.push(filterField);
                           break;
                       case 'date':
                           filterField.range = setRange(modelData, filterField.id, true);
                           if(filterField.range){
                               filterField.minValue = filterField.range[0];
                               filterField.maxValue = filterField.range[1];
                               dates.fields.push(filterField);
                           }
                           break;
                       case 'catalogue':
                           filterField.options = filesService.getCatalogues();
                           filterField.values = [];
                           catalogues.fields.push(filterField);
                           break;
                   }
               }
            });

            return {
                textFilter: {
                    type: 'text',
                    value: undefined
                },
                checkboxes: checkboxes,
                numbers: numbers,
                selects: selects,
                dates: dates,
                catalogues: catalogues
            };
        }

        function resetFilters(filters, type){
            filters.textFilter.value = undefined;
            if(type !== 'posts'){
                return;
            }
            filters.checkboxes.fields.forEach(function(field){
                field.value = 'all';
            });
            filters.numbers.fields.forEach(function(field){
                field.minValue = field.range[0];
                field.maxValue = field.range[1];
            });
            filters.selects.fields.forEach(function(field){
                field.values = [];
            });
            filters.dates.fields.forEach(function(field){
                field.minValue = field.range[0];
                field.maxValue = field.range[1];
            });
            filters.catalogues.fields.forEach(function(field){
                field.values = [];
            })

        }

        function onRemoveError(error, ev){
            $mdDialog.show(
                $mdDialog.alert()
                    .parent(angular.element(document.querySelector('body')))
                    .clickOutsideToClose(true)
                    .textContent(error)
                    .ariaLabel('Error dialog')
                    .ok('Ok')
                    .targetEvent(ev)
            )
        }

        function createSort(listing, fields){
            var sort = {
                sortBy: function(varName){
                    this.currentType = varName;
                    sessionStorage.setItem('sorting.' + listing.id, varName);
                },
                currentType: sessionStorage.getItem('sorting.' + listing.id) || 'created',
                types: [{name: 'newest', varName: '-created'},{name: 'oldest', varName: 'created'}, {name: 'title', varName: 'title'}]
            };

            if(listing.type === 'posts'){
                var sortingFields = ['text','checkbox','select','number', 'date', 'catalogue'];
                fields.forEach(function(field){
                    if(sortingFields.indexOf(field.type) > -1){
                        var negative = '';
                        if(field.type === 'checkbox') negative = '-';
                        sort.types.push({name: field.title, varName: negative + 'data.' + field.id});
                    }
                })
            }
            return sort;
        }

        function createListing(model){
            var listing = {
                type: $state.current.name,
                models: model.data.posts || model.data,
                id: model.data.id || $state.current.name,
                add : function(){
                    $state.go(this.type + 'Add', this.postType ? {type: this.postType} : undefined);
                },
                postTypeEdit: function(){
                    $state.go('postTypesEdit', {id: this.postTypeId})
                },
                apiService: $injector.get($state.current.name + 'Service'),
                removeStatus: undefined,
                setRemoveStatus: function(id, result, status){
                    this.removeStatus = {
                        busy: id || false,
                        result: result || "",
                        status: status || undefined
                    }
                },
                removeTimeout: undefined,
                lastRemoved: undefined,
                remove: function(model, ev){
                    $timeout.cancel(this.removeTimeout);
                    if(this.lastRemoved){
                        this.models.splice(this.models.indexOf(this.lastRemoved), 1);
                        this.lastRemoved = undefined;
                    }
                    this.setRemoveStatus(model._id);
                    var self = this;
                    this.apiService.remove(model._id)
                        .then(function(response){
                            self.setRemoveStatus(model._id, response.data, response.status);
                            if(self.type === 'postTypes') $rootScope.$broadcast('postTypesUpdated');
                            self.lastRemoved = model;
                            self.count--;
                            self.removeTimeout = $timeout(function(){
                                self.models.splice(self.models.indexOf(model), 1);
                                self.lastRemoved = undefined;
                                self.setRemoveStatus();
                            }, 2000);
                        })
                        .catch(function(error){
                            self.setRemoveStatus();
                            onRemoveError(error.data, ev);
                        })
                },
                removeDialog: function(ev, model){
                    var confirm = $mdDialog.confirm()
                        .title('Are you sure you want to delete ' + model.title + '?')
                        .ariaLabel('Remove dialog')
                        .clickOutsideToClose(true)
                        .targetEvent(ev)
                        .ok('Yes')
                        .cancel('No');
                    var self = this;
                    $mdDialog.show(confirm)
                        .then(function(){
                            self.remove(model, ev);
                        }, function(){});
                }
            };

            if(listing.type === 'posts'){
                listing.title = model.data.pluralTitle;
                listing.postType = model.data.type;
                listing.postTypeId = model.data.id;
                listing.postEdit = listing.type + 'Edit({id:model.id, type:model.type})';
            } else {
                listing.title = $state.current.title;
                listing.postEdit = listing.type + 'Edit({id:model.id})';
            }
            listing.sort = createSort(listing, model.data.fields);
            listing.filters = createFilters(model.data);
            listing.resetFilters = resetFilters;
            listing.count = listing.models.length;

            return listing;
        }

        return {
            create: createListing
        }
    }
})();