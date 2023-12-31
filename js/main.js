/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   calc: () => (/* binding */ calc)
/* harmony export */ });


function calc() {
    const result = document.querySelector('.calculating__result span');
    let sex, height, weight, age, ratio;

    if(localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', ratio);
    }

    if(localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', `${sex}`);
    }

    function initLocalSettings(selector, activeClass) {
        document.querySelectorAll(selector).forEach(e => {
            e.classList.remove(activeClass);
            if (e.getAttribute('id') === localStorage.getItem('sex')) {
                e.classList.add(activeClass);
            }
            if (e.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                e.classList.add(activeClass);
            }
        })
    }

    initLocalSettings(`#gender div`, 'calculating__choose-item_active');
    initLocalSettings('[data-ratio]', 'calculating__choose-item_active');

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____';
            return;
        }

        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        }
        if (sex === 'male') {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal();

    function getStaticInformation(parentSelector, activeClass) {
        const elements = document.querySelectorAll(`${parentSelector} div`);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
            if (e.target.getAttribute('data-ratio')) {
                ratio = +e.target.getAttribute('data-ratio');
                
                localStorage.setItem('ratio', ratio);
            } else {
                sex = e.target.getAttribute('id');

                localStorage.setItem('sex', `${sex}`);
            }

            elements.forEach(elem => {
                elem.classList.remove(activeClass);
            });

            e.target.classList.add(activeClass);

            calcTotal();
            })
        })
    }

    getStaticInformation('#gender', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
            if (input.value.match(/\D/g)) {
                input.style.border = '2px solid red';
                console.log('true');
            } else {
                input.style.border = 'none';
            }

            switch(input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }    

            calcTotal();
        })  
    }

    getDynamicInformation("#height");
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
}

// module.exports = calc;

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cards: () => (/* binding */ cards)
/* harmony export */ });
/* harmony import */ var _services_services_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services.js */ "./js/services/services.js");



function cards() {
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className =>  element.classList.add(className));
            }

            element.innerHTML = `<img src=${this.src} alt=${this.alt}>
                                <h3 class="menu__item-subtitle">${this.title}</h3>
                                <div class="menu__item-descr">${this.descr}</div>
                                <div class="menu__item-divider"></div>
                                <div class="menu__item-price">
                                    <div class="menu__item-cost">Цена:</div>
                                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                                </div>`;
            this.parent.append(element);
        }
    }

    /* GET by using AXIOS lib */

    /*-------------------------------*/

    /* axios.get('http://localhost:3000/menu')
    .then(res => {
            res.data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            })
        })*/

    /* GET by native JS*/

    /* -----------------------------*/

    (0,_services_services_js__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            })
        })



    /* ONE-TIME CREATION EXAMPLE */

    /*---------------------------------*/

    /*getResource('http://localhost:3000/menu')
    .then(data => createCard(data));

    function createCard(data) {
        data.forEach(({img, altimg, title, descr, price}) => {
            const element = document.createElement('div');
            element.classList.add('menu__item');
            price *= 27;
            element.innerHTML = `
                <img src=${img} alt=${altimg}>
                <h3 class="menu__item-subtitle">${title}</h3>
                <div class="menu__item-descr">${descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${price}</span> грн/день</div>
                </div>
            `;

            document.querySelector('.menu .container').append(element)
        })    
    } */
}

// module.exports = cards;

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   forms: () => (/* binding */ forms)
/* harmony export */ });
/* harmony import */ var _services_services_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services.js */ "./js/services/services.js");
/* harmony import */ var _modal_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modal.js */ "./js/modules/modal.js");




function forms(formSelector, modalSelector, modalTimer) {
    const forms = document.querySelectorAll(formSelector);
      
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Thank you!',
        failure: 'Something went wrong...'
    }

    forms.forEach(item => bindPostData(item));

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            (0,_services_services_js__WEBPACK_IMPORTED_MODULE_0__.postData)('http://localhost:3000/requests', json)
            .then(r => {
                console.log(r);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset()
            })
        })
    }

    function showThanksModal (message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.remove('show');
        prevModalDialog.classList.add('hide');
        (0,_modal_js__WEBPACK_IMPORTED_MODULE_1__.openModalWindow)(modalSelector, modalTimer);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            (0,_modal_js__WEBPACK_IMPORTED_MODULE_1__.closeModal)('.modal');
        }, 4000);
    }
}

// module.exports = forms;

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeModal: () => (/* binding */ closeModal),
/* harmony export */   modal: () => (/* binding */ modal),
/* harmony export */   openModalWindow: () => (/* binding */ openModalWindow)
/* harmony export */ });



let modalOpened = false;

