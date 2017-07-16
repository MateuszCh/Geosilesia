/**
 * Created by Mateusz Chybiorz on 2017-07-09.
 */
(function(){
    angular.module('geosilesia').value('iconsForMarkers', {
        wybraneGeostanowiska:    {
            name: "Wybrane geostanowiska",
            icon: "images/markers/fossils.png"
        },
        trasyPodziemne:  {
            name: "Trasy podziemne",
            icon: "images/markers/cave-2.png"
        },
        muzeaGeologiczneIDinoparki:    {
            name: "Muzea geologiczne, ośrodki edukacyjne i dinoparki",
            icon: "images/markers/museum_science.png"
        },
        obiektyPrzemysloweIPoprzemyslowe:   {
            name: "Obiekty przemysłowe i poprzemysłowe",
            icon: "images/markers/museum_industry.png"
        },
        uzdrowiskaIObiektyUzdrowiskowe: {
            name: "Uzdrowiska i obiekty uzdrowiskowe",
            icon: "images/markers/spa.png"
        },
        obszaryIObiektyChronione:   {
            name: "Obszary i obiekty chronione",
            icon: "images/markers/peak.png"
        },
        sciezkiTematyczne: {
            name: "Ścieżki tematyczne",
            icon: "images/markers/walkingtour.png"
        },
        inne:   {
            name: "inne",
            icon: "images/markers/world.png"
        },
        geostanowiskaMiedzynarodowe:    {
            name: "Geostanowiska międzynarodowe",
            icon: "images/markers/world_geostanowiska.png"
        }
    });
})();
