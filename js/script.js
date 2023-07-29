import {tabs} from './modules/tabs.js';
import {modal} from './modules/modal.js';
import {openModalWindow} from './modules/modal.js';
import {timer} from './modules/timer.js';
import {cards} from './modules/cards.js';
import {calc} from './modules/calc.js';
import {forms} from './modules/forms.js';
import {slider} from './modules/slider.js';

window.addEventListener('DOMContentLoaded', () => {
    // const tabs = require('./modules/tabs'),
    //     modal = require('./modules/modal'),
    //     timer = require('./modules/timer'),
    //     cards = require('./modules/cards'),
    //     calc = require('./modules/calc'),
    //     forms = require('./modules/forms'),
    //     slider = require('./modules/slider');


    let modalTimer = setTimeout(() => openModalWindow('.modal', modalTimer), 30000);

    tabs('.tabheader__item', '.tabcontent', '.tabcontainer', 'tabheader__item_active');
    modal('[data-modal]', '.modal', modalTimer);
    timer('2023-08-21', '.timer');
    cards();
    calc();
    forms('form', '.modal', modalTimer);
    slider({
        container: '.offer__slider', 
        slidesList: '.offer__slide', 
        nextArrow: '.offer__slider-next', 
        prevArrow: '.offer__slider-prev', 
        totalCounter: '#total', 
        currentCounter: '#current', 
        wrapper: '.offer__slider-wrapper', 
        field: '.offer__slider-inner'
    });

}) 