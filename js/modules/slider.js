function slider() {
    const slidePrev = document.querySelector('.offer__slider-prev'),
          slideNext = document.querySelector('.offer__slider-next'),
          currSlide = document.querySelector('#current'),
          totalSlides = document.querySelector('#total'),
          slides = document.querySelectorAll('.offer__slide'),
          slidesWrapper = document.querySelector('.offer__slider-wrapper'),
          slidesField = document.querySelector('.offer__slider-inner'),
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
    const sliderWrapper = document.querySelector('.offer__slider');
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

module.exports = slider;