import Controller from './mvc/controller';

const controller = new Controller();

// ---------------------------------------------------------------------------------

//     // Создаем собственный макет с информацией о выбранном геообъекте.
//     var customItemContentLayout = ymaps.templateLayoutFactory.createClass(
//         // Флаг "raw" означает, что данные вставляют "как есть" без экранирования html.
//         '<h2 class=ballon_header>{{ properties.balloonContentHeader|raw }}</h2>' +
//         '<div class=ballon_body>{{ properties.balloonContentBody|raw }}</div>' +
//         '<div class=ballon_footer>{{ properties.balloonContentFooter|raw }}</div>'
//     );

//     // Заполняем кластер геообъектами со случайными позициями.
//     var placemarks = [];
//     for (var i = 0, l = 100; i < l; i++) {
//         var placemark = new ymaps.Placemark(getRandomPosition(), {
//             // Устаналиваем данные, которые будут отображаться в балуне.
//             balloonContentHeader: 'Метка №' + (i + 1),
//             balloonContentBody: getContentBody(i),
//             balloonContentFooter: 'Мацуо Басё'
//         });
//         placemarks.push(placemark);
//     }

//     clusterer.add(placemarks);
//     map.geoObjects.add(clusterer);
//     clusterer.balloon.open(clusterer.getClusters()[0]);
// });