function openModalWindow(modalSelector, modalTimer) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';

    modalOpened = true;
    
    if (modalTimer) {
        clearInterval(modalTimer);
    }
    /* -------------------------------------------------- */

    // window.removeEventListener('scroll', showModalByScroll);

    /* --------------------------------------------------- */
}

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector)

    modal.classList.remove('show');
    modal.classList.add('hide');
    // modal.classList.toggle('show');
    document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimer) {
    const modalTrigger = document.querySelectorAll(triggerSelector); /* '[data-modal]' */
    
    const modalWindow = document.querySelector(modalSelector); /* '.modal' */
    

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => openModalWindow(modalSelector, modalTimer));
    })

    modalWindow.addEventListener('click', (e) => {
        let target = e.target;
        
        if (target === modalWindow || target.hasAttribute('data-close')) {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalWindow.classList.contains('show')) {
            closeModal(modalSelector);
        }
    })

    function showModalByScroll() {
        if (((document.documentElement.clientHeight + window.scrollY) >= document.documentElement.scrollHeight - 1) && !modalOpened) {
            openModalWindow(modalSelector, modalTimer);
            window.removeEventListener('scroll', showModalByScroll)
        }
    }

    window.addEventListener('scroll', showModalByScroll);
}

// module.exports = modal;

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   slider: () => (/* binding */ slider)
/* harmony export */ });


function slider({container, slidesList, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    const slidePrev = document.querySelector(prevArrow),
          slideNext = document.querySelector(nextArrow),
          currSlide = document.querySelector(currentCounter),
          totalSlides = document.querySelector(totalCounter),
          slides = document.querySelectorAll(slidesList),
          slidesWrapper = document.querySelector(wrapper),
          slidesField = document.querySelector(field),
          width = window.getComputedStyle(slidesWrapper).width,
          sliderWidth = +width.replace(/\D/g, '');

    let slideIndex = 1;
    let offset = 0;

    //DOTS FOR SLIDER
    /*
    - получение элемента всего слайдера и установить позиционнирование
    - создать обертку для точек и установить их позицию абсолютно
    - генерировать количество точек, которое будет равно количеству слайдов
    - добавить какой-нибудь аттрибут, который будет указывать принадлежность точки к слайду
    - добавить класс активнеости, чтобы понимать какая точка активна
    - при клике на точку перемещение на соответствующий слайд
    */
/*------------------------*/
    const sliderWrapper = document.querySelector(container);
    sliderWrapper.style.position = 'relative';

    const dotsWrapper = document.createElement('ul');
    dotsWrapper.classList.add('carousel-indicators');

    sliderWrapper.append(dotsWrapper);
/*---------------------*/

    if (slides.length < 10) {
        totalSlides.textContent = `0${slides.length}`;
        currSlide.textContent = `0${slideIndex}`;
    } else {
        totalSlides.textContent = slides.length;
        currSlide.textContent = slideIndex
    }

    /*function showCurrentSlide(index) {
        slides.forEach(slide => {
            slide.classList.remove('show', 'fade');
            slide.classList.add('hide');
        })

        slides[index - 1].classList.add('show', 'fade');
        slides[index - 1].classList.remove('hide');
        if (slides.length < 10) {
            currSlide.textContent = `0${slideIndex}`;
        } else {
            currSlide.textContent = slideIndex;
        }
    }

    showCurrentSlide(slideIndex);

    slideNext.addEventListener('click', () => {
        if (slideIndex - 1 < slides.length - 1) {
            slideIndex++;
        } else {
            slideIndex = 1;
        }
        showCurrentSlide(slideIndex);
    })

    slidePrev.addEventListener('click', () => {
        if (slideIndex >= 1) {
            slideIndex--;
        } else {
            slideIndex = slides.length - 1;
        }
        showCurrentSlide(slideIndex);
    })*/

    // ALTERVATIVE SLIDER

    slidesField.style.width = 100 * slides.length + '%';
    slides.forEach((slide, i) => {
        slide.style.width = sliderWidth;
        const dot = document.createElement('li');
        dot.classList.add('dot');
        dot.dataset.slideTo = `${i + 1}`;
        dotsWrapper.append(dot);
    })

    document.querySelectorAll('.dot').forEach(dot => {
        dot.addEventListener('click', () => {
            offset = sliderWidth * (dot.dataset.slideTo - 1);
            slideIndex = dot.dataset.slideTo;
            activeCurrentSliderDot(slideIndex);
            slidesField.style.transform = `translateX(-${offset}px)`;
            if (slides.length < 10) {
                currSlide.textContent = `0${slideIndex}`;
            } else {
                currSlide.textContent = slideIndex;
            }
        })
    })

    /* Initialization for dots */
    document.querySelector(`[data-slide-to='${slideIndex}']`).classList.add('dotActive');

    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';
    slidesWrapper.style.overflow = 'hidden';

    slideNext.addEventListener('click', () => {
        if (offset >= sliderWidth * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += sliderWidth;
        }

        if (slideIndex < slides.length) {
            slideIndex++;
        } else {
            slideIndex = 1;
        }

        if (slides.length < 10) {
            currSlide.textContent = `0${slideIndex}`;
        } else {
            currSlide.textContent = slideIndex;
        }

        activeCurrentSliderDot(slideIndex);        
        slidesField.style.transform = `translateX(-${offset}px)`;
    })

    slidePrev.addEventListener('click', () => {
        if (offset <= 0) {
            offset = sliderWidth * (slides.length - 1);
        } else {
            offset -= sliderWidth;
        }

        if (slideIndex > 1) {
            slideIndex--;
        } else {
            slideIndex = slides.length;
        }

        if (slides.length < 10) {
            currSlide.textContent = `0${slideIndex}`;
        } else {
            currSlide.textContent = slideIndex;
        }
        
        activeCurrentSliderDot(slideIndex);
        slidesField.style.transform = `translateX(-${offset}px)`;
    })

    function activeCurrentSliderDot (index) {
        document.querySelectorAll('.dot').forEach(dot => {
            dot.classList.remove('dotActive');
        })

        document.querySelector(`[data-slide-to='${index}']`).classList.add('dotActive');
    }
}

// module.exports = slider;

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   tabs: () => (/* binding */ tabs)
/* harmony export */ });


function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    const tabs = document.querySelectorAll(tabsSelector), /* '.tabheader__item' */
          tabsContent = document.querySelectorAll(tabsContentSelector), /* '.tabcontent' */
          tabsParent = document.querySelector(tabsParentSelector), /* '.tabcontainer' */
          tabsArr= Array.from(tabs);

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        })

        tabs.forEach(item => {
            item.classList.remove(activeClass); /* 'tabheader__item_active' */
        })
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (e) => {
        const target = e.target;

        if (target && target.classList.contains(tabsSelector.slice(1))){
            // hideTabContent();
            // showTabContent(tabsArr.indexOf(target));
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            })
        }
    })
}

// module.exports = tabs;

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   timer: () => (/* binding */ timer)
/* harmony export */ });


function timer(deadline, timerSelector) {
    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor((t / (1000 * 60 * 60)) % 24),
              minutes = Math.floor((t / 1000 / 600) % 60),
              seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timerInterval = setInterval(updateClock, 1000);
        
        updateClock();
        function updateClock() {
            const t = getTimeRemaining(endtime);

            if (t.total <= 0) {
                clearInterval(timerInterval);
                days.textContent = '00';
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            } else {
                days.textContent = getZero(t.days);
                hours.textContent = getZero(t.hours);
                minutes.textContent = getZero(t.minutes);
                seconds.textContent = getZero(t.seconds);
            }
        }

    }

    setClock(timerSelector, deadline);
}

// module.exports = timer;

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getResource: () => (/* binding */ getResource),
/* harmony export */   postData: () => (/* binding */ postData)
/* harmony export */ });


const postData = async (url, data) => {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });
    return await res.json();
};


const getResource = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs.js */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal.js */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer.js */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards.js */ "./js/modules/cards.js");
/* harmony import */ var _modules_calc_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calc.js */ "./js/modules/calc.js");
/* harmony import */ var _modules_forms_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms.js */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider.js */ "./js/modules/slider.js");









window.addEventListener('DOMContentLoaded', () => {
    // const tabs = require('./modules/tabs'),
    //     modal = require('./modules/modal'),
    //     timer = require('./modules/timer'),
    //     cards = require('./modules/cards'),
    //     calc = require('./modules/calc'),
    //     forms = require('./modules/forms'),
    //     slider = require('./modules/slider');


    let modalTimer = setTimeout(() => (0,_modules_modal_js__WEBPACK_IMPORTED_MODULE_1__.openModalWindow)('.modal', modalTimer), 30000);

    (0,_modules_tabs_js__WEBPACK_IMPORTED_MODULE_0__.tabs)('.tabheader__item', '.tabcontent', '.tabcontainer', 'tabheader__item_active');
    (0,_modules_modal_js__WEBPACK_IMPORTED_MODULE_1__.modal)('[data-modal]', '.modal', modalTimer);
    (0,_modules_timer_js__WEBPACK_IMPORTED_MODULE_2__.timer)('2023-08-21', '.timer');
    (0,_modules_cards_js__WEBPACK_IMPORTED_MODULE_3__.cards)();
    (0,_modules_calc_js__WEBPACK_IMPORTED_MODULE_4__.calc)();
    (0,_modules_forms_js__WEBPACK_IMPORTED_MODULE_5__.forms)('form', '.modal', modalTimer);
    (0,_modules_slider_js__WEBPACK_IMPORTED_MODULE_6__.slider)({
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
})();

/******/ })()
;
//# sourceMappingURL=main.js.map