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

    (function initFeaturesMotion() {
        const motionParent = document.querySelector(".features__animation");
        if (!motionParent) return;

        function getElementViewportPercentage(el, offsets) {
            offsets = offsets || { start: 0, end: 0 };
            const rect = el.getBoundingClientRect();
            const vh = window.innerHeight;
            const s = vh * (offsets.start || 0) / 100;
            const o = vh * (offsets.end || 0) / 100;
            const a = rect.top - vh;
            const c = 0 - a + s;
            const l = rect.top + s + rect.height - a + o;
            return parseFloat((Math.max(0, Math.min(c / l, 1)) * 100).toFixed(2));
        }

        function getMovePointFromPassedPercents(total, passed) {
            if (total <= 0) return 0;
            return parseFloat(((passed / total) * 100).toFixed(2));
        }

        function clampAffectedRange(viewportPct, range) {
            let n = viewportPct;
            if (range && range.start != null && n < range.start) n = range.start;
            if (range && range.end != null && n > range.end) n = range.end;
            return n;
        }

        function getDirectionMovePoint(viewportPct, direction, range) {
            const start = range && range.start != null ? range.start : 0;
            const end = range && range.end != null ? range.end : 100;

            if (viewportPct < start) {
                if (direction === "out-in") return 0;
                if (direction === "in-out") return 100;
                const point = getMovePointFromPassedPercents(start, viewportPct);
                return direction === "in-out-in" ? 100 - point : point;
            }

            if (viewportPct < end) {
                const point = getMovePointFromPassedPercents(end - start, viewportPct - start);
                if (direction === "in-out-in") return 0;
                if (direction === "out-in-out") return 100;
                return direction === "in-out" ? 100 - point : point;
            }

            if (direction === "in-out" || direction === "out-in" || direction === "in-out-in") return 0;
            const point = getMovePointFromPassedPercents(100 - end, 100 - viewportPct);
            return direction === "in-out-in" ? 100 - point : point;
        }

        function getTranslate(viewportPct, settings) {
            const n = clampAffectedRange(viewportPct, settings.affectedRange);
            let t = n;
            if (settings.direction === "negative") t = 100 - t;
            return -(t - 50) * settings.speed;
        }

        function getScrollY(viewportPct, settings) {
            const range = settings.yRange || { start: 0, end: 100 };
            const n = clampAffectedRange(viewportPct, range);
            const progress = (n - range.start) / (range.end - range.start);
            return settings.yStart + (settings.yEnd - settings.yStart) * progress;
        }

        function getScale(viewportPct, settings) {
            const n = clampAffectedRange(viewportPct, settings.affectedRange);
            const point = getDirectionMovePoint(n, settings.direction || "in-out", settings.affectedRange);
            return 1 + (settings.speed * point) / 1000;
        }

        let activeConfig = null;
        let ticking = false;

        function applyMotion() {
            if (!activeConfig) return;

            const vp = getElementViewportPercentage(motionParent);

            gsap.set(".horny", {
                x: getTranslate(vp, activeConfig.horny.x),
                y: getScrollY(vp, activeConfig.horny),
                yPercent: activeConfig.yPercent,
                scale: getScale(vp, activeConfig.horny.scale),
                force3D: true,
            });

            gsap.set(".glow", {
                x: getTranslate(vp, activeConfig.glow.x),
                y: getScrollY(vp, activeConfig.glow),
                yPercent: activeConfig.yPercent,
                scale: getScale(vp, activeConfig.glow.scale),
                force3D: true,
            });
        }

        function onScrollFrame() {
            applyMotion();
            ticking = false;
        }

        function requestTick() {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(onScrollFrame);
            }
        }

        function bindMotion(config) {
            activeConfig = config;
            applyMotion();
            window.addEventListener("scroll", requestTick, { passive: true });
            window.addEventListener("resize", requestTick, { passive: true });
            window.addEventListener("load", requestTick, { passive: true });

            return () => {
                activeConfig = null;
                window.removeEventListener("scroll", requestTick);
                window.removeEventListener("resize", requestTick);
                window.removeEventListener("load", requestTick);
                gsap.set(".horny, .glow", { clearProps: "transform" });
            };
        }

        const logoScroll = {
            trigger: motionParent,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
        };

        const sharedScale = { speed: 4, direction: "in-out", affectedRange: { start: 0, end: 50 } };

        const featuresMM = gsap.matchMedia();

        featuresMM.add("(min-width: 601px)", () => {
            const cleanup = bindMotion({
                yPercent: 0,
                horny: {
                    x: { speed: 2, direction: "negative", affectedRange: { start: 0, end: 52 } },
                    yStart: 80,
                    yEnd: -150,
                    yRange: { start: 0, end: 100 },
                    scale: sharedScale,
                },
                glow: {
                    x: { speed: 2, affectedRange: { start: 0, end: 52 } },
                    yStart: 80,
                    yEnd: -150,
                    yRange: { start: 0, end: 100 },
                    scale: sharedScale,
                },
            });

            const logoTween = gsap.fromTo(".features__logo",
                { x: -300 },
                { x: 300, ease: "none", scrollTrigger: logoScroll }
            );

            return () => {
                cleanup();
                logoTween.scrollTrigger && logoTween.scrollTrigger.kill();
                gsap.set(".features__logo", { clearProps: "transform" });
            };
        });

        featuresMM.add("(max-width: 600px)", () => {
            const cleanup = bindMotion({
                yPercent: -50,
                horny: {
                    x: { speed: 1, direction: "negative", affectedRange: { start: 0, end: 100 } },
                    yStart: 0,
                    yEnd: -250,
                    yRange: { start: 0, end: 100 },
                    scale: sharedScale,
                },
                glow: {
                    x: { speed: 1, affectedRange: { start: 0, end: 100 } },
                    yStart: 0,
                    yEnd: -250,
                    yRange: { start: 0, end: 100 },
                    scale: sharedScale,
                },
            });

            gsap.set(".features__logo", { x: 300, y: 260 });

            const logoTween = gsap.to(".features__logo", {
                y: -250,
                x: -120,
                ease: "none",
                scrollTrigger: logoScroll,
            });

            const galleryTween = gsap.to(".gallery-mob__animation", {
                y: -200,
                ease: "none",
                scrollTrigger: {
                    trigger: ".gallery-mob",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
            });

            return () => {
                cleanup();
                logoTween.scrollTrigger && logoTween.scrollTrigger.kill();
                galleryTween.scrollTrigger && galleryTween.scrollTrigger.kill();
                gsap.set(".features__logo", { clearProps: "transform" });
            };
        });
    })();


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
    gsap.utils.toArray(".type__text--animation").forEach((text) => {
        gsap.fromTo(text,
            { x: () => text.parentElement.offsetWidth },
            {
                x: () => -text.offsetWidth,
                ease: "none",
                scrollTrigger: {
                    trigger: text.closest(".type__text"),
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
            }
        );
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
            slidesPerView: 3,

        },
        // when window width is >= 480px
        480: {
            slidesPerView: 3,

        },

        640: {
            slidesPerView:3,

        },
        980:{
            slidesPerView: 4
        }
    }
});

var swiper6 = new Swiper(".type__text--slider", {
    loop: true,
    spaceBetween: 30,
    slidesPerView: 1,
    navigation: {
        nextEl: ".type__text--slider .swiper-button-next",
        prevEl: ".type__text--slider .swiper-button-prev",
    },
});

document.querySelectorAll(".types-mob__product").forEach((product) => {
    product.addEventListener("click", function () {
        const index = Number(this.dataset.slide);
        if (!Number.isNaN(index) && swiper6) {
            swiper6.slideToLoop(index);
        }
    });
});
var swiper7 = new Swiper(".product-certificates__list", {
    loop: true,
    spaceBetween: 30,
    slidesPerView: 3,
    freeMode: true,
    centeredSlides: true,
    navigation: {
        nextEl: ".product-certificates__list .swiper-button-next",
        prevEl: ".product-certificates__list .swiper-button-prev",
    },
    breakpoints: {
        // when window width is >= 320px
        320: {
            slidesPerView: 1,

        },
        // when window width is >= 480px
        480: {
            slidesPerView: 1,

        },

        640: {
            slidesPerView:2,

        },
        980:{
            slidesPerView: 3
        }
    }
});
var swiper8 = new Swiper(".about-slider", {
    loop: true,
    spaceBetween: 30,
    slidesPerView: 1,
    freeMode: true,
    centeredSlides: true,
    navigation: {
        nextEl: ".about-slider .swiper-button-next",
        prevEl: ".about-slider .swiper-button-prev",
    },
    breakpoints: {
        // when window width is >= 320px
        320: {
            slidesPerView: 1,

        },
        // when window width is >= 480px
        480: {
            slidesPerView: 1,

        },

        640: {
            slidesPerView:2,

        },
        980:{
            slidesPerView: 3
        }
    }
});

var swiper10 = new Swiper(".lover__products--mob", {
    spaceBetween: 10,
    slidesPerView: 3,
    centeredSlides: true,
    loop: true,
    navigation: {
        nextEl: ".lover__products--mob .swiper-button-next",
        prevEl: ".lover__products--mob .swiper-button-prev",
    },
});