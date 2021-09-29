(function () {

    // переменные

    // блок select
    let btnAddCar = document.querySelector('.box-button--add')
    let select = document.querySelector('.select__wrapper')
    let closeBtn = document.querySelector('.select__header-action svg')
    let btnBack = document.querySelector('.select__header-action--back svg')
    let selectOverlay = document.querySelector('.select-overlay-sr')
    let carCollections = document.querySelectorAll('.compare-select__models-item')
    let selectTitle = document.querySelector('.select-header__title')
    let selectLoader = document.querySelector('.select-loader')
    let carBlock = document.querySelector('.select__models-sr')
    let onlyCarBlock = document.querySelector('.select__models-item--bg')
    let labelsCreateBox = document.querySelectorAll('.js--create-box')

    let wrapperBoxCreate = document.querySelector('.swiper-wrapper__card')
    let contentWrapper = document.querySelector('.main-content__wrapper')
    let slideCarOne = document.querySelector('.swiper-slide__card--prev')
    
    // фильтр
    let btnBackFilter = document.querySelector('.select__header-action--back-filter svg')
    let blockFilter = document.querySelector('.block-filter__wrapper')
    let btnOpenFilter = document.querySelector('.filter-link')
    let filterLabel = document.querySelectorAll('.filter-label')
    let filterBody = document.querySelector('.compare-select__content-body')
    let filterButtonText = document.querySelector('.js-button_primary')

    let createText = document.querySelector('.main-text--hidden')
    
    let currentOne = 0
    let currentTwo = 0
    let currenttNumberCardShow = 0

    let mainInput = document.querySelector('.form-control_checkbox_wrapper')
    let mainLabel = document.querySelector('.main__label')

    let dropdown = document.querySelector('.dropdown_wrapper')
    let dropdownBtn = document.querySelectorAll('.dropdown')

    // стрелки слайдера
    let arrowPrev = document.querySelector('.arrow-prev')
    let arrowNext = document.querySelector('.arrow-next')

    // инициализация слайдеров
    $('.swiper-wrapper__card').slick({
        asNavFor: '.swiper-wrapper__text',
        slidesToShow: 4,
        infinite: false,
        nextArrow: $('.next'),
        prevArrow: $('.prev'),
         responsive: [
            {
              breakpoint: 1279,
              settings: {
                slidesToShow: 4,
              }
            },
                {
              breakpoint: 991,
              settings: {
                slidesToShow: 3,
              }
            },
                    {
              breakpoint: 770,
              settings: {
                slidesToShow: 2,
              }
            },
                        {
              breakpoint: 479,
              settings: {
                slidesToShow: 1,
              }
            },
            ]
        });
        
    $('.swiper-wrapper__text').slick({
        asNavFor: '.swiper-wrapper__card',
        slidesToShow: 4,
        infinite: false,
        swipe: false,
        nextArrow: $('.next-arrow--text'),
        prevArrow: $('.prev-arrow--text'),
         responsive: [
            {
              breakpoint: 1279,
              settings: {
                slidesToShow: 4,
              }
            },
                    {
              breakpoint: 991,
              settings: {
                slidesToShow: 3,
              }
            },
                        {
              breakpoint: 770,
              settings: {
                slidesToShow: 2,
              }
            },
                            {
              breakpoint: 479,
              settings: {
                slidesToShow: 1,
              }
            },
            ]
        });


    // события 

    // фиксация блока с комплектациями
    window.addEventListener('scroll', function (e) {
        elemHide('.main-content__wrapper') 
    })

    // открытие блока с комплектациями
    contentWrapper.addEventListener('click', function (e) {
        if(e.target.classList.contains('box-button--add')) {
            select.classList.add('active')
            if (currentOne === 0) {
                selectLoader.classList.add('active')
                setTimeout(function () {
                    selectLoader.classList.remove('active')
                    currentOne = 1
                }, 700)
            }
        }
    })

    // закрытие блока с комплектациями
    closeBtn.addEventListener('click', function () {
        hiddenSelectBlock()
    })
    selectOverlay.addEventListener('click', function (e) {
        if (e.target.classList.contains('select-overlay-sr')) {
            hiddenSelectBlock()
        }
    })

    // открытие блока отдельной марки с комплектациями
    carCollections.forEach(car => {
        car.addEventListener('click', function () {
            let carImg = car.querySelector('img')
            let carImgSrc = carImg.getAttribute('src')
            let carTitle = car.querySelector('.select-item__name')
            selectTitle.textContent = 'Выберите комплектацию'
            btnBack.classList.add('active')
            if (currentTwo === 0) {
                selectLoader.classList.add('active')
                setTimeout(function () {
                    selectLoader.classList.remove('active')
                }, 700)
                currentTwo = 1
            }
            let carBlockImg = onlyCarBlock.querySelector('.item__image--bg')
            carBlockImg.setAttribute('src', carImgSrc)
            let carBlockTitle = onlyCarBlock.querySelector('.models-item__title')
            carBlockTitle.textContent = carTitle.textContent
            onlyCarBlock.classList.add('active')
            carBlock.classList.add('hidden')
        })
    })

    // закрытие блока с комплектациями
    btnBack.addEventListener('click', function () {
        btnBack.classList.remove('active')
        selectTitle.textContent = 'Выберите модель'
        onlyCarBlock.classList.remove('active')
        carBlock.classList.remove('hidden')
    })

    // закрытие блока с фильтром
    btnBackFilter.addEventListener('click', function () {
        btnBackFilter.classList.remove('active')
        selectTitle.textContent = 'Выберите комплектацию'
        blockFilter.classList.remove('active')
        onlyCarBlock.classList.add('active')
        btnBack.classList.add('active')
    })

    // открытие блока фильтра
    btnOpenFilter.addEventListener('click', function () {
        blockFilter.classList.add('active')
        onlyCarBlock.classList.remove('active')
        selectTitle.textContent = 'Фильтры'
        btnBack.classList.remove('active')
        btnBackFilter.classList.add('active')
    })

    // выбор характеристик фильтра
    filterLabel.forEach(label => {
        label.addEventListener('click', function (e) {
            checkingFilter(label)
        })
    })

    // выведение комплектации на экран
    labelsCreateBox.forEach(label => {
        label.addEventListener('click', function () {
            currenttNumberCardShow = currenttNumberCardShow + 1
            hiddenSelectBlock()
            createBoxItemCar(currenttNumberCardShow)
            createDescrCar()
            label.classList.add('disabled')
            createText.classList.add('active')
            btnBack.classList.remove('active')
            if (currenttNumberCardShow === 1) {
                dropdown.classList.add('active')
                createText.textContent = `${currenttNumberCardShow} комплектация`
            } else if (currenttNumberCardShow === 2) {
                createText.textContent = `${currenttNumberCardShow} комплектации`
                mainInput.classList.add('active')
            } else if (currenttNumberCardShow >= 3 && currenttNumberCardShow <= 4) {
                createText.textContent = `${currenttNumberCardShow} комплектации`
            } else if (currenttNumberCardShow >= 5) {
                createText.textContent = `${currenttNumberCardShow} комплектаций`
            }
            if (currenttNumberCardShow === 4) {
                if(window.screen.width > 1079) {
                    arrowPrev.classList.add('swiper-button-prev')
                    arrowNext.classList.add('swiper-button-next')
                }
            }
        })
    })


    // открытие dropdown
    dropdownBtn.forEach((drop, ind) => {
        let dropParents = drop.closest('.dropdown-item__wrapper')
        if (ind === 0) {
            dropParents.classList.toggle('active')
        }
        drop.addEventListener('click', function () {
            dropParents.classList.toggle('active')
        })
    })

    // удаление одной комплектации
    wrapperBoxCreate.addEventListener('click', function (e) {
        let target = e.target
        if (target.classList.contains('close-svg')) {
            deleteTextDescr(target)
            deleteBox(target)
        }
    })

    // показывать только различия
    mainLabel.addEventListener('click', function () {
        if(mainLabel.classList.contains('label-active')) {
            mainLabel.classList.remove('label-active')
            console.log('remove')
            showAllSlide()
        } else {
            mainLabel.classList.add('label-active')
            console.log('add')
            checkingSlides('dvigatel')
            checkingSlides('moshnost')
            checkingSlides('moment')
        }
    })

    // Функции

    //  
    function checkingFilter(label) {
        let labelSpan = label.querySelector('span')
        if (label.classList.contains('label-active')) {
            label.classList.remove('label-active')
        } else {
            label.classList.add('label-active')
        }
        if (label.getAttribute('criteria') === 'engine') {
            filterButtonText.textContent = 'Показать 6 комплектаций'
        } else if (label.getAttribute('criteria') === 'transmission') {
            filterButtonText.textContent = 'Показать 4 комплектации'
        } else if (label.getAttribute('criteria') === 'complectation') {
            filterButtonText.textContent = 'Показать 2 комплектации'
        }
    }

    // создание карты автомобиля
    function createBoxItemCar() {
        function getLastSlide() {
            return $(".swiper-wrapper__card").slick("getSlick").slideCount - 1;
        }
        $('.swiper-wrapper__card').slick('slickRemove', getLastSlide());
        $('.swiper-wrapper__card').slick('slickAdd',` <div class="swiper-slide">
        <div class="slider-main__item block-item__slide-visible"> 
            <div class="compare-models__item">
                <a href="/models/picanto/options/G6S620212021K2615DD097/" class="">
                    <div class="compare-models__item-header">
                        <figure class="compare-models__item-figure"><img
                                src="https://cdn.kia.ru/resize/400x195/master-data/models/picanto-Y21.png">
                        </figure>
                    </div>
                </a>
                <div class="compare-models__item-body">
                    <a href="/models/picanto/options/G6S620212021K2615DD097/">
                        <div class="main-block__item-name_wrapper">
                            <span aria-label="Picanto Classic" >
                                Picanto Classic 
                            </span>
                            <svg width="20" height="20" viewBox="0 0 20 20"
                                fill="none" xmlns="http://www.w3.org/2000/svg"
                                preserveAspectRatio="xMidYMid" class="">
                                <path d="M8.5 14l4-4-4-4" stroke="currentColor" stroke-width="2"></path>
                            </svg>
                        </div> 
                        <div class="main-block__text--color-gray">
                            1.0 л. / 67 л.c. / бензин / MT / передний привод / 2021 год производства / 2021
                            модельный год
                        </div>
                        <div class="main-block__price">
                            869 900 ₽
                        </div>
                    </a>
                    <div class="compare-models__btn-close--action">
                        <svg class="close-svg" width="20" height="20"
                            viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
                            preserveAspectRatio="xMidYMid" class="cursor-pointer">
                            <path style="pointer-events: none;" d="M3 3l13.5 13.5M16.5 3L3 16.5" stroke="currentColor" stroke-width="1.5"></path>
                        </svg>
                    </div>
                </div>
                </div>
            </div>                            
        </div>`);
        $('.swiper-wrapper__card').slick('slickAdd',`<div class="swiper-slide swiper-slide__card--prev">
        <div class="block__item--add">
            <div class="box-button--add">
                <div class="circle--add">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                        xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" class="">
                        <path d="M10 5v10M5 10h10" stroke="currentColor" stroke-width="2"></path>
                    </svg>
                </div>
                <div class="card-sr__text">Добавить автомобиль</div>
            </div>
        </div>
    </div>`);
    }

    // создание слайдера описания автомобиля
    function createDescrCar() {
        function getLastSlide() {
            return $(".swiper-wrapper__text").slick("getSlick").slideCount - 1;
        }
        let dataName = '1234'
        let dataValue = '1.4'
        let htmlText  = '1.4 MPI'

        $('.swiper-wrapper__text').slick('slickRemove', getLastSlide());
        $('.swiper-wrapper__text').slick('slickAdd',`<div class="swiper-slide swiper-slide__text" data-name="${dataName}"  data-value="${dataValue}" current='${currenttNumberCardShow}''>
        <div class="dr-content-item__value">${htmlText}</div>
        </div>`);
        $('.swiper-wrapper__text').slick('slickAdd',`<div class="swiper-slide swiper-slide__text slide-text--prev" >
        <div class="dr-content-item__value"></div>
    </div>`);


    }

    //  удаление карты автомобиля
    function deleteBox(target) {
        let slide = target.closest('.swiper-slide')
        let slideInd = slide.getAttribute('data-slick-index')
        console.log(slideInd)
        $('.swiper-wrapper__card').slick('slickRemove', slideInd);
        if (currenttNumberCardShow === 1) {
            createText.classList.remove('active')
            dropdown.classList.remove('active')
            currenttNumberCardShow = currenttNumberCardShow - 1
            createText.textContent = `${currenttNumberCardShow} комплектация`
        } else if (currenttNumberCardShow === 2) {
            mainInput.classList.remove('active')
            currenttNumberCardShow = currenttNumberCardShow - 1
            createText.textContent = `${currenttNumberCardShow} комплектации`
        } else if (currenttNumberCardShow >= 3) {
            currenttNumberCardShow = currenttNumberCardShow - 1
            createText.textContent = `${currenttNumberCardShow} комплектации`
        }
        if (currenttNumberCardShow < 4) {
            if(window.screen.width > 1279) {
                arrowPrev.classList.remove('swiper-button-prev')
                arrowNext.classList.remove('swiper-button-next')
            }
        }
    }

    // удаление сладера описания автомобиля 
    function deleteTextDescr(target) {
        let slideCont = target.closest('.swiper-slide')
        let slideInd = slideCont.getAttribute('data-slick-index')
        $('.swiper-wrapper__text').slick('slickRemove', slideInd);
    }

    // скрытие selecta
    function hiddenSelectBlock() {
        onlyCarBlock.classList.remove('active')
        carBlock.classList.remove('hidden')
        select.classList.remove('active')
        selectTitle.textContent = 'Выберите модель'
        blockFilter.classList.remove('active')
        btnBackFilter.classList.remove('active')
        btnBack.classList.remove('active')
    }

    // фиксация юлока с выведенными комплектациями
    function elemHide(selector) {
        let elemScroll = document.querySelector(selector)
        let elemFixed = document.querySelector('.block-item__visible_wrapper')
        let sliderCardFixed = elemFixed.querySelector('.slick-track')
        let cardsInner = document.querySelectorAll('.compare-models__item-body')
        let arrowNext = document.querySelector('.arrow-next')
        let arrowPrev = document.querySelector('.arrow-prev')
        const animElemHeight = elemScroll.offsetHeight
        const animElemOffset = offset(elemScroll).top
        let elemHeight = elemScroll.offsetHeight
        if(window.pageYOffset > animElemHeight + animElemOffset) {
            elemFixed.classList.add('active')
            arrowNext.classList.add('active')
            arrowPrev.classList.add('active')
            sliderCardFixed.classList.add('active')
            cardsInner.forEach(card => {
                card.classList.add('active')
            })
            elemScroll.style.height = elemHeight
        } else if(window.pageYOffset < animElemHeight + animElemOffset) {
            elemFixed.classList.remove('active')
            sliderCardFixed.classList.remove('active')
            cardsInner.forEach(card => {
                card.classList.remove('active')
            })
            elemScroll.style.height = 'auto'
        }
        function offset(el) {
            const rect = el.getBoundingClientRect()
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
            scrollTop = window.pageYOffset || document.documentElement.scrollTop
            return {
                top: rect.top + scrollTop,
                left: rect.left + scrollLeft
            }
        }
    }
    
    // скрытие одинаковых характеристик
    function checkingSlides(attr) {
        let slidesArray =  document.querySelectorAll(`.swiper-container__text[data-name=${attr}] .swiper-slide__text`)
        let value = 0
        slidesArray.forEach(slide => {
            let slideAttr = slide.getAttribute('data-value')
            for(let i = 0; i < slidesArray.length; i++) {
                if(slidesArray[1].getAttribute('data-value') != slideAttr){
                    value = value + 1
                }
            }
            if(value){
                return true
            } else {
                let slideParents = slide.closest('.dropdown-content__item')
                slideParents.classList.add('hidden')
            }
        })
    }

    // показ одинаковых характеристик
    function showAllSlide () {
        let slideArr = document.querySelectorAll('.dropdown-content__item')
        slideArr.forEach(slide => {
            if(slide.classList.contains('hidden')) {
                slide.classList.remove('hidden')
            }
        })
    }
})()



