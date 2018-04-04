(function(){
    angular.module('frodo').filter('listingFilter', ListingFilter);

    ListingFilter.$inject = ['$filter'];

    function ListingFilter($filter){

        return function(models, filters, type){
            if(!models.length){
                return models;
            }

            // textFilter
            models = $filter('filter')(models, filters.textFilter.value);

            if(type !== 'posts'){
                return models;
            }

            // checkboxes
            if(filters.checkboxes.fields.length){
                filters.checkboxes.fields.forEach(function(checkbox){
                    if(checkbox.value !== 'all'){
                        models = models.filter(function(model){
                            return model.data[checkbox.id] === checkbox.value;
                        })
                    }
                })
            }

            // selects
            if(filters.selects.fields.length){
                filters.selects.fields.forEach(function(select){
                    if(select.values.length){
                        models = models.filter(function(model){
                            return select.values.indexOf(model.data[select.id]) > -1;
                        })
                    }
                })
            }

            // numbers
            if(filters.numbers.fields.length){
                filters.numbers.fields.forEach(function(number){
                    if(number.minValue !== number.range[0] || number.maxValue !== number.range[1]){
                        models = models.filter(function(model){
                            return ((number.minValue <= model.data[number.id]) && (number.maxValue >= model.data[number.id]));
                        })
                    }
                })
            }
            return models
        }

    }

})();