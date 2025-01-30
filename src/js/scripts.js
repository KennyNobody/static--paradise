import Swiper, { Navigation, Pagination } from "swiper";

const initOldCode = () => {
    const lazyLoadInstance = new LazyLoad();

    const header = document.querySelector('.header');

    // if ( header && body.classList.contains('_header-overlay') ) {
    //     window.addEventListener('scroll', () => {
    //         document.documentElement.scrollTop > 1 ?
    //             header.classList.remove('_transparent') : header.classList.add('_transparent');
    //     });
    // }

    const headerNav = document.querySelector('.header__nav'),
        nav = document.querySelector('.nav__list');

    setOpacityLinks(headerNav, true);
    setOpacityLinks(nav, false);

    function setOpacityLinks(item, leave) {
        if ( item ) {
            let navLinks = item.querySelectorAll('a');

            if ( navLinks.length > 0 ) {
                navLinks.forEach((link) => {
                    link.addEventListener('mouseenter', () => {

                        navLinks.forEach((a) => {
                            a.classList.add('_opacity');
                        });

                        link.classList.remove('_opacity');
                    });

                    if ( leave ) {
                        link.addEventListener('mouseleave', () => {
                            navLinks.forEach((a) => {
                                a.classList.remove('_opacity');
                            });
                        });
                    }
                });
            }
        }
    }

    const mainSectionTextBtn = document.querySelector('.main-section__text-btn');

    if ( mainSectionTextBtn ) {
        mainSectionTextBtn.addEventListener('click', () => {
            let hiddenText = mainSectionTextBtn.closest('.main-section__text').querySelector('.main-section__text-hidden');

            if ( hiddenText ) {
                mainSectionTextBtn.classList.add('_hide');
                hiddenText.classList.add('_show');
            }
        });
    }

    const navLinks = document.querySelectorAll('.nav__list a'),
        navItems = document.querySelectorAll('.nav__item');

    if ( navLinks.length > 0 && navItems.length > 0 ) {
        navLinks.forEach((item) => {
            item.addEventListener('mouseenter', () => {
                let i = item.getAttribute('data-item');

                navItems.forEach((navItem) => {
                    let navItemData = navItem.getAttribute('data-item');

                    if ( navItemData === i ) {
                        navItem.classList.add('_active');
                        navItem.querySelector('.nav__text').classList.remove('_hide');
                    } else {
                        if ( navItemData != 0 ) {
                            navItem.classList.remove('_active');
                        }
                    }
                });
            });
        });
    }

    const headerToggle = document.querySelectorAll('.header__nav a[data-toggle]'),
        navToggle = document.querySelectorAll('.nav');

    if ( headerToggle.length > 0 && navToggle.length > 0 ) {
        headerToggle.forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();

                let dataTarget = document.querySelector( item.getAttribute('data-toggle') );

                if (!dataTarget.classList.contains('_active')) {
                    navToggle.forEach(row => {
                        row.classList.remove('_active');
                        header.classList.remove('_black');
                    });
                }

                if ( dataTarget ) {
                    dataTarget.classList.toggle('_active');
                    header ? header.classList.toggle('_black') : '';
                }

                e.preventDefault();
            });

            navToggle.forEach(item_nav => {
                document.addEventListener('click', (e) => {
                    if ( !item_nav.contains(e.target) && !item.contains(e.target) && item_nav.classList.contains('_active') ) {
                        item_nav.classList.remove('_active');
                        header ? header.classList.remove('_black') : '';
                    }
                });
            });
        });
    }

    const navMobileLinks = document.querySelectorAll('.nav-mobile__link');

    if ( navMobileLinks.length > 0 ) {
        navMobileLinks.forEach((navMobileLink) => {
            navMobileLink.addEventListener('click', (e) => {
                let navMobileLi = navMobileLink.closest('.nav-mobile__list-item');

                if ( navMobileLi.classList.contains('_parent') ) {
                    let navMobileSub = navMobileLi.querySelector('.nav-mobile__list._sub');

                    navMobileSub ? navMobileLi.classList.add('_active') : '';

                    e.preventDefault();
                }

                if ( navMobileLink.classList.contains('_back') ) {
                    let navMobileParentLi = navMobileLink.closest('.nav-mobile__list._sub').closest('.nav-mobile__list-item');

                    navMobileParentLi ? navMobileParentLi.classList.remove('_active') : '';

                    e.preventDefault();
                }
            });
        });
    }

    const headerBurger = document.querySelector('.header__burger'),
        navMobile = document.querySelector('.nav-mobile');

    if ( headerBurger && navMobile ) {
        headerBurger.addEventListener('click', () => {
            headerBurger.classList.toggle('_active');
            navMobile.classList.toggle('_active');
            header ? header.classList.toggle('_black') : '';
        });

        window.addEventListener("DOMContentLoaded", () => {
            let vh = window.innerHeight * 0.01 * 100,
                headerHeight = 0;

            if (document.documentElement.clientWidth < 576) {
                headerHeight = 50;
            } else {
                if (document.documentElement.clientWidth < 991) {
                    headerHeight = 102;
                } else {
                    headerHeight = 72;
                }
            }

            navMobile.querySelector('.nav-mobile__content').style.height = vh - headerHeight + 'px';
        });
    }

    const formPolicy = document.querySelectorAll('input[name="policy"]');

    if ( formPolicy.length > 0 ) {
        formPolicy.forEach((item) => {
            item.addEventListener('change', () => {
                let formSubmit = item.closest('form').querySelector('button[type="submit"]');

                item.checked ? formSubmit.disabled = false : formSubmit.disabled = true;
            })
        });
    }

    window.addEventListener("DOMContentLoaded", () => {
        [].forEach.call( document.querySelectorAll('input[type="tel"]'), (input) => {
            let keyCode;

            function mask(event) {
                event.keyCode && (keyCode = event.keyCode);
                let pos = this.selectionStart;
                if (pos < 3) event.preventDefault();
                let matrix = "+7 (___) ___-__-__",
                    i = 0,
                    def = matrix.replace(/\D/g, ""),
                    val = this.value.replace(/\D/g, ""),
                    new_value = matrix.replace(/[_\d]/g, function(a) {
                        return i < val.length ? val.charAt(i++) || def.charAt(i) : a
                    });
                i = new_value.indexOf("_");
                if (i !== -1) {
                    i < 5 && (i = 3);
                    new_value = new_value.slice(0, i)
                }
                let reg = matrix.substr(0, this.value.length).replace(/_+/g,
                    function(a) {
                        return "\\d{1," + a.length + "}"
                    }).replace(/[+()]/g, "\\$&");
                reg = new RegExp("^" + reg + "$");
                if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
                if (event.type === "blur" && this.value.length < 5)  this.value = ""
            }

            input.addEventListener("input", mask, false);
            input.addEventListener("focus", mask, false);
            input.addEventListener("blur", mask, false);
            input.addEventListener("keydown", mask, false);
        });
    });

    const scrollBtns = document.querySelectorAll('.scroll');

    if ( scrollBtns.length > 0 ) {
        scrollBtns.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();

                headerBurger.classList.contains('_active') ? headerBurger.click() : '';

                let href = this.getAttribute('data-scroll').substring(1);

                const scrollTarget = document.getElementById(href);

                const topOffset = header.offsetHeight;
                const elementPosition = scrollTarget.getBoundingClientRect().top;
                const offsetPosition = elementPosition - topOffset;

                window.scrollBy({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            });
        });
    }

    const noDigits = document.querySelectorAll('.no-digits');

    if ( noDigits.length > 0 ) {
        noDigits.forEach((item) => {
            item.addEventListener('keypress', (e) => {
                '1234567890*()&^%$#@!:"|><?}{[]/.,§;'.indexOf(e.key) !== -1 ? e.preventDefault() : '';
                item.value.length > 40 ? e.preventDefault() : '';
            });
        });
    }

    const agentsCarousel = document.querySelector('.agents__carousel');

    if ( agentsCarousel ) {
        new Swiper(agentsCarousel, {
            spaceBetween: 60,
            slidesPerView: 3,
            loop: true,
            modules: [Navigation],
            lazy: {
                checkInView: true,
                loadPrevNext: true
            },
            preloadImages: false,
            navigation: {
                nextEl: '.agents__arrow._next',
                prevEl: '.agents__arrow._prev'
            },
            breakpoints: {
                0: {
                    slidesPerView: 'auto',
                    spaceBetween: 25,
                },
                575: {
                    slidesPerView: 'auto',
                    spaceBetween: 45,
                },
                991: {
                    slidesPerView: 2,
                    spaceBetween: 60,
                },
                1200: {
                    slidesPerView: 3
                }
            }
        });
    }

    const agentsModalCarousel = document.querySelectorAll('.agents-modal__carousel');

    if ( agentsModalCarousel.length > 0 ) {
        agentsModalCarousel.forEach((item) => {
            new Swiper(item, {
                spaceBetween: 0,
                slidesPerView: 1,
                loop: false,
                modules: [Pagination],
                lazy: {
                    loadPrevNext: true
                },
                preloadImages: false,
                pagination: {
                    el: item.closest('.agents-modal__carousel-wrap').querySelector('.agents-modal__pagination'),
                    clickable: true
                },
            });
        });
    }

    const jsShowModal = document.querySelectorAll('.js-show-modal');

    if ( jsShowModal.length > 0 ) {
        jsShowModal.forEach((item) => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                closeAll();

                let dataItem = item.getAttribute('data-item'),
                    modal = document.querySelector('.modal[data-item="'+dataItem+'"]');

                if ( modal ) {
                    document.querySelector('body').classList.add('_no-scroll');
                    modal.classList.add('_active');
                }

                e.preventDefault();
            });
        });
    }

    const jsCloseModal = [...document.querySelectorAll('.agents-modal__close'), ...document.querySelectorAll('[data-modal="close"]')];

    if ( jsCloseModal.length > 0 ) {
        jsCloseModal.forEach((item) => {
            item.addEventListener('click', () => {
                document.querySelector('body').classList.remove('_no-scroll');
                item.closest('.modal').classList.remove('_active');
            });
        });
    }

    const modals = document.querySelectorAll('.modal');


    if (modals.length > 0) {
        modals.forEach((item) => {
            const modalClose = item.querySelector('.agents-modal__close') || item.querySelector('.modal-partner__close');
            const modalBlock = item.querySelector('.agents-modal__block') || item.querySelector('.modal-partner__block');

            document.addEventListener('click', (e) => {
                if (
                    modalClose && !modalClose.contains(e.target) &&
                    modalBlock && !modalBlock.contains(e.target) &&
                    item.classList.contains('_active')
                ) {
                    document.querySelector('body').classList.remove('_no-scroll');
                    item.classList.remove('_active');
                }
            });
        });
    }

    function closeAll() {
        const modals = document.querySelectorAll('.modal');
        document.querySelector('body').classList.remove('_no-scroll');

        modals.forEach((item) => {
            item.closest('.modal').classList.remove('_active');
        });
    }

    const map = document.querySelector('#map');

    if ( map ) {
        ymaps.ready(init);
        function init(){
            var myMap = new ymaps.Map("map", {
                center: [map.getAttribute('data-map-center-lat'), map.getAttribute('data-map-center-long')],
                zoom: map.getAttribute('data-zoom')
            });

            let mapPoints = document.querySelectorAll('.contacts__item');

            if ( mapPoints.length > 0 ) {
                mapPoints.forEach((item) => {
                    let myGeoObjectMoscow = new ymaps.Placemark([item.getAttribute('data-map-lat'), item.getAttribute('data-map-long')], {}, {
                        iconLayout: 'default#image',
                        iconImageHref: item.getAttribute('data-map-marker'),
                        iconImageSize: [264, 277],
                        iconImageOffset: [-131, -170]
                    });

                    myMap.geoObjects.add(myGeoObjectMoscow);
                });
            }

            myMap.behaviors.disable('scrollZoom');
        }
    }

    const reviews = document.querySelector('.reviews__carousel');

    if ( reviews ) {
        const reviewsSwiper = new Swiper(reviews, {
            direction: 'vertical',
            slidesPerView: 'auto',
            loop: false,
            mousewheel: {
                eventsTarget: '.reviews .container',
            },
            freeMode: {
                enabled: true
            },
            on: {
                progress: function (a,b) {
                    b === 1 ? reviews.classList.add('_stop') : reviews.classList.remove('_stop');
                    b > 0 ? reviews.classList.add('_start') : reviews.classList.remove('_start');
                },
            },
            breakpoints: {
                0: {
                    enabled: false,
                    mousewheel: {
                        eventsTarget: '.reviews .reviews__carousel',
                    }
                },
                991: {
                    enabled: true,
                    mousewheel: {
                        eventsTarget: '.reviews .container',
                    }
                }
            }
        });

        const reviewsTextBtn = document.querySelectorAll('.reviews__item-btn');

        if ( reviewsTextBtn.length > 0 ) {
            reviewsTextBtn.forEach((item) => {
                item.addEventListener('click', () => {
                    let itemText = item.closest('.reviews__item').querySelector('.reviews__item-text');

                    itemText.classList.add('_active');
                    item.classList.add('_hide');

                    reviewsSwiper.updateSize();
                    reviewsSwiper.updateSlides();
                });
            });
        }
    }

    const introContent = document.querySelector('.intro__content');

    if ( introContent ) {
        window.addEventListener("DOMContentLoaded", () => {
            let vh = window.innerHeight * 0.01 * 100;
            document.querySelector('.intro__content').style.minHeight = vh + 'px';
        });
    }

    const partnersCarousel = document.querySelector('.partners__carousel');

    if ( partnersCarousel && +partnersCarousel.getAttribute('data-length') > 3 ) {
        new Swiper(partnersCarousel, {
            spaceBetween: 60,
            slidesPerView: 4,
            loop: true,
            centeredSlides: true,
            breakpoints: {
                0: {
                    slidesPerView: 2
                },
                575: {
                    slidesPerView: 2
                },
                991: {
                    slidesPerView: 4
                }
            }
        });
    }

    const cookies = document.querySelector('.cookies');

    if ( cookies ) {
        if (localStorage) {
            localStorage.getItem('visited') ? ''
                : cookies.classList.add('_active');
        } else {
            cookies.classList.add('_active');
        }
        localStorage.setItem('visited', true);

        const cookieClose = cookies.querySelector('.cookies__close');

        if ( cookieClose ) {
            cookieClose.addEventListener('click', () => {
                cookies.classList.remove('_active');
            });
        }
    }

    const footer = document.querySelector('.footer'),
        footerRadial = document.querySelector('.footer__animation-radial');

    if ( footer && footerRadial ) {
        footer.addEventListener('mousemove', (e) => {
            footerRadial.style.right = 'calc(50% - ' + e.clientX + 'px)';
        });
    }

    AOS.init();

    $(document).on('af_complete', function(event, response) {
        var form = response.form;

        if (response['success'] === true) {
            let thankyou = document.querySelector('#thankyou');

            if ((form.attr('id') === 'feedback-form') || (form.attr('id') === 'feedback-form2')) {
                document.querySelector('body').classList.add('_no-scroll');
                thankyou.classList.add('_active');
            }

            if (form.attr('id') === 'feedback-modal-form') {
                document.querySelector('body').classList.add('_no-scroll');
                document.querySelector('.modal[data-item="feedback"]').classList.remove('_active');
                thankyou.classList.add('_active');
            }
        }
    });

    document.addEventListener('fetchit:success', (e) => {
        const { form } = e.detail;
        const thankyou = document.querySelector('#thankyou');

        if ((form.getAttribute('id') == 'feedback-form') || (form.getAttribute('id') == 'feedback-form2')) {
            document.querySelector('body').classList.add('_no-scroll');
            thankyou.classList.add('_active');
        }

        if (form.getAttribute('id') == 'feedback-modal-form') {
            document.querySelector('body').classList.add('_no-scroll');
            document.querySelector('.modal[data-item="feedback"]').classList.remove('_active');
            thankyou.classList.add('_active');
        }
    });
};

export {
    initOldCode,
}
