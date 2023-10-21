document.addEventListener("DOMContentLoaded", () => {
    const headerBannerClose = document.querySelector(".header-banner__close")
    headerBannerClose.addEventListener("click", function() {
        headerBannerClose.closest(".header-banner").remove()
    })

    const menuBtn = document.querySelector(".menu__btn")
    const menuClose = document.querySelector(".menu .close-menu")
    menuBtn.addEventListener("click", function(evt) {
        document.body.classList.add("no-scroll")
        menuBtn.closest(".menu").classList.add("_open")
    })

    menuClose.addEventListener("click", function(e) {
        document.body.classList.remove("no-scroll")
        menuBtn.closest(".menu").classList.remove("_open")
    })

    const moveContactsDropdown = (headerContactsDropdown) => {
        const dropdownContent = headerContactsDropdown.querySelector(".dropdown__content")
        const docW = document.body.offsetWidth
        const dropdownContentWidth = dropdownContent.offsetWidth
        const leftPos = dropdownContent.offsetLeft
        const rightPos = docW - dropdownContentWidth - leftPos
        dropdownContent.style.right = `max(15px, ${rightPos}px)`
    }

    const moveTopDropdown = (headerTopDropdown) => {
        const dropdownContent = headerTopDropdown.querySelector(".dropdown__content")
        const leftPos = dropdownContent.offsetLeft
        const docW = document.body.offsetWidth
        const dropdownContentWidth = dropdownContent.offsetWidth
        const rightPos = docW - dropdownContentWidth - leftPos

        dropdownContent.style.right = `max(15px, ${rightPos}px)`
    }

    const headerContactsDropdown = document.querySelector(".header-contacts .dropdown")
    headerContactsDropdown.addEventListener("mouseover", function() {
       moveContactsDropdown(headerContactsDropdown)
    })

    const contactsDropdownBreakpoint = window.matchMedia("(min-width: 769px)")
    if (contactsDropdownBreakpoint.matches) {
        moveContactsDropdown(headerContactsDropdown)
    }
    

    const headerTopDropdown = document.querySelector(".top-header .dropdown")
    headerTopDropdown.addEventListener("mouseover", function() {
        moveTopDropdown(headerTopDropdown)
    })

    moveTopDropdown(headerTopDropdown)

    const headerBottomDropdowns = document.querySelectorAll(".header-bottom .dropdown")
    const headerBottomList = document.querySelector(".header-bottom__container")
    const headerBottomBreakpoint = window.matchMedia("(min-width: 576px)")
    if (headerBottomBreakpoint.matches) {
        headerBottomList.addEventListener("scroll", function() {
            headerBottomDropdowns.forEach(bottomDropdownItem => {
                const dropdownContent = bottomDropdownItem.querySelector(".dropdown__content")
                dropdownContent.style.left = `${bottomDropdownItem.getBoundingClientRect().x}px`
            })
        })
    }
    

    const actionCatalog = document.querySelector(".actions-item_catalog")
    const catalogMenu = document.querySelector(".catalog-menu")
    actionCatalog.addEventListener("click", function() {
        document.body.classList.add("no-scroll")
        catalogMenu.classList.add("_open")
    }) 

    const catalogMenuClose = document.querySelector(".catalog-menu .close-menu")
    catalogMenuClose.addEventListener("click", function() {
        document.body.classList.remove("no-scroll")
        catalogMenu.classList.remove("_open")
    })

    const catalogMenuBtns = document.querySelectorAll(".catalog-menu__btn")
    catalogMenuBtns.forEach(catalogMenuItem => {
        catalogMenuItem.addEventListener("click", function() {
            const submenuId = catalogMenuItem.dataset.submenuId
            const submenu = catalogMenu.querySelector(`.catalog-submenu[data-id='${submenuId}']`)
            if (submenu) {
                catalogMenuItem.closest(".catalog-menu__content").classList.add("translate")
                submenu.classList.add("_show")
            }
        })
    })

    const submenuBackBtns = document.querySelectorAll(".submenu-back")
    submenuBackBtns.forEach(backBtn => {
        backBtn.addEventListener("click", function() {
            const activeSubmenu = catalogMenu.querySelector(".catalog-submenu.show")
            const catalogMenuContent = catalogMenu.querySelector(".catalog-menu__content")
            
            activeSubmenu.classList.remove("_show")
            catalogMenuContent.classList.remove("_translate")
        })
    })
   
    new Swiper(".banners__slider", {
        spaceBetween: 20,
        navigation: {
            nextEl: '.banners__slider-arrows .swiper-next',
            prevEl: '.banners__slider-arrows .swiper-prev',
        },
        pagination: {
            el: '.banners__slider .swiper-pagination',
            type: 'bullets',
            clickable: true
        }
    })

    const promocodeBtns = document.querySelectorAll(".banner-slide__promocode-btn") 
    promocodeBtns.forEach(promocodeBtn => {
        promocodeBtn.addEventListener("click", function () {
            let promocodeName = promocodeBtn.previousElementSibling.textContent.trim()
            navigator.clipboard
                .writeText(promocodeName)
                .then(() => alert("Промокод успешно скопирован!"))
        })
    })

    new Swiper(".bouquet-delivery__slider", {
        spaceBetween: 20,
        navigation: {
            nextEl: '.bouquet-delivery__slider-arrows .swiper-next',
            prevEl: '.bouquet-delivery__slider-arrows .swiper-prev',
        },
        breakpoints: {
            320: {
                slidesPerView: 1
            },
            361: {
                slidesPerView: 1.25
            },
            425: {
                slidesPerView: 1.75
            },
            636: {
                slidesPerView: 2.5,
            },
            769: {
                slidesPerView: 3
            },
            1025: {
                slidesPerView: 4
            }
        }
    })

    new Swiper(".best-offers__slider", {
        spaceBetween: 20,
        navigation: {
            nextEl: '.best-offers__slider-arrows .swiper-next',
            prevEl: '.best-offers__slider-arrows .swiper-prev',
        },
        breakpoints: {
            320: {
                slidesPerView: 1
            },
            361: {
                slidesPerView: 1.25
            },
            425: {
                slidesPerView: 1.75
            },
            636: {
                slidesPerView: 2.5,
            },
            769: {
                slidesPerView: 3
            },
            1025: {
                slidesPerView: 4
            }
        }
    })

    new Swiper(".new-products__slider", {
        spaceBetween: 20,
        navigation: {
            nextEl: '.new-products__slider-arrows .swiper-next',
            prevEl: '.new-products__slider-arrows .swiper-prev',
        },
        breakpoints: {
            320: {
                slidesPerView: 1
            },
            361: {
                slidesPerView: 1.25
            },
            425: {
                slidesPerView: 1.75
            },
            636: {
                slidesPerView: 2.5,
            },
            769: {
                slidesPerView: 3
            },
            1025: {
                slidesPerView: 4
            }
        }
    })

    new Swiper(".sections__slider", {
        spaceBetween: 20,
        breakpoints: {
            320: {
                slidesPerView: 1.33
            },
            426: {
                slidesPerView: 2
            },
            526: {
                slidesPerView: 2.5
            },
            769: {
                slidesPerView: 3
            },
            993: {
                slidesPerView: 4
            }
        }
    })

    new Swiper(".gallery__slider", {
        spaceBetween: 20,
        navigation: {
            nextEl: '.gallery__slider-arrows .swiper-next',
            prevEl: '.gallery__slider-arrows .swiper-prev',
        },
        breakpoints: {
            320: {
                slidesPerView: 1.5
            },
            426: {
                slidesPerView: 2
            },
            526: {
                slidesPerView: 2.5
            },
            769: {
                slidesPerView: 3
            },
            993: {
                slidesPerView: 4
            }
        }
    })

    new Swiper(".feedback__slider", {
        autoHeight: true,
        navigation: {
            nextEl: '.feedback__slider-arrows .swiper-next',
            prevEl: '.feedback__slider-arrows .swiper-prev',
        }
    })

    const bouquetCardImages = document.querySelectorAll(".bouquet-card__images")
    bouquetCardImages.forEach(cardImages => {
        new Swiper(cardImages, {
            pagination: {
                el: '.bouquet-card__images .swiper-pagination',
                type: 'bullets',
                clickable: true
            }
        })
    })

    new Swiper(".news__slider", {
        spaceBetween: 20,
        breakpoints: {
            320: {
                slidesPerView: 1.33
            },
            426: {
                slidesPerView: 2
            },
            526: {
                slidesPerView: 2,
            },
            769: {
                slidesPerView: 3
            }
        }
    })  

    const footerWrapperTitles = document.querySelectorAll(".footer__wrapper-title")
    footerWrapperTitles.forEach(wrapperTitle => {
        wrapperTitle.addEventListener("click", function(e) {
            const footerWrapper = wrapperTitle.closest(".footer__wrapper")
            footerWrapper.classList.toggle("open")

            const footerList = footerWrapper.querySelector(".footer__list")
            if (footerWrapper.classList.contains("open")) {
                footerList.style.maxHeight = footerList.scrollHeight + 'px';
            } else {
                footerList.style.maxHeight = null;
            }
        })
    })

    const bouquetFavBtns = document.querySelectorAll(".bouquet-card__favorite-btn")
    bouquetFavBtns.forEach(favBtn => {
        favBtn.addEventListener("click", function() {
            favBtn.classList.toggle("_active")
        })
    })
})