(function(){
    angular.module('frodo').service('listingFactory', ['$state', '$injector', '$timeout', '$rootScope', '$mdDialog', function($state, $injector, $timeout, $rootScope, $mdDialog){

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
                var sortingFields = ['text','checkbox','select','number', 'date'];
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

            return listing;
        }

        return {
            create: createListing
        }

    }]);
})();