//property name and property of 'type' should be the same

(function(){
    angular.module('frodo').constant('fields', {
            text: {
                name: 'Tekst',
                type: 'text'
            },
            textarea: {
                name: 'Pole tekstowe',
                type: 'textarea'
            },
            checkbox: {
                name: 'True/False',
                type: 'checkbox'
            },
            select: {
                name: 'Select',
                type: 'select'
            },
            repeater: {
                name: 'Repeater',
                type: 'repeater'
            },
            number: {
                name: 'Liczba',
                type: 'number'
            },
            image: {
                name: 'Zdjęcie',
                type: 'image'
            }
    });
})();