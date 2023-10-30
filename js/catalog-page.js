document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.querySelector(".menu__btn");
  const menuClose = document.querySelector(".menu .close-menu");
  const headerContactsDropdown = document.querySelector(".header-contacts .dropdown");
  const headerTopDropdown = document.querySelector(".top-header .dropdown");
  const headerBottomDropdowns = document.querySelectorAll(".header-bottom .dropdown");
  const headerBottomList = document.querySelector(".header-bottom__container");
  const actionCatalog = document.querySelector(".actions-item_catalog");
  const catalogMenu = document.querySelector(".catalog-menu");
  const catalogMenuClose = document.querySelector(".catalog-menu .close-menu");
  const catalogMenuBtns = document.querySelectorAll(".catalog-menu__btn");
  const submenuBackBtns = document.querySelectorAll(".submenu-back");

  const filter = document.querySelector(".filter");
  const rangeSlider = document.getElementById("range-slider");
  const input0 = document.getElementById("input-0");
  const input1 = document.getElementById("input-1");
  const inputs = [input0, input1];
  const filterCategoryItems = filter.querySelectorAll(".filter-group_category .filter-group__item");
  const filterGroupsTitles = filter.querySelectorAll(".filter-group_dropdown .filter-group__title");
  const filterColors = filter.querySelectorAll(".filter-group__colors-item");
  const filterMobileBtn = document.querySelector(".products-block__filter-btn");
  const moreBlock = document.querySelector("[data-show-default]");
  const showElementCount = parseInt(moreBlock.dataset.showDefault);
  const filterMoreBtn = document.querySelector(".filter-group__more-btn");
  const filterResetBtn = filter.querySelector(".filter__btn_reset");
  const filterSendBtn = filter.querySelector(".filter__btn_send");
  const filterCloseBtn = document.querySelector(".filter .close-menu");
  const productsBlockCards = document.querySelector(".products-block__cards");
  const productsBlockMoreBtn = document.querySelector(".products-block__more-btn")

  const normalize_count_form = (number, words_arr) => {
    number = Math.abs(number);
    if (Number.isInteger(number)) {
      let options = [2, 0, 1, 1, 1, 2];
      return words_arr[
        number % 100 > 4 && number % 100 < 20
          ? 2
          : options[number % 10 < 5 ? number % 10 : 5]
      ];
    }
    return words_arr[1];
  };

  const getProducts = async (productsCount, skip = 0) => {
    const jsonProductsFilePath = "json/products.json";
    const response = await fetch(jsonProductsFilePath);

    if (response.ok) {
      let data = await response.json();
      let productsData = data.products.splice(skip, productsCount);
      let isShowMoreBtn = productsCount == productsData.length;

      productsBlockMoreBtn.textContent = "Ожидаем поступление"
      productsBlockMoreBtn.classList.add("_hold")

      loadProducts(productsData, isShowMoreBtn);
    } else {
      alert("Ошибка загрузки товаров");
    }
  };

  const uid = () => Date.now().toString(36) + Math.random().toString(36).substring(2);

  const loadProducts = (products, isShowMoreBtn = true) => {
    if (products.length > 0) {
      let res = ""

      for (let i = 0; i < products.length; i++) {
        const productsEl = products[i];
        let bouquetCard = `<li class="prdducts-block__card bouquet-card" data-pid=${productsEl.id}>`;

        let bouquetHeader = `<div class="bouquet-card__header">`;

        let bouquetHeaderDesc = ""
        if (productsEl.details) {
          bouquetHeaderDesc = `
            <div class="bouquet-card__header-desc card-header-desc">
                <div class="card-header-desc__sizes">
                    <div class="card-header-desc__size card-header-desc__size_width">
                        ${productsEl.details.width}
                    </div>
                    <div class="card-header-desc__size card-header-desc__size_height">
                    ${productsEl.details.height}
                    </div>
                </div>
                <span class="card-header-desc__text">
                    ${productsEl.details.description}
                </span>
            </div>          
          `;
        }

        let bouquetHeaderActions = `
            <div class="bouquet-card__header-actions">
                <button class="bouquet-card__header-action bouquet-card__header-action_favorite">
                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M8.99999 3.48405C5.37633 -0.894597 1.55034 2.21662 1.5 5.57044C1.5 10.5634 7.56608 14.6615 8.99999 14.6615C10.4339 14.6615 16.5 10.5634 16.5 5.57044C16.4497 2.21662 12.6236 -0.894597 8.99999 3.48405Z"
                            fill="white" />
                        <path
                            d="M8.99999 3.48405C5.37633 -0.894597 1.55034 2.21662 1.5 5.57044C1.5 10.5634 7.56608 14.6615 8.99999 14.6615C10.4339 14.6615 16.5 10.5634 16.5 5.57044C16.4497 2.21662 12.6236 -0.894597 8.99999 3.48405Z"
                            stroke="#353949" stroke-width="1.5" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                </button>
        `
        if (productsEl.details) {
          bouquetHeaderActions += `
              <button class="bouquet-card__header-action bouquet-card__header-action_details">
                <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 6.01027C13 7.07142 10.3137 10.8103 7 10.8103C3.68629 10.8103 1 7.07142 1 6.01027C1 4.94911 3.68629 1.21027 7 1.21027C10.3137 1.21027 13 4.94911 13 6.01027Z" fill="white"/>
                    <path d="M13 6.01027C13 7.07142 10.3137 10.8103 7 10.8103C3.68629 10.8103 1 7.07142 1 6.01027C1 4.94911 3.68629 1.21027 7 1.21027C10.3137 1.21027 13 4.94911 13 6.01027Z" stroke="#505567" stroke-width="1.5" stroke-linejoin="round"/>
                    <path d="M6.99922 7.81027C7.99333 7.81027 8.79922 7.00438 8.79922 6.01027C8.79922 5.01615 7.99333 4.21027 6.99922 4.21027C6.00511 4.21027 5.19922 5.01615 5.19922 6.01027C5.19922 7.00438 6.00511 7.81027 6.99922 7.81027Z" fill="white" stroke="#505567" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>  
              </button>
            </div>
          `
        } else {
          bouquetHeaderActions += "</div>"
        }

        let bouquetHeaderImages = `
            <a href="#" class="bouquet-card__link">
              <div class="bouquet-card__images swiper">
                  <div class="swiper-wrapper">
        `
        for (let j = 0; j < productsEl.images.length; j++) {
          bouquetHeaderImages += `
              <div class="swiper-slide">
                <img src=${productsEl.images[j]} alt="Цветы">
              </div>
          `
        }
        bouquetHeaderImages += `
              </div>
              <div class="swiper-pagination"></div>
          </div>
        </a>
        `

        bouquetHeader += bouquetHeaderDesc
        bouquetHeader += bouquetHeaderActions
        bouquetHeader += bouquetHeaderImages
        bouquetHeader += "</div>"

        let bouquetBody = `<div class="bouquet-card__body">`
        
        let bouquetBodyTitle = `<h3 class="bouquet-card__title">${productsEl.title}</h3>`
        let bouquetBodyRating = `
          <div class="bouquet-card__rating">
            <span class="bouquet-card__rating-number">${productsEl.rating}</span>
            <span class="bouquet-card__rating-feedback">(${productsEl.feedbackCount} ${normalize_count_form(productsEl.feedbackCount, ["отзыв", "отзыва", "отзывов"])})</span>
          </div>
        `
        let bouquetBodyDelivery = `
          <div class="bouquet-card__delivery">
            <span class="bouquet-card__delivery-time">${productsEl.deliveryTimeInMinutes} мин</span>
          </div>
        `
        let bouquetBodyWrapper = `<div class="bouquet-card__wrapper">${bouquetBodyRating}${bouquetBodyDelivery}</div>`

        let bouquetBodySizes = `
        <div class="bouquet-card__sizes"> 
          <label class="bouquet-card__sizes-label">Размер:</label>
          <div class="radio">
              <ul class="radio__list">
        `
        for (let j = 0; j < productsEl.sizes.length; j++) {
          const puid = uid()
          bouquetBodySizes += `
              <li class="radio__item">
                  <input type="radio" name="radio${productsEl.id}" value=${productsEl.sizes[j].value} id="${puid}">
                  <label for="${puid}">
                      <span>${productsEl.sizes[j].label}</span>
                  </label>
              </li>
          `
        }
        bouquetBodySizes += `
            </ul>
            </div>
        </div>
        `

        bouquetBody += bouquetBodyTitle
        bouquetBody += bouquetBodyWrapper
        bouquetBody += bouquetBodySizes
        bouquetBody += "</div>"

        let bouquetBottom = `<div class="bouquet-card__bottom">`
        let bouquetBottomPrices = `
            <div class="bouquet-card__prices">
            <p class="bouquet-card__price">${productsEl.price}</p>
            <p class="bouquet-card__price bouquet-card__price_old">
                ${productsEl.priceOld}
            </p>
        </div>
        `
        let bouquetBottomBtn = `
              <button type="button" class="bouquet-card__btn">
              <div class="bouquet-card__btn-icon">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.14991 17.0637C1.40314 14.1881 1.10756 10.6658 1.0256 8.75375C1.00195 8.20197 1.44772 7.75513 2 7.75513H18C18.5523 7.75513 18.998 8.20197 18.9744 8.75375C18.8924 10.6658 18.5969 14.1881 17.8501 17.0637C17.6501 17.8338 17.0868 18.4344 16.3043 18.5787C15.133 18.7948 13.1135 19.0051 10 19.0051C6.88651 19.0051 4.86695 18.7948 3.69568 18.5787C2.91323 18.4344 2.3499 17.8338 2.14991 17.0637Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M4.75 7.75512V6.00513C4.75 3.2437 6.98858 1.00513 9.75 1.00513H10.25C13.0114 1.00513 15.25 3.2437 15.25 6.00513V7.75512" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M7 12.2551V14.5051M13 12.2551V14.5051" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
              </div>
                  
              <span class="bouquet-card__btn-text">В корзину</span>
          </button>
        `

        bouquetBottom += bouquetBottomPrices
        bouquetBottom += bouquetBottomBtn
        bouquetBottom += "</div>"

        bouquetCard += bouquetHeader
        bouquetCard += bouquetBody
        bouquetCard += bouquetBottom
        bouquetCard += "</li>"

        res += bouquetCard
      }

      productsBlockCards.insertAdjacentHTML("beforeend", res);

      if (productsBlockCards.children.length == 1) {
        productsBlockCards.classList.add("one-element")
      } else if (productsBlockCards.children.length == 2) {
        productsBlockCards.classList.remove("one-element")
        productsBlockCards.classList.add("two-elements")
      } else {
        productsBlockCards.className = "products-block__cards"
      }

      const bouquetCardImages = document.querySelectorAll(".bouquet-card__images");
      bouquetCardImages.forEach((cardImages) => {
        new Swiper(cardImages, {
          slidesPerView: 1,
          slidesPerGroup: 1,
          pagination: {
            el: ".bouquet-card__images .swiper-pagination",
            type: "bullets",
            clickable: true,
          },
        });
      })
    } 

    if (!isShowMoreBtn) {
      productsBlockMoreBtn.remove()
    } else {
      productsBlockMoreBtn.textContent = "Показать ещё"
      productsBlockMoreBtn.classList.remove("_hold")
    }
  };

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

  noUiSlider.create(rangeSlider, {
    start: [1200, 35500],
    connect: true,
    range: {
      min: 500,
      max: 45500,
    },
  });

  rangeSlider.noUiSlider.on("update", function (values, handle) {
    inputs[handle].value = Math.round(values[handle]);
  });

  const setRangeSlider = (i, value) => {
    let arr = [null, null];
    arr[i] = value;

    rangeSlider.noUiSlider.set(arr);
  };

  inputs.forEach((el, index) => {
    el.addEventListener("input", (e) => {
      setRangeSlider(index, e.target.value);
    });
  });

  filterCategoryItems.forEach((categoryItem) => {
    categoryItem.addEventListener("click", function (e) {
      const currentActiveEl = filter.querySelector(
        ".filter-group_category .filter-group__item._active"
      );
      if (currentActiveEl) {
        currentActiveEl.classList.remove("_active");
      }

      categoryItem.classList.toggle("_active");
    });
  });

  filterColors.forEach((colorItem) => {
    colorItem.addEventListener("click", function (e) {
      colorItem.classList.toggle("_active");
    });
  });

  filterGroupsTitles.forEach((titleEl) => {
    titleEl.addEventListener("click", function (e) {
      const filterGroup = titleEl.closest(".filter-group");
      filterGroup.classList.toggle("_open");

      const filterGroupList = filterGroup.querySelector(".filter-group__list");
      if (filterGroup.classList.contains("_open")) {
        filterGroupList.style.maxHeight = filterGroupList.scrollHeight + "px";
      } else {
        filterGroupList.style.maxHeight = null;
      }
    });
  });

  for (let i = showElementCount; i < moreBlock.children.length; i++) {
    moreBlock.children[i].style.display = "none";
  }

  filterMoreBtn.addEventListener("click", function (e) {
    for (let i = showElementCount; i < moreBlock.children.length; i++) {
      moreBlock.children[i].style.display = "block";
    }
    moreBlock.style.maxHeight = moreBlock.scrollHeight + "px";
    filterMoreBtn.remove();
  });

  filterResetBtn.addEventListener("click", function (e) {
    const activeElements = filter.querySelectorAll("._active");
    activeElements.forEach((activeItem) => {
      activeItem.classList.remove("_active");
    });

    rangeSlider.noUiSlider.reset();

    const checkedInputs = filter.querySelectorAll("input:checked");
    checkedInputs.forEach((inpEl) => {
      inpEl.checked = false;
    });
  });

  filterSendBtn.addEventListener("click", function (e) {
    const data = {};

    const categoryActive = filter.querySelector(
      ".filter-group_category .filter-group__item._active"
    );
    if (categoryActive) {
      data.category = categoryActive.textContent.trim();
    }

    data.priceValues = rangeSlider.noUiSlider.get();

    const colorsActive = filter.querySelectorAll(
      ".filter-group_colors .filter-group__colors-item._active"
    );
    const colors = [];
    colorsActive.forEach((activeEl) => {
      colors.push(activeEl.dataset.color);
    });
    data.colors = colors.length > 0 ? colors : null;

    const diametersActive = filter.querySelectorAll(
      ".filter-subgroup_diameter input:checked"
    );
    const diametersArr = [];
    diametersActive.forEach((activeEl) => {
      diametersArr.push(activeEl.value);
    });
    data.diameters = diametersArr.length > 0 ? diametersArr : null;

    const heightsActive = filter.querySelectorAll(
      ".filter-subgroup_height input:checked"
    );
    const heightsArr = [];
    heightsActive.forEach((activeEl) => {
      heightsArr.push(activeEl.value);
    });
    data.heights = heightsArr.length > 0 ? heightsArr : null;

    const compositionsActive = filter.querySelectorAll(
      ".filter-group_composition input:checked"
    );
    const compositionsArr = [];
    compositionsActive.forEach((activeEl) => {
      compositionsArr.push(activeEl.value);
    });
    data.compositions = compositionsArr.length > 0 ? compositionsArr : null;

    const whomsActive = filter.querySelectorAll(
      ".filter-group_whom input:checked"
    );
    const whomsArr = [];
    whomsActive.forEach((activeEl) => {
      whomsArr.push(activeEl.value);
    });
    data.whoms = whomsArr.length > 0 ? whomsArr : null;

    console.log(data);
  });

  const sortSelect = document.querySelector("#sort");
  const sortChoice = new Choices(sortSelect, {
    itemSelectText: "",
    loadingText: "Загрузка данных...",
    noChoicesText: "Элементы списка отсутствуют",
    position: "bottom",
    searchResultLimit: 9999,
    searchEnabled: false,
    shouldSort: false,
  });

  sortChoice.setChoices(
    [
      {
        value: 1,
        label: "По алфавиту",
      },
      {
        value: 2,
        label: "По популярности",
      },
      {
        value: 3,
        label: "По убыванию цены",
      },
      {
        value: 4,
        label: "По возрастанию цены",
      },
    ],
    "value",
    "label",
    true
  );

  sortChoice.setChoiceByValue(2);
  
  const productsShowCount = 6
  const productsBlockCardsActions = () => {
    const productsBlock = document.querySelector(".products-block")
    productsBlock.addEventListener("click", function(evt) {
      const targetEl = evt.target
      if (targetEl.closest(".bouquet-card__header-action_favorite")) {
        const favBtn = targetEl.closest(".bouquet-card__header-action_favorite")
        if (favBtn.classList.contains("_active")) {
          favBtn.classList.remove("_active");
        } else {
          favBtn.classList.add("_active");
        }
      } else if (targetEl.closest(".bouquet-card__header-action_details")) {
        const cardHeaderDesc = targetEl.closest(".bouquet-card__header").querySelector(".card-header-desc");
        cardHeaderDesc.classList.toggle("_show");

        targetEl.closest(".bouquet-card__header-action_details").classList.toggle("_active");
      }
    })
  }
  productsBlockCardsActions()

  if (productsBlockMoreBtn) {
    productsBlockMoreBtn.addEventListener("click", function() {
      const skip = productsBlockCards.querySelectorAll(".bouquet-card").length
      getProducts(productsShowCount, skip)
    })
  }
  
  getProducts(productsShowCount)

  if (filterMobileBtn) {
    filterMobileBtn.addEventListener("click", function (e) {
      document.body.classList.add("no-scroll");
      document.body.classList.add("backdrop");
      filter.classList.add("_open");
    });
  }

  if (filterCloseBtn) {
    filterCloseBtn.addEventListener("click", function (e) {
      document.body.classList.remove("no-scroll");
      document.body.classList.remove("backdrop");
      filter.classList.remove("_open");
    });
  }

  const footerWrapperTitles = document.querySelectorAll(".footer__wrapper-title");
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