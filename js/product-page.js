document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.querySelector(".menu__btn");
  const menuClose = document.querySelector(".menu .close-menu");
  const headerContactsDropdown = document.querySelector(
    ".header-contacts .dropdown"
  );
  const headerTopDropdown = document.querySelector(".top-header .dropdown");
  const headerBottomDropdowns = document.querySelectorAll(
    ".header-bottom .dropdown"
  );
  const headerBottomList = document.querySelector(".header-bottom__container");
  const actionCatalog = document.querySelector(".actions-item_catalog");
  const catalogMenu = document.querySelector(".catalog-menu");
  const catalogMenuClose = document.querySelector(".catalog-menu .close-menu");
  const catalogMenuBtns = document.querySelectorAll(".catalog-menu__btn");
  const submenuBackBtns = document.querySelectorAll(".submenu-back");

  const moveContactsDropdown = (headerContactsDropdown) => {
    const dropdownContent =
      headerContactsDropdown.querySelector(".dropdown__content");
    const docW = document.body.offsetWidth;
    const dropdownContentWidth = dropdownContent.offsetWidth;
    const leftPos = dropdownContent.offsetLeft;
    const rightPos = docW - dropdownContentWidth - leftPos;
    dropdownContent.style.right = `max(15px, ${rightPos}px)`;
  };

  const moveTopDropdown = (headerTopDropdown) => {
    const dropdownContent =
      headerTopDropdown.querySelector(".dropdown__content");
    const leftPos = dropdownContent.offsetLeft;
    const docW = document.body.offsetWidth;
    const dropdownContentWidth = dropdownContent.offsetWidth;
    const rightPos = docW - dropdownContentWidth - leftPos;

    dropdownContent.style.right = `max(15px, ${rightPos}px)`;
  };

  menuBtn.addEventListener("click", function (evt) {
    document.body.classList.add("no-scroll");
    menuBtn.closest(".menu").classList.add("_open");
  });

  menuClose.addEventListener("click", function (e) {
    document.body.classList.remove("no-scroll");
    menuBtn.closest(".menu").classList.remove("_open");
  });

  headerContactsDropdown.addEventListener("mouseover", function () {
    moveContactsDropdown(headerContactsDropdown);
  });

  const contactsDropdownBreakpoint = window.matchMedia("(min-width: 769px)");
  if (contactsDropdownBreakpoint.matches) {
    moveContactsDropdown(headerContactsDropdown);
  }

  headerTopDropdown.addEventListener("mouseover", function () {
    moveTopDropdown(headerTopDropdown);
  });

  moveTopDropdown(headerTopDropdown);

  const headerBottomBreakpoint = window.matchMedia("(min-width: 576px)");
  if (headerBottomBreakpoint.matches) {
    headerBottomList.addEventListener("scroll", function () {
      headerBottomDropdowns.forEach((bottomDropdownItem) => {
        const dropdownContent =
          bottomDropdownItem.querySelector(".dropdown__content");
        dropdownContent.style.left = `${
          bottomDropdownItem.getBoundingClientRect().x
        }px`;
      });
    });
  }

  actionCatalog.addEventListener("click", function () {
    document.body.classList.add("no-scroll");
    catalogMenu.classList.add("_open");
  });

  catalogMenuClose.addEventListener("click", function () {
    document.body.classList.remove("no-scroll");
    catalogMenu.classList.remove("_open");
  });

  catalogMenuBtns.forEach((catalogMenuItem) => {
    catalogMenuItem.addEventListener("click", function () {
      const submenuId = catalogMenuItem.dataset.submenuId;
      const submenu = catalogMenu.querySelector(
        `.catalog-submenu[data-id='${submenuId}']`
      );
      if (submenu) {
        catalogMenuItem
          .closest(".catalog-menu__content")
          .classList.add("translate");
        submenu.classList.add("_show");
      }
    });
  });

  submenuBackBtns.forEach((backBtn) => {
    backBtn.addEventListener("click", function () {
      const activeSubmenu = catalogMenu.querySelector(".catalog-submenu.show");
      const catalogMenuContent = catalogMenu.querySelector(
        ".catalog-menu__content"
      );

      activeSubmenu.classList.remove("_show");
      catalogMenuContent.classList.remove("_translate");
    });
  });

  const productThumbsSlider = new Swiper(".product__slider_thumbs", {
    slidesPerView: 4,
    spaceBetween: 10
  })

  new Swiper(".product__slider_main", {
    thumbs: {
      swiper: productThumbsSlider
    }
  })

  const productCounterSubstract = document.querySelector(".product-counter__substract")
  const productCounterAdd = document.querySelector(".product-counter__add")
  const productCounterCount = document.querySelector(".product-counter__count")
  productCounterSubstract.addEventListener("click", function() {
    const currentCount = parseInt(productCounterCount.textContent)
    if (currentCount > 0) {
      productCounterCount.textContent = currentCount - 1
    }
  })
  productCounterAdd.addEventListener("click", function() {
    const currentCount = parseInt(productCounterCount.textContent)
    productCounterCount.textContent = currentCount + 1
  })

  const favBtn = document.querySelector(".product__bottom-favorite")
  favBtn.addEventListener("click", function() {
    favBtn.classList.toggle("_active")
  })

  const footerWrapperTitles = document.querySelectorAll(
    ".footer__wrapper-title"
  );
  footerWrapperTitles.forEach((wrapperTitle) => {
    wrapperTitle.addEventListener("click", function (e) {
      const footerWrapper = wrapperTitle.closest(".footer__wrapper");
      footerWrapper.classList.toggle("open");

      const footerList = footerWrapper.querySelector(".footer__list");
      if (footerWrapper.classList.contains("open")) {
        footerList.style.maxHeight = footerList.scrollHeight + "px";
      } else {
        footerList.style.maxHeight = null;
      }
    });
  });
});
