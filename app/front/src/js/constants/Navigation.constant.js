(function(){
    angular.module('geosilesia').constant('navigation', {
        nav : [
            {title: 'O serwisie', link: '/o-nas'},
            {title: 'Geośląsk', submenu : [
                    {subtitle: 'Położenie', link : '/polozenie'},
                    {subtitle: 'Rzeźba terenu', link: '/rzezba'},
                    {subtitle: 'Budowa geologiczna', link: '/budowa'},
                    {subtitle: 'Geostanowiska', link: '/geostanowiska'},
                    {subtitle: 'Atakcje geoturystyczne', link: '/atrakcje'}
                ]},
            {title: 'Wydarzenia', link: '/wydarzenia'},
            {title: 'Słownik', link: '/slownik'},
            {title: 'Galeria', link: '/galeria'},
            {title: 'English', link: '/english'}
        ]
    });
})();