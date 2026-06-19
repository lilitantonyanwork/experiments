var swiper = new Swiper(".product-thumb", {
    loop: true,
    spaceBetween: 14,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    breakpoints: {
        // when window width is >= 320px
        320: {
            slidesPerView: 4,

        },
        // when window width is >= 480px
        480: {
            slidesPerView: 4,

        },

        640: {
            slidesPerView:3,

        },
        980:{
            slidesPerView: 4
        }
    }
});
var swiper2 = new Swiper(".product-gallery", {
    loop: true,
    spaceBetween: 10,
    navigation: {

    },
        thumbs: {
        swiper: swiper,
    },
});
var swiper3 = new Swiper(".review__list", {
    loop: true,
    spaceBetween: 15,
    slidesPerView: 4,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },

    breakpoints: {
        // when window width is >= 320px
        320: {
            slidesPerView: 2,
            navigation: false,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
        },
        // when window width is >= 480px
        600: {
            slidesPerView: 2,
            navigation: true,
        },

        768: {
            slidesPerView:3,

        },
        980:{
            slidesPerView: 4
        }
    }
});
var swiper4 = new Swiper(".certificate__list", {
    loop: true,
    spaceBetween: 15,
    slidesPerView: 3,
    navigation: {
        nextEl: ".certificate__list .swiper-button-next",
        prevEl: ".certificate__list .swiper-button-prev",
    },
    breakpoints: {
        // when window width is >= 320px
        320: {
            slidesPerView: 1,

        },
        // when window width is >= 480px
        600: {
            slidesPerView: 2,

        },

        768: {
            slidesPerView:3,

        }

    }
});


document.addEventListener('DOMContentLoaded', function() {
    if(document.querySelector('.btn__more')){

        document.querySelector('.btn__more').addEventListener('click', function (){
            document.querySelector('.product__more--desc').classList.toggle('open');
        })
    }
    if(document.querySelector('.img-off')){

        document.querySelector('.img-off').addEventListener('click', function (){
            document.querySelector('.img-on').classList.toggle('hide');
            document.querySelector('.img-off').classList.toggle('hide');
        })
    }
    if(document.querySelector('.img-on')){

        document.querySelector('.img-on').addEventListener('click', function (){
            document.querySelector('.img-off').classList.toggle('hide');
            document.querySelector('.img-on').classList.toggle('hide');
        })
    }
    const menu = document.querySelector('.menu');
    const btn = document.querySelector('.btn__menu');

    btn.addEventListener('click', function (e) {
        e.stopPropagation(); // чтобы клик не ушёл дальше
        menu.classList.toggle('open');
        btn.classList.toggle('open');
    });

// клик по странице — закрываем
    document.addEventListener('click', function (e) {
        if (!menu.contains(e.target) && !btn.contains(e.target)) {
            menu.classList.remove('open');
            btn.classList.remove('open');
        }
    });

    Fancybox.bind("[data-fancybox='product']", {
        Thumbs: {
            autoStart: true,
        }
    });
    Fancybox.bind("[data-fancybox='certificate']", {
        Thumbs: {
            autoStart: true,
        }
    });
    Fancybox.bind("[data-fancybox='certificate-f']", {
        Thumbs: {
            autoStart: true,
        }
    });
    gsap.registerPlugin(ScrollTrigger);


    gsap.to(".horny", {
        y: -150,
        x: 100,
        scrollTrigger: {
            trigger: ".features__animation",
            start: "top bottom",
            end: "bottom top",
            scrub: 1
        }
    });

    gsap.to(".glow", {
        y: -150,
        x: -100,
        scrollTrigger: {
            trigger: ".features__animation",
            start: "top bottom",
            end: "bottom top",
            scrub: 1
        }
    });

    gsap.fromTo(".features__logo",
        {
            x: -300,   // старт слева
        },
        {
            x: 300,    // уезжает вправо
            ease: "none",
            scrollTrigger: {
                trigger: ".features__animation",
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });


    gsap.utils.toArray(".about__text").forEach((text, i) => {
        gsap.fromTo(text,
            {
                opacity: .2,
            },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "none",
                scrollTrigger: {
                    trigger: text,
                    scrub: true
                }
            }
        );

    });
    gsap.fromTo(".type__text--animation",
        {
            x: "100vw"
        },
        {
            x: "-100vw",
            ease: "none",
            scrollTrigger: {
                trigger: ".type__text",
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    gsap.fromTo(".lover__text",
        {
            opacity: .2,
        },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "none",
            scrollTrigger: {
                trigger: ".lover",
                scrub: true
            }
        });
    gsap.fromTo(".info__right p",
        {
            opacity: .2,
        },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "none",
            scrollTrigger: {
                trigger: ".info",
                scrub: true
            }
        });



    // const items = document.querySelectorAll('.gallery__animation--item');
    //
    // items.forEach((item, index) => {
    //
    //     gsap.to(item, {
    //         y: index % 2 === 0 ? -150 : 150,
    //         ease: "none",
    //         scrollTrigger: {
    //             trigger: ".gallery__animation",
    //             start: "top bottom",
    //             end: "bottom top",
    //             scrub: true
    //         }
    //     });
    //
    // });

    gsap.to(".gallery__col--left", {
        y: -200,
        ease: "none",
        scrollTrigger: {
            trigger: ".gallery__animation",
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });

    gsap.to(".gallery__col--right", {
        y: 200,
        ease: "none",
        scrollTrigger: {
            trigger: ".gallery__animation",
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });
});


var swiper5 = new Swiper(".products__slider", {
    loop: true,
    spaceBetween: 30,
    slidesPerView: 5,
    freeMode: true,
    centeredSlides: true,
    navigation: {
        nextEl: ".products__slider .swiper-button-next",
        prevEl: ".products__slider .swiper-button-prev",
    },
    breakpoints: {
        // when window width is >= 320px
        320: {
            slidesPerView: 4,

        },
        // when window width is >= 480px
        480: {
            slidesPerView: 4,

        },

        640: {
            slidesPerView:3,

        },
        980:{
            slidesPerView: 4
        }
    }
});