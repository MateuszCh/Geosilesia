(function(){
    angular.module('frodo').service('tools', [function(){

        function showInvalidInputs(){
            var invalidInputs = document.getElementsByClassName("ng-invalid");

            if(invalidInputs.length){
                invalidInputs[0].scrollIntoView({behavior: "smooth"});
                var collectionLength = invalidInputs.length;
                var i = 0;
                for(i; i < collectionLength; i++){
                    invalidInputs[i].parentNode.classList.add("invalid");
                }
            }
            return invalidInputs.length;
        }

        return {
            showInvalidInputs: showInvalidInputs
        }

    }]);
})();