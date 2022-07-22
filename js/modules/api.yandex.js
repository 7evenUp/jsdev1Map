import { openPopup, checkForOpenedPopup } from '../mvc/view.js';

export default class {
    initMap(settings){
        return new Promise((resolve, reject) => ymaps.ready(resolve))
            .then(()=>{
                this.map = new ymaps.Map('map', settings)

                const customItemContentLayout = ymaps.templateLayoutFactory.createClass(
                    '<h3 class="ballon_header" ' +
                        'data-coords="{{properties.coords}}" ' +
                        'data-address="{{properties.address}}"' +
                        '>{{properties.address}}</h3>' +
                    '<div class="ballon_body">' + 
                    '   <h4 class="ballon_body-info">{{ properties.place }}  -  {{ properties.name }}</h4>' +
                    '   <p class="ballon_body-comment">{{ properties.comment }}</p>' +
                    '</div>' +
                    '<div class="ballon_footer">' +
                    '   <span class="ballon_footer-date">{{properties.date}}</span>' +
                    '</div>',
                    {
                        build: function() {
                            this.constructor.superclass.build.call(this);
                            const header = document.querySelector('.ballon_header');
                            checkForOpenedPopup();
                            window.isBallonOpened = true;
                            header.addEventListener('click', (evt) => {
                                const address = header.dataset.address;
                                const coords = header.dataset.coords;
                                let data = JSON.parse(localStorage.getItem('data'));
                                window.isBallonOpened = false;
                                openPopup(address, coords, false, data[coords]);
                                this.events.fire('userclose');
                            })
                        }
                    }
                );

                this.cluster = new ymaps.Clusterer(
                    {
                        clusterDisableClickZoom: true,
                        clusterOpenBalloonOnClick: true,
                        clusterBalloonContentLayout: 'cluster#balloonCarousel',
                        clusterBalloonItemContentLayout: customItemContentLayout,
                        clusterBalloonPanelMaxMapArea: 0,
                        clusterBalloonContentLayoutWidth: 400,
                        clusterBalloonContentLayoutHeight: 130,
                        clusterBalloonPagerSize: 5,
                        hasBallon: true
                    }
                )
                return this.map
            })
    }
    async getMapPosition(e) {
        const coords = e.get('coords')
        const geocode = await ymaps.geocode(coords)
        const address = geocode.geoObjects.get(0).properties.get('text')

        return {
            coords,
            address
        }
    }

    async createPlacemark(point, globalData, data) {
        const myPlacemark1 = new ymaps.Placemark(point.coords, {
            coords: point.coords,
            address: point.address,
            place: data.place,
            name: data.name,
            comment: data.comment,
            date: data.date
        }, {
                openBalloonOnClick: false,
        });

        myPlacemark1.events.add(['click'], (evt) => {
            checkForOpenedPopup();
            openPopup(point.address, point.coords, evt, globalData)
        })

        this.cluster.add(myPlacemark1);
        this.map.geoObjects.add(this.cluster);
    }
}