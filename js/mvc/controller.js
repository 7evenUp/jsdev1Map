import Map from '../modules/api.yandex'
import { openPopup } from './view.js';

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
        
        window.data = {};
        
        this.yandexApi.events.add('click', async evt => {
            this.point = await this.myApiMap.getMapPosition(evt);
            window.that = this;

            if (!document.querySelector('#map').contains(document.querySelector('.popup'))) {
                openPopup(this.point.address, this.point.coords, evt);
            } else {
                document.querySelector('#map').removeChild(document.querySelector('.popup'));
            }
        })
    }
}