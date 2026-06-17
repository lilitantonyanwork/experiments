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
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
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
    document.querySelector('.btn__more').addEventListener('click', function (){
        document.querySelector('.product__more--desc').classList.toggle('open');
    })
    document.querySelector('.btn__menu').addEventListener('click', function (){
        document.querySelector('.menu').classList.toggle('open');
    })
});