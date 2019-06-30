import Map from '../modules/api.yandex'
import { openPopup, checkForOpenedPopup } from './view.js';

export default class {
    constructor(){
        this.myApiMap = new Map()

        this.init()
    }
    async init(){
        this.yandexApi = await this.myApiMap.initMap({
            center: [59.945, 30.34],
            zoom: 13,
            controls: []
        })
        
        this.yandexApi.events.add('click', async evt => {
            this.point = await this.myApiMap.getMapPosition(evt);
            window.that = this;

            checkForOpenedPopup();
            openPopup(this.point.address, this.point.coords, evt);
        })

        if (localStorage.getItem('data')) {
            let data = JSON.parse(localStorage.getItem('data'));

            for (const coords in data) {
                const geocode = await ymaps.geocode(coords);
                const address = geocode.geoObjects.get(0).properties.get('text');

                for (const info of data[coords]) {
                    this.myApiMap.createPlacemark({ address: address, coords: coords.split(',') }, data[coords], info);
                }
            }
        } else {
            localStorage.setItem('data', '{}');
        }
    }
}