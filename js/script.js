import {tabs} from './modules/tabs.js';
import {modal} from './modules/modal.js';
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

    tabs();
    modal();
    timer();
    cards();
    calc();
    forms();
    slider();

}) 