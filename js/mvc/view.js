export function openPopup(address, coords, evt, data=[]) {
    const template = document.getElementById('popupTemplate').innerHTML;
    const render   = Handlebars.compile(template);
    const context  = {address: address}
    const html     = render(context);

    const div = document.createElement('div');
    div.classList.add('popup');
    if (evt) {
        div.style.left = evt.get('domEvent').get('pageX') + 'px';
        div.style.top = evt.get('domEvent').get('pageY') + 'px';
    } else {
        const popupHeight = 525;
        const popupWidth = 380;
        div.style.left = window.innerWidth / 2 - popupWidth / 2 + 'px';
        div.style.top  = window.innerHeight / 2 - popupHeight / 2 + 'px';
    }

    div.innerHTML = html;

    const closeButton = div.querySelector('.popup__close');
    const form = div.querySelector('.form');

    document.addEventListener('keydown', keydownPopupHandler);
    closeButton.addEventListener('click', clickPopupHandler);
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = getFormData();
        appendReview(formData);
        if (!(coords.join() in window.data)) {
            window.data[coords.join()] = [];
        }
        window.data[coords.join()].push(formData);

        window.that.myApiMap.createPlacemark({address:address, coords:coords}, window.data[coords.join()], formData);
    })

    document.querySelector('#map').appendChild(div);

    for (const item of data) {
        appendReview(item);
    }
}

function getFormData() {
    const nameInput    = document.querySelector('input[name="name"]');
    const placeInput   = document.querySelector('input[name="place"]');
    const commentInput = document.querySelector('textarea');
    const date = getDate();

    return {
        name: nameInput.value,
        place: placeInput.value,
        comment: commentInput.value,
        date: date
    }
}

function appendReview(context) {
    const template = document.getElementById('commentTemplate').innerHTML;
    const render   = Handlebars.compile(template);
    const html     = render(context);
    const reviews  = document.querySelector('.popup__reviews');

    const div = document.createElement('div');
    div.classList.add('review');

    div.innerHTML = html;
    reviews.appendChild(div);
    
    clearInputs();
}

function clearInputs() {
    document.querySelector('input[name="name"]').value = '';
    document.querySelector('input[name="place"]').value = '';
    document.querySelector('textarea').value = '';
}

function clickPopupHandler() {
    document.querySelector('#map').removeChild(document.querySelector('.popup'));
}

function keydownPopupHandler(evt) {
    if (evt.keyCode === 27) {
        document.querySelector('#map').removeChild(document.querySelector('.popup'));
        document.removeEventListener('keydown', keydownPopupHandler);
    }
}

function getDate() {
    const date    = new Date();
    const day     = (date.getDate() + 1 < 10) ? '0' + date.getDate() : date.getDate();
    const month   = (date.getMonth() + 1 < 10) ? '0' + (date.getMonth() + 1)  : date.getMonth() + 1;
    const year    = date.getFullYear();
    const hours   = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours();
    const minutes = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes();
    const seconds = (date.getSeconds() < 10) ? '0' + date.getSeconds() : date.getSeconds();

    return `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`;
}