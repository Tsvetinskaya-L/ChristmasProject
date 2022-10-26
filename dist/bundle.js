/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/app/app.controller.ts":
/*!**********************************************!*\
  !*** ./src/components/app/app.controller.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppController": () => (/* binding */ AppController)
/* harmony export */ });
var AppController = /** @class */ (function () {
    function AppController(model, view) {
        this.model = model;
        this.view = view;
        this.container = document.querySelector('main');
    }
    AppController.prototype.restorePage = function () {
        this.model.restoreState();
        var page = this.model.state.currentPage;
        if (page === 'start') {
            this.showStartPage();
        }
        else if (page === 'toys') {
            this.showToysPage();
        }
        else if (page === 'tree') {
            this.showTreePage();
        }
        else {
            this.showStartPage();
        }
    };
    AppController.prototype.showStartPage = function () {
        this.container.innerHTML = this.view.getStartPageTemaplate();
        this.setupStartPageHendlers();
        this.model.setState('currentPage', 'start');
    };
    AppController.prototype.showToysPage = function () {
        this.model.setState('currentPage', 'toys');
        this.container.innerHTML = this.view.getToysPageTemplate();
        this.container.querySelector('.filter1-container').innerHTML = this.view.getFilters1Template(this.model.state);
        this.container.querySelector('.filter2-container').innerHTML = this.view.getFilters2Template(this.model.state);
        this.container.querySelector('.filter3-container').innerHTML = this.view.getFilters3Temlate();
        this.setupToysPageHandlers();
        if (this.model.state.sort) {
            this.applySort(this.model.state.sort);
        }
        this.renderCards();
    };
    AppController.prototype.showTreePage = function () {
        this.model.setState('currentPage', 'tree');
    };
    AppController.prototype.setupStartPageHendlers = function () {
        var _this = this;
        var btnStartPage = document.querySelector('.switch-start-page');
        btnStartPage.addEventListener('click', function () { return _this.showToysPage(); });
    };
    AppController.prototype.setupToysPageHandlers = function () {
        var _this = this;
        this.updateCounter();
        var allFiltersContainer = document.querySelector('#toysPage');
        var selectSort = document.querySelector('.sort-select');
        allFiltersContainer.addEventListener('click', function (event) {
            if (event.target.classList.contains('reset')) {
                _this.model.resetState();
                _this.model.saveState();
                selectSort.selectedIndex = 0;
                _this.updateCounter();
            }
            var type = event.target.dataset.type;
            var isCheckbox = event.target.dataset.checkbox;
            var isFilterFrom = event.target.dataset.filterFrom;
            var isFilterTo = event.target.dataset.filterTo;
            var isFilterFromYear = event.target.dataset.filterFromYear;
            var isFilterToYear = event.target.dataset.filterToYear;
            var cardClick = event.target.closest('.card');
            if (type) {
                var currentState = event.target.classList.contains('active');
                _this.model.setState('filter.' + type + '.' + event.target.dataset.filter, !currentState);
            }
            else if (isCheckbox) {
                var filterChekboxFavorite = document.querySelector('.favorite-input');
                _this.model.setState('filter.favorite', !filterChekboxFavorite.checked);
            }
            else if (isFilterFrom) {
                _this.model.setState('filter.from', event.target.value);
            }
            else if (isFilterTo) {
                _this.model.setState('filter.to', event.target.value);
            }
            else if (isFilterFromYear) {
                _this.model.setState('filter.fromYear', event.target.value);
            }
            else if (isFilterToYear) {
                _this.model.setState('filter.toYear', event.target.value);
            }
            else if (cardClick) {
                var isSelected = cardClick.classList.contains('selected');
                var targetCard = _this.model.cards.find(function (c) { return c.model.card.id === cardClick.dataset.id; });
                var selectedCardsLength = JSON.parse(_this.model.state['selectedCards']).length;
                if (!isSelected && selectedCardsLength === 20) {
                    targetCard.showPopUp();
                }
                else {
                    targetCard.model.card.isSelected = !isSelected;
                    isSelected ? _this.model.removeCardFromSelected(targetCard) : _this.model.addCardToSelected(targetCard);
                    _this.updateCounter();
                }
            }
            _this.container.querySelector('.filter1-container').innerHTML = _this.view.getFilters1Template(_this.model.state);
            _this.container.querySelector('.filter2-container').innerHTML = _this.view.getFilters2Template(_this.model.state);
            _this.setupToysPageHandlers();
            _this.renderCards();
        }, { once: true });
        selectSort.addEventListener('change', function (event) {
            var value = event.target.value;
            _this.applySort(value);
            _this.model.setState('sort', value);
            _this.renderCards();
        });
    };
    AppController.prototype.applySort = function (value) {
        var selectSort = document.querySelector('.sort-select');
        selectSort.value = value;
        if (value === 'sort-name-max') {
            this.sortCardNameMax();
        }
        else if (value === 'sort-name-min') {
            this.sortCardNameMin();
        }
        else if (value === 'sort-year-min') {
            this.sortCardYearMin();
        }
        else if (value === 'sort-year-max') {
            this.sortCardYearMax();
        }
    };
    AppController.prototype.sortCardNameMax = function () {
        this.model.cards = this.model.cards.sort(function (a, b) {
            var nameA = a.model.card.name.toLowerCase();
            var nameB = b.model.card.name.toLowerCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });
    };
    AppController.prototype.sortCardNameMin = function () {
        this.model.cards = this.model.cards.sort(function (a, b) {
            var nameA = a.model.card.name.toLowerCase();
            var nameB = b.model.card.name.toLowerCase();
            if (nameA > nameB) {
                return -1;
            }
            if (nameA < nameB) {
                return 1;
            }
            return 0;
        });
    };
    AppController.prototype.sortCardYearMin = function () {
        this.model.cards = this.model.cards.sort(function (a, b) { return Number(b.model.card.year) - Number(a.model.card.year); });
    };
    AppController.prototype.sortCardYearMax = function () {
        this.model.cards = this.model.cards.sort(function (a, b) { return Number(a.model.card.year) - Number(b.model.card.year); });
    };
    AppController.prototype.renderCards = function () {
        var _this = this;
        var container = document.querySelector('.toys-page__cards-block');
        var stateKeys = Object.keys(this.model.state).filter(function (key) { return /^filter/.test(key); });
        var isAllfiltersUnselected = stateKeys.every(function (key) {
            return !_this.model.state[key];
        });
        var cardsTemplate = '';
        this.model.cards.forEach(function (i) {
            var card = i.model.card;
            card.isVisible = isAllfiltersUnselected || _this.isCardVisible(card);
            cardsTemplate += i.view.getTemplate(card);
        });
        container.innerHTML = cardsTemplate;
    };
    AppController.prototype.isCardVisible = function (card) {
        var matchWithShape = this.matchWithShapeFilter(card);
        var matchWithSize = this.matchWithSize(card);
        var matchWhisColor = this.matchWithColor(card);
        var matchWithFavorite = this.matchWithFavorite(card);
        var matchWithFrom = this.matchWithFrom(card);
        var matchWithTo = this.matchWithTo(card);
        var matchWithFromYear = this.matchWithFromYear(card);
        var matchWithToYear = this.matchWithToYear(card);
        return (matchWithShape &&
            matchWithSize &&
            matchWhisColor &&
            matchWithFavorite &&
            matchWithFrom &&
            matchWithTo &&
            matchWithFromYear &&
            matchWithToYear);
    };
    AppController.prototype.matchWithFromYear = function (card) {
        if (!this.model.state['filter.fromYear']) {
            return true;
        }
        return Number(card.year) >= Number(this.model.state['filter.fromYear']);
    };
    AppController.prototype.matchWithToYear = function (card) {
        if (!this.model.state['filter.toYear']) {
            return true;
        }
        return Number(card.year) <= Number(this.model.state['filter.toYear']);
    };
    AppController.prototype.matchWithFrom = function (card) {
        if (!this.model.state['filter.from']) {
            return true;
        }
        return Number(card.count) >= Number(this.model.state['filter.from']);
    };
    AppController.prototype.matchWithTo = function (card) {
        if (!this.model.state['filter.to']) {
            return true;
        }
        return Number(card.count) <= Number(this.model.state['filter.to']);
    };
    AppController.prototype.matchWithShapeFilter = function (card) {
        if (!this.model.state['filter.shape.ball'] &&
            !this.model.state['filter.shape.shisha'] &&
            !this.model.state['filter.shape.figurka'] &&
            !this.model.state['filter.shape.snezinka'] &&
            !this.model.state['filter.shape.kolokolchik']) {
            return true;
        }
        switch (card.shape) {
            case 'шар':
                return !!this.model.state['filter.shape.ball'];
            case 'шишка':
                return !!this.model.state['filter.shape.shisha'];
            case 'фигурка':
                return !!this.model.state['filter.shape.figurka'];
            case 'снежинка':
                return !!this.model.state['filter.shape.snezinka'];
            case 'колокольчик':
                return !!this.model.state['filter.shape.kolokolchik'];
            default:
                return true;
        }
    };
    AppController.prototype.matchWithSize = function (card) {
        if (!this.model.state['filter.size.большой'] &&
            !this.model.state['filter.size.средний'] &&
            !this.model.state['filter.size.малый']) {
            return true;
        }
        switch (card.size) {
            case 'большой':
                return !!this.model.state['filter.size.большой'];
            case 'средний':
                return !!this.model.state['filter.size.средний'];
            case 'малый':
                return !!this.model.state['filter.size.малый'];
            default:
                return true;
        }
    };
    AppController.prototype.matchWithColor = function (card) {
        if (!this.model.state['filter.color.белый'] &&
            !this.model.state['filter.color.желтый'] &&
            !this.model.state['filter.color.красный'] &&
            !this.model.state['filter.color.синий'] &&
            !this.model.state['filter.color.зелёный']) {
            return true;
        }
        switch (card.color) {
            case 'белый':
                return !!this.model.state['filter.color.белый'];
            case 'желтый':
                return !!this.model.state['filter.color.желтый'];
            case 'красный':
                return !!this.model.state['filter.color.красный'];
            case 'синий':
                return !!this.model.state['filter.color.синий'];
            case 'зелёный':
                return !!this.model.state['filter.color.зелёный'];
            default:
                return true;
        }
    };
    AppController.prototype.matchWithFavorite = function (card) {
        if (!this.model.state['filter.favorite']) {
            return true;
        }
        return card.favorite;
    };
    AppController.prototype.updateCounter = function () {
        var count = JSON.parse(this.model.state.selectedCards);
        var selectToysSpan = document.querySelector('.selectToys-span');
        selectToysSpan.innerHTML = "".concat(count.length);
    };
    return AppController;
}());



/***/ }),

/***/ "./src/components/app/app.model.ts":
/*!*****************************************!*\
  !*** ./src/components/app/app.model.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppModel": () => (/* binding */ AppModel)
/* harmony export */ });
/* harmony import */ var _card_card_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../card/card.model */ "./src/components/card/card.model.ts");
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data */ "./src/components/app/data.ts");
/* harmony import */ var _card_card_controller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../card/card.controller */ "./src/components/card/card.controller.ts");
/* harmony import */ var _card_card_view__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../card/card.view */ "./src/components/card/card.view.ts");




var AppModel = /** @class */ (function () {
    function AppModel() {
        var _this = this;
        this.state = {
            selectedCards: '[]',
            cards: []
        };
        this.cards = [];
        _data__WEBPACK_IMPORTED_MODULE_1__["default"].forEach(function (i) {
            var card = new _card_card_controller__WEBPACK_IMPORTED_MODULE_2__.CardController(new _card_card_model__WEBPACK_IMPORTED_MODULE_0__.CardModel(i), new _card_card_view__WEBPACK_IMPORTED_MODULE_3__.CardView());
            _this.cards.push(card);
        });
    }
    AppModel.prototype.setState = function (key, newValue) {
        this.state[key] = newValue;
        this.saveState();
    };
    AppModel.prototype.saveState = function () {
        this.state.cards = this.cards.map(function (i) { return i.model.card; });
        localStorage.setItem('state', JSON.stringify(this.state));
    };
    AppModel.prototype.restoreState = function () {
        var _this = this;
        var state = JSON.parse(localStorage.getItem('state'));
        if (state) {
            this.state = state;
            if (state.cards.length) {
                this.cards = [];
                state.cards.forEach(function (i) {
                    var card = new _card_card_controller__WEBPACK_IMPORTED_MODULE_2__.CardController(new _card_card_model__WEBPACK_IMPORTED_MODULE_0__.CardModel(i), new _card_card_view__WEBPACK_IMPORTED_MODULE_3__.CardView());
                    _this.cards.push(card);
                });
            }
        }
    };
    AppModel.prototype.resetState = function () {
        this.state = {
            selectedCards: '[]',
            cards: []
        };
        this.cards.forEach(function (i) { return (i.model.card.isSelected = false); });
    };
    AppModel.prototype.addCardToSelected = function (card) {
        var selectedCards = JSON.parse(this.state.selectedCards);
        selectedCards.push(card.model.card);
        this.state.selectedCards = JSON.stringify(selectedCards);
        this.saveState();
    };
    AppModel.prototype.removeCardFromSelected = function (card) {
        var selectedCards = JSON.parse(this.state.selectedCards);
        this.state.selectedCards = JSON.stringify(selectedCards.filter(function (i) { return i.id !== card.model.card.id; }));
        this.saveState();
    };
    return AppModel;
}());



/***/ }),

/***/ "./src/components/app/app.view.ts":
/*!****************************************!*\
  !*** ./src/components/app/app.view.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppView": () => (/* binding */ AppView)
/* harmony export */ });
var AppView = /** @class */ (function () {
    function AppView() {
    }
    AppView.prototype.getFilters1Template = function (state) {
        return "\n    <h2 class=\"filter-title\">\u0424\u0438\u043B\u044C\u0442\u0440\u044B \u043F\u043E \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u044E</h2>\n    <div class=\"shape\">\u0424\u043E\u0440\u043C\u0430:\n        <button class=\"".concat(state['filter.shape.ball'] ? 'active' : '', "\"  data-filter=\"ball\" data-type=\"shape\"></button>\n        <button class=\"").concat(state['filter.shape.kolokolchik'] ? 'active' : '', "\" data-filter=\"kolokolchik\" data-type=\"shape\"></button>\n        <button class=\"").concat(state['filter.shape.shisha'] ? 'active' : '', "\" data-filter=\"shisha\" data-type=\"shape\"></button>\n        <button class=\"").concat(state['filter.shape.snezinka'] ? 'active' : '', "\"data-filter=\"snezinka\" data-type=\"shape\"></button>\n        <button class=\"").concat(state['filter.shape.figurka'] ? 'active' : '', "\"data-filter=\"figurka\" data-type=\"shape\"></button>\n    </div>\n    <div class=\"color\">\u0426\u0432\u0435\u0442:\n        <button class=\"").concat(state['filter.color.белый'] ? 'active' : '', "\" data-filter=\"\u0431\u0435\u043B\u044B\u0439\" data-type=\"color\"></button>\n        <button  class=\"").concat(state['filter.color.желтый'] ? 'active' : '', "\" data-filter=\"\u0436\u0435\u043B\u0442\u044B\u0439\" data-type=\"color\"></button>\n        <button  class=\"").concat(state['filter.color.красный'] ? 'active' : '', "\" data-filter=\"\u043A\u0440\u0430\u0441\u043D\u044B\u0439\" data-type=\"color\"></button>\n        <button  class=\"").concat(state['filter.color.синий'] ? 'active' : '', "\" data-filter=\"\u0441\u0438\u043D\u0438\u0439\" data-type=\"color\"></button>\n        <button  class=\"").concat(state['filter.color.зелёный'] ? 'active' : '', "\" data-filter=\"\u0437\u0435\u043B\u0451\u043D\u044B\u0439\" data-type=\"color\"></button>\n    </div>\n    <div class=\"size\">\u0420\u0430\u0437\u043C\u0435\u0440:\n        <button class=\"").concat(state['filter.size.большой'] ? 'active' : '', "\" data-filter=\"\u0431\u043E\u043B\u044C\u0448\u043E\u0439\" data-type=\"size\"></button>\n        <button class=\"").concat(state['filter.size.средний'] ? 'active' : '', "\" data-filter=\"\u0441\u0440\u0435\u0434\u043D\u0438\u0439\" data-type=\"size\"></button>\n        <button class=\"").concat(state['filter.size.малый'] ? 'active' : '', "\" data-filter=\"\u043C\u0430\u043B\u044B\u0439\" data-type=\"size\"></button>\n    </div>\n    <div class=\"favorite-container\">\u0422\u043E\u043B\u044C\u043A\u043E \u043B\u044E\u0431\u0438\u043C\u044B\u0435:\n        <div class=\"form-group\"> \n        <input type=\"checkbox\" ").concat(state['filter.favorite'] ? 'checked' : '', "\n            class=\"favorite-input\"\n            id=\"checkbox\" \n            />\n        <label for=\"checkbox\" data-checkbox=\"true\"\n            class=\"favorite-input-label\"></label>\n        </div>\n    </div>\n      ");
    };
    AppView.prototype.getFilters2Template = function (state) {
        return "<div class=\"range\">\n  <h2 class=\"filter-title\">\u0424\u0438\u043B\u044C\u0442\u0440\u044B \u043F\u043E \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D\u0443</h2>\n  <div class=\"count\">\n      <span class=\"control-span\">\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u044D\u043A\u0437\u0435\u043C\u043F\u043B\u044F\u0440\u043E\u0432:</span>\n      <div class=\"count-slider-container\">\n          <div>\u041E\u0442</div>\n            <input id=\"filter-from\" data-filter-from=\"filter-from\" type=\"range\" min=\"0\" max=\"12\" value=".concat(state['filter.from'], ">\n          <div id=\"from-value\">").concat(state['filter.from'] ? state['filter.from'] : '', "</div>\n          <div>\u0414\u043E</div>\n          <input id=\"filter-to\" data-filter-to=\"filter-to\" type=\"range\" min=\"0\" max=\"12\" value=").concat(state['filter.to'], ">\n        <div id=\"to-value\">").concat(state['filter.to'] ? state['filter.to'] : '', "</div>\n\n      </div>\n  </div>\n  <div class=\"year\">\n      <span class=\"control-span\">\u0413\u043E\u0434 \u043F\u0440\u0438\u043E\u0431\u0440\u0435\u0442\u0435\u043D\u0438\u044F:</span>\n      <div class=\"year-slider-container\">\n      <div class=\"slider-output\">\u041E\u0442</div>\n        <input id=\"filter-fromYear\" data-filter-from-Year=\"filter-fromYear\" type=\"range\" min=\"1940\" max=\"2021\" value=").concat(state['filter.fromYear'], ">\n      <div id=\"from-value-Year\">").concat(state['filter.fromYear'] ? state['filter.fromYear'] : '', "</div>\n\n  <div class=\"slider-output\">\u0414\u043E</div>\n  <input id=\"filter-toYear\" data-filter-to-Year=\"filter-toYear\" type=\"range\" min=\"1940\" max=\"2021\" value=").concat(state['filter.toYear'], ">\n  <div id=\"to-value-Year\">").concat(state['filter.toYear'] ? state['filter.toYear'] : '', "</div>\n\n\n      </div>\n  </div>\n</div>");
    };
    AppView.prototype.getFilters3Temlate = function () {
        return "<div class=\"sort\">\n  <h2 class=\"filter-title\">\u0421\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u043A\u0430</h2>\n  <select class=\"sort-select\">\n      <option selected>\u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435</option>\n      <option value=\"sort-name-max\">\u041F\u043E \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u044E \u043E\u0442 \u00AB\u0410\u00BB \u0434\u043E \u00AB\u042F\u00BB</option>\n      <option value=\"sort-name-min\">\u041F\u043E \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u044E \u043E\u0442 \u00AB\u042F\u00BB \u0434\u043E \u00AB\u0410\u00BB</option>\n      <option value=\"sort-year-max\">\u041F\u043E \u0433\u043E\u0434\u0443 \u0438\u0445 \u043F\u0440\u0438\u043E\u0431\u0440\u0435\u0442\u0435\u043D\u0438\u044F \u00AB\u2191\u00BB </option>\n      <option value=\"sort-year-min\">\u041F\u043E \u0433\u043E\u0434\u0443 \u0438\u0445 \u043F\u0440\u0438\u043E\u0431\u0440\u0435\u0442\u0435\u043D\u0438\u044F \u00AB\u2193\u00BB </option>\n\n  </select>\n  <button class=\"reset\">\u0421\u0431\u0440\u043E\u0441 \u0444\u0438\u043B\u044C\u0442\u0440\u043E\u0432</button>\n</div>";
    };
    AppView.prototype.getTreePageTemplate = function () {
        return "<div></div>";
    };
    AppView.prototype.getStartPageTemaplate = function () {
        return "<section id=\"startPage\" class=\"page start-page\">\n                <div class=\"ball ball1\"></div>\n                <div class=\"ball ball2\"></div>\n                <h1 class=\"start-page-title\">\u041D\u043E\u0432\u043E\u0433\u043E\u0434\u043D\u044F\u044F \u0438\u0433\u0440\u0430<span>\u00AB\u041D\u0430\u0440\u044F\u0434\u0438 \u0451\u043B\u043A\u0443\u00BB</span></h1>\n                <button class=\"switch-start-page\" data-page=\"mainPage\">\u041D\u0430\u0447\u0430\u0442\u044C</button>\n            </section>";
    };
    AppView.prototype.getToysPageTemplate = function () {
        return " \n      <section id=\"toysPage\" class=\"page toys-page \">\n            <div class=\"toys-page__filter\">\n              <div class=\"filters filter1-container\">\n                <div class=\"\"></div>\n            </div>\n            <div class=\"filter2-container\"></div>\n            <div class=\"filter3-container\"></div>\n            \n\n     \n\n     \n </div>\n <div class=\"toys-page__cards-block\">\n\n </div>\n</section>";
    };
    return AppView;
}());



/***/ }),

/***/ "./src/components/app/data.ts":
/*!************************************!*\
  !*** ./src/components/app/data.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var data = [
    {
        num: "1",
        name: "Большой шар с рисунком",
        count: "2",
        year: "1960",
        shape: "шар",
        color: "желтый",
        size: "большой",
        favorite: false,
    },
    {
        num: "2",
        name: "Зелёный шар с цветами",
        count: "5",
        year: "2000",
        shape: "шар",
        color: "зелёный",
        size: "большой",
        favorite: false,
    },
    {
        num: "3",
        name: "Красный матовый шар",
        count: "3",
        year: "1990",
        shape: "шар",
        color: "красный",
        size: "большой",
        favorite: false,
    },
    {
        num: "4",
        name: "Сосулька красная",
        count: "2",
        year: "1980",
        shape: "фигурка",
        color: "красный",
        size: "большой",
        favorite: false,
    },
    {
        num: "5",
        name: "Красный виноград",
        count: "4",
        year: "1980",
        shape: "фигурка",
        color: "красный",
        size: "средний",
        favorite: true,
    },
    {
        num: "6",
        name: "Красный шар с рисунком",
        count: "6",
        year: "2010",
        shape: "шар",
        color: "красный",
        size: "большой",
        favorite: false,
    },
    {
        num: "7",
        name: "Молочно-белый шар",
        count: "12",
        year: "1960",
        shape: "шар",
        color: "белый",
        size: "средний",
        favorite: true,
    },
    {
        num: "8",
        name: "Красный шар",
        count: "10",
        year: "2010",
        shape: "шар",
        color: "красный",
        size: "большой",
        favorite: false,
    },
    {
        num: "9",
        name: "Колокольчик старинный",
        count: "2",
        year: "1950",
        shape: "колокольчик",
        color: "белый",
        size: "большой",
        favorite: false,
    },
    {
        num: "10",
        name: "Белый шар ретро",
        count: "7",
        year: "1960",
        shape: "шар",
        color: "белый",
        size: "большой",
        favorite: false,
    },
    {
        num: "11",
        name: "Шишка еловая белая",
        count: "11",
        year: "1960",
        shape: "шишка",
        color: "белый",
        size: "малый",
        favorite: false,
    },
    {
        num: "12",
        name: "Белый шар с цветами",
        count: "5",
        year: "1980",
        shape: "шар",
        color: "белый",
        size: "большой",
        favorite: false,
    },
    {
        num: "13",
        name: "Шар расписной Река",
        count: "3",
        year: "1970",
        shape: "шар",
        color: "синий",
        size: "большой",
        favorite: true,
    },
    {
        num: "14",
        name: "Шар расписной Деревня",
        count: "4",
        year: "1970",
        shape: "шар",
        color: "синий",
        size: "большой",
        favorite: true,
    },
    {
        num: "15",
        name: "Колокольчик расписной",
        count: "3",
        year: "1970",
        shape: "колокольчик",
        color: "синий",
        size: "средний",
        favorite: false,
    },
    {
        num: "16",
        name: "Шишка расписная Пейзаж",
        count: "3",
        year: "1970",
        shape: "шишка",
        color: "синий",
        size: "средний",
        favorite: true,
    },
    {
        num: "17",
        name: "Шишка расписная",
        count: "7",
        year: "1970",
        shape: "шишка",
        color: "красный",
        size: "средний",
        favorite: false,
    },
    {
        num: "18",
        name: "Желтый шар с бантом",
        count: "2",
        year: "2010",
        shape: "шар",
        color: "желтый",
        size: "большой",
        favorite: false,
    },
    {
        num: "19",
        name: "Желтый шар с паетками",
        count: "12",
        year: "1980",
        shape: "шар",
        color: "желтый",
        size: "большой",
        favorite: false,
    },
    {
        num: "20",
        name: "Красный шар с бантом",
        count: "8",
        year: "1950",
        shape: "шар",
        color: "красный",
        size: "средний",
        favorite: true,
    },
    {
        num: "21",
        name: "Красный шар с звёздами",
        count: "4",
        year: "1970",
        shape: "шар",
        color: "красный",
        size: "большой",
        favorite: true,
    },
    {
        num: "22",
        name: "Шишка еловая золотая",
        count: "11",
        year: "1990",
        shape: "шишка",
        color: "желтый",
        size: "малый",
        favorite: false,
    },
    {
        num: "23",
        name: "Колокольчик старинный",
        count: "9",
        year: "1950",
        shape: "колокольчик",
        color: "желтый",
        size: "большой",
        favorite: false,
    },
    {
        num: "24",
        name: "Снежинка изящная",
        count: "1",
        year: "1940",
        shape: "снежинка",
        color: "белый",
        size: "большой",
        favorite: false,
    },
    {
        num: "25",
        name: "Розовый шар с блёстками",
        count: "12",
        year: "2010",
        shape: "шар",
        color: "красный",
        size: "большой",
        favorite: false,
    },
    {
        num: "26",
        name: "Рубиново-золотой шар",
        count: "8",
        year: "1960",
        shape: "шар",
        color: "желтый",
        size: "большой",
        favorite: false,
    },
    {
        num: "27",
        name: "Красный шар с узором",
        count: "4",
        year: "2010",
        shape: "шар",
        color: "красный",
        size: "большой",
        favorite: false,
    },
    {
        num: "28",
        name: "Бордовый шар с узором",
        count: "10",
        year: "2010",
        shape: "шар",
        color: "красный",
        size: "большой",
        favorite: false,
    },
    {
        num: "29",
        name: "Старинный шар с цветами",
        count: "5",
        year: "1950",
        shape: "шар",
        color: "желтый",
        size: "большой",
        favorite: true,
    },
    {
        num: "30",
        name: "Старинный шар с узором",
        count: "8",
        year: "1950",
        shape: "шар",
        color: "желтый",
        size: "большой",
        favorite: true,
    },
    {
        num: "31",
        name: "Красный шар с блёстками",
        count: "8",
        year: "2010",
        shape: "шар",
        color: "красный",
        size: "большой",
        favorite: false,
    },
    {
        num: "32",
        name: "Синий шар Вселенная",
        count: "11",
        year: "1970",
        shape: "шар",
        color: "синий",
        size: "большой",
        favorite: false,
    },
    {
        num: "33",
        name: "Синий шар со снежинкой",
        count: "6",
        year: "2010",
        shape: "шар",
        color: "синий",
        size: "средний",
        favorite: false,
    },
    {
        num: "34",
        name: "Зелёный  шар с узором",
        count: "8",
        year: "2010",
        shape: "шар",
        color: "зелёный",
        size: "большой",
        favorite: false,
    },
    {
        num: "35",
        name: "Фигурка Лис в шарфе",
        count: "8",
        year: "1950",
        shape: "фигурка",
        color: "желтый",
        size: "средний",
        favorite: true,
    },
    {
        num: "36",
        name: "Сиреневый шар Метель",
        count: "1",
        year: "2000",
        shape: "шар",
        color: "синий",
        size: "большой",
        favorite: false,
    },
    {
        num: "37",
        name: "Зелёный  шар Метель",
        count: "6",
        year: "2000",
        shape: "шар",
        color: "зелёный",
        size: "большой",
        favorite: false,
    },
    {
        num: "38",
        name: "Голубой  шар Метель",
        count: "6",
        year: "2000",
        shape: "шар",
        color: "синий",
        size: "большой",
        favorite: false,
    },
    {
        num: "39",
        name: "Красная снежинка",
        count: "6",
        year: "1990",
        shape: "снежинка",
        color: "красный",
        size: "большой",
        favorite: false,
    },
    {
        num: "40",
        name: "Снежинка золотая",
        count: "12",
        year: "2020",
        shape: "снежинка",
        color: "желтый",
        size: "большой",
        favorite: false,
    },
    {
        num: "41",
        name: "Снежинка арктическая",
        count: "11",
        year: "2020",
        shape: "снежинка",
        color: "белый",
        size: "большой",
        favorite: false,
    },
    {
        num: "42",
        name: "Зелёный шар",
        count: "10",
        year: "1980",
        shape: "шар",
        color: "зелёный",
        size: "средний",
        favorite: false,
    },
    {
        num: "43",
        name: "Снежинка двухцветная",
        count: "6",
        year: "1960",
        shape: "снежинка",
        color: "красный",
        size: "большой",
        favorite: false,
    },
    {
        num: "44",
        name: "Фигурка Ангела",
        count: "11",
        year: "1940",
        shape: "фигурка",
        color: "красный",
        size: "средний",
        favorite: true,
    },
    {
        num: "45",
        name: "Снежинка новогодняя",
        count: "1",
        year: "1980",
        shape: "снежинка",
        color: "белый",
        size: "большой",
        favorite: false,
    },
    {
        num: "46",
        name: "Фигурка Мухомор",
        count: "10",
        year: "1950",
        shape: "фигурка",
        color: "красный",
        size: "малый",
        favorite: false,
    },
    {
        num: "47",
        name: "Фигурка Колодец",
        count: "6",
        year: "1950",
        shape: "фигурка",
        color: "красный",
        size: "малый",
        favorite: false,
    },
    {
        num: "48",
        name: "Желтый шар с бантом",
        count: "6",
        year: "1960",
        shape: "шар",
        color: "желтый",
        size: "большой",
        favorite: false,
    },
    {
        num: "49",
        name: "Снежинка с бирюзой",
        count: "4",
        year: "1980",
        shape: "снежинка",
        color: "желтый",
        size: "большой",
        favorite: false,
    },
    {
        num: "50",
        name: "Колокольчик большой",
        count: "3",
        year: "2020",
        shape: "колокольчик",
        color: "красный",
        size: "большой",
        favorite: false,
    },
    {
        num: "51",
        name: "Шишка с изморозью",
        count: "12",
        year: "1970",
        shape: "шишка",
        color: "красный",
        size: "малый",
        favorite: false,
    },
    {
        num: "52",
        name: "Красный шар с надписью",
        count: "12",
        year: "1990",
        shape: "шар",
        color: "красный",
        size: "большой",
        favorite: true,
    },
    {
        num: "53",
        name: "Снежинка серебристая",
        count: "6",
        year: "2020",
        shape: "снежинка",
        color: "белый",
        size: "большой",
        favorite: false,
    },
    {
        num: "54",
        name: "Зелёный шар с рисунком",
        count: "6",
        year: "2010",
        shape: "шар",
        color: "зелёный",
        size: "большой",
        favorite: false,
    },
    {
        num: "55",
        name: "Пряничный домик",
        count: "1",
        year: "1940",
        shape: "фигурка",
        color: "желтый",
        size: "большой",
        favorite: false,
    },
    {
        num: "56",
        name: "Пряничный теремок",
        count: "1",
        year: "1940",
        shape: "фигурка",
        color: "желтый",
        size: "малый",
        favorite: false,
    },
    {
        num: "57",
        name: "Пряничная избушка",
        count: "1",
        year: "1940",
        shape: "фигурка",
        color: "желтый",
        size: "средний",
        favorite: false,
    },
    {
        num: "58",
        name: "Фигурка белого медведя",
        count: "2",
        year: "1980",
        shape: "фигурка",
        color: "белый",
        size: "средний",
        favorite: false,
    },
    {
        num: "59",
        name: "Желтый шар с надписью",
        count: "10",
        year: "1990",
        shape: "шар",
        color: "желтый",
        size: "средний",
        favorite: false,
    },
    {
        num: "60",
        name: "Фигурка Голубь",
        count: "12",
        year: "1940",
        shape: "фигурка",
        color: "белый",
        size: "средний",
        favorite: true,
    },
];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (data);


/***/ }),

/***/ "./src/components/card/card.controller.ts":
/*!************************************************!*\
  !*** ./src/components/card/card.controller.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CardController": () => (/* binding */ CardController)
/* harmony export */ });
var CardController = /** @class */ (function () {
    function CardController(model, view) {
        this.model = model;
        this.view = view;
    }
    CardController.prototype.showPopUp = function () {
        var _this = this;
        if (this.isPopupShowed) {
            return;
        }
        this.isPopupShowed = true;
        var htmlPopUp = this.view.showPopUp();
        var popUp = document.createElement('div');
        popUp.className = 'popUp';
        popUp.innerHTML = htmlPopUp;
        setTimeout(function () {
            var card = document.querySelector("[data-id=\"".concat(_this.model.card.id, "\"]"));
            card.append(popUp);
            setTimeout(function () {
                _this.isPopupShowed = false;
                card.querySelector('.popUp').remove();
            }, 1000);
        });
    };
    return CardController;
}());



/***/ }),

/***/ "./src/components/card/card.model.ts":
/*!*******************************************!*\
  !*** ./src/components/card/card.model.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CardModel": () => (/* binding */ CardModel)
/* harmony export */ });
var CardModel = /** @class */ (function () {
    function CardModel(card) {
        if (!card.id) {
            card.id = Math.random().toString(16).slice(2);
        }
        this.card = card;
    }
    return CardModel;
}());



/***/ }),

/***/ "./src/components/card/card.view.ts":
/*!******************************************!*\
  !*** ./src/components/card/card.view.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CardView": () => (/* binding */ CardView)
/* harmony export */ });
var CardView = /** @class */ (function () {
    function CardView() {
    }
    CardView.prototype.getTemplate = function (card) {
        return "    \n      <div class=\"".concat(card.isSelected ? 'selected' : '', " card ").concat(card.isVisible ? '' : 'hide', " \" data-num=").concat(card.num, " data-id=").concat(card.id, ">\n   \n          <h2 class=\"card-title\">").concat(card.name, "</h2>\n          <img class=\"card-img\" src=\"./assets/toys/").concat(card.num, ".png\" alt=\"toy\">\n          <div class=\"card-description\">\n              <p class=\"count\">\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E: <span>").concat(card.count, "</span></p>\n              <p class=\"year\">\u0413\u043E\u0434 \u043F\u043E\u043A\u0443\u043F\u043A\u0438: <span>").concat(card.year, "</span></p>\n              <p class=\"shape\">\u0424\u043E\u0440\u043C\u0430: <span>").concat(card.shape, "</span></p>\n              <p class=\"color\">\u0426\u0432\u0435\u0442: <span>").concat(card.color, "</span></p>\n              <p class=\"size\">\u0420\u0430\u0437\u043C\u0435\u0440: <span>").concat(card.size, "</span></p>\n              <p class=\"favorite\">\u041B\u044E\u0431\u0438\u043C\u0430\u044F: <span>").concat(card.favorite ? 'да' : 'нет', "</span></p>\n          </div>\n          <div class=\"ribbon\"></div>\n        </div>      \n");
    };
    CardView.prototype.showPopUp = function () {
        return " \n      <div class=\"popUp__content\">\n        <p>\u0418\u0437\u0432\u0438\u043D\u0438\u0442\u0438, \u043C\u043E\u0436\u043D\u043E \u0432\u044B\u0431\u0440\u0430\u0442\u044C \u043C\u0430\u043A\u0441\u0438\u043C\u0443\u043C 20 \u0438\u0433\u0440\u0443\u0448\u0435\u043A !</p>\n    </div>\n   ";
    };
    return CardView;
}());



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
/*!***********************!*\
  !*** ./src/script.ts ***!
  \***********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_app_app_controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/app/app.controller */ "./src/components/app/app.controller.ts");
/* harmony import */ var _components_app_app_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/app/app.model */ "./src/components/app/app.model.ts");
/* harmony import */ var _components_app_app_view__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/app/app.view */ "./src/components/app/app.view.ts");



var app = new _components_app_app_controller__WEBPACK_IMPORTED_MODULE_0__.AppController(new _components_app_app_model__WEBPACK_IMPORTED_MODULE_1__.AppModel(), new _components_app_app_view__WEBPACK_IMPORTED_MODULE_2__.AppView());
app.restorePage();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkRBQTZELDhCQUE4QjtBQUMzRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1RUFBdUUsa0RBQWtEO0FBQ3pIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLElBQUksWUFBWTtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsbUVBQW1FLCtEQUErRDtBQUNsSTtBQUNBO0FBQ0EsbUVBQW1FLCtEQUErRDtBQUNsSTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhFQUE4RSw2QkFBNkI7QUFDM0c7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ3dCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcFNzQjtBQUNyQjtBQUMrQjtBQUNaO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHFEQUFZO0FBQ3BCLDJCQUEyQixpRUFBYyxLQUFLLHVEQUFTLFNBQVMscURBQVE7QUFDeEU7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseURBQXlELHNCQUFzQjtBQUMvRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxpRUFBYyxLQUFLLHVEQUFTLFNBQVMscURBQVE7QUFDaEY7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQywyQ0FBMkM7QUFDckY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0ZBQXNGLHFDQUFxQztBQUMzSDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ21COzs7Ozs7Ozs7Ozs7Ozs7QUMzRHBCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNrQjs7Ozs7Ozs7Ozs7Ozs7O0FDdkJuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsaUVBQWUsSUFBSSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUMxbEJwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQSxDQUFDO0FBQ3lCOzs7Ozs7Ozs7Ozs7Ozs7QUMxQjFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ29COzs7Ozs7Ozs7Ozs7Ozs7QUNUckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ21COzs7Ozs7O1VDWHBCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7OztBQ05nRTtBQUNWO0FBQ0Y7QUFDcEQsY0FBYyx5RUFBYSxLQUFLLCtEQUFRLFFBQVEsNkRBQU87QUFDdkQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jaHJpc3RtYXMtdGFzay8uL3NyYy9jb21wb25lbnRzL2FwcC9hcHAuY29udHJvbGxlci50cyIsIndlYnBhY2s6Ly9jaHJpc3RtYXMtdGFzay8uL3NyYy9jb21wb25lbnRzL2FwcC9hcHAubW9kZWwudHMiLCJ3ZWJwYWNrOi8vY2hyaXN0bWFzLXRhc2svLi9zcmMvY29tcG9uZW50cy9hcHAvYXBwLnZpZXcudHMiLCJ3ZWJwYWNrOi8vY2hyaXN0bWFzLXRhc2svLi9zcmMvY29tcG9uZW50cy9hcHAvZGF0YS50cyIsIndlYnBhY2s6Ly9jaHJpc3RtYXMtdGFzay8uL3NyYy9jb21wb25lbnRzL2NhcmQvY2FyZC5jb250cm9sbGVyLnRzIiwid2VicGFjazovL2NocmlzdG1hcy10YXNrLy4vc3JjL2NvbXBvbmVudHMvY2FyZC9jYXJkLm1vZGVsLnRzIiwid2VicGFjazovL2NocmlzdG1hcy10YXNrLy4vc3JjL2NvbXBvbmVudHMvY2FyZC9jYXJkLnZpZXcudHMiLCJ3ZWJwYWNrOi8vY2hyaXN0bWFzLXRhc2svd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vY2hyaXN0bWFzLXRhc2svd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2NocmlzdG1hcy10YXNrL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vY2hyaXN0bWFzLXRhc2svd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9jaHJpc3RtYXMtdGFzay8uL3NyYy9zY3JpcHQudHMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIEFwcENvbnRyb2xsZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBBcHBDb250cm9sbGVyKG1vZGVsLCB2aWV3KSB7XHJcbiAgICAgICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xyXG4gICAgICAgIHRoaXMudmlldyA9IHZpZXc7XHJcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtYWluJyk7XHJcbiAgICB9XHJcbiAgICBBcHBDb250cm9sbGVyLnByb3RvdHlwZS5yZXN0b3JlUGFnZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLm1vZGVsLnJlc3RvcmVTdGF0ZSgpO1xyXG4gICAgICAgIHZhciBwYWdlID0gdGhpcy5tb2RlbC5zdGF0ZS5jdXJyZW50UGFnZTtcclxuICAgICAgICBpZiAocGFnZSA9PT0gJ3N0YXJ0Jykge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dTdGFydFBhZ2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAocGFnZSA9PT0gJ3RveXMnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1RveXNQYWdlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHBhZ2UgPT09ICd0cmVlJykge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dUcmVlUGFnZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zaG93U3RhcnRQYWdlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIEFwcENvbnRyb2xsZXIucHJvdG90eXBlLnNob3dTdGFydFBhZ2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5jb250YWluZXIuaW5uZXJIVE1MID0gdGhpcy52aWV3LmdldFN0YXJ0UGFnZVRlbWFwbGF0ZSgpO1xyXG4gICAgICAgIHRoaXMuc2V0dXBTdGFydFBhZ2VIZW5kbGVycygpO1xyXG4gICAgICAgIHRoaXMubW9kZWwuc2V0U3RhdGUoJ2N1cnJlbnRQYWdlJywgJ3N0YXJ0Jyk7XHJcbiAgICB9O1xyXG4gICAgQXBwQ29udHJvbGxlci5wcm90b3R5cGUuc2hvd1RveXNQYWdlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMubW9kZWwuc2V0U3RhdGUoJ2N1cnJlbnRQYWdlJywgJ3RveXMnKTtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lci5pbm5lckhUTUwgPSB0aGlzLnZpZXcuZ2V0VG95c1BhZ2VUZW1wbGF0ZSgpO1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5maWx0ZXIxLWNvbnRhaW5lcicpLmlubmVySFRNTCA9IHRoaXMudmlldy5nZXRGaWx0ZXJzMVRlbXBsYXRlKHRoaXMubW9kZWwuc3RhdGUpO1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5maWx0ZXIyLWNvbnRhaW5lcicpLmlubmVySFRNTCA9IHRoaXMudmlldy5nZXRGaWx0ZXJzMlRlbXBsYXRlKHRoaXMubW9kZWwuc3RhdGUpO1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5maWx0ZXIzLWNvbnRhaW5lcicpLmlubmVySFRNTCA9IHRoaXMudmlldy5nZXRGaWx0ZXJzM1RlbWxhdGUoKTtcclxuICAgICAgICB0aGlzLnNldHVwVG95c1BhZ2VIYW5kbGVycygpO1xyXG4gICAgICAgIGlmICh0aGlzLm1vZGVsLnN0YXRlLnNvcnQpIHtcclxuICAgICAgICAgICAgdGhpcy5hcHBseVNvcnQodGhpcy5tb2RlbC5zdGF0ZS5zb3J0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yZW5kZXJDYXJkcygpO1xyXG4gICAgfTtcclxuICAgIEFwcENvbnRyb2xsZXIucHJvdG90eXBlLnNob3dUcmVlUGFnZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLm1vZGVsLnNldFN0YXRlKCdjdXJyZW50UGFnZScsICd0cmVlJyk7XHJcbiAgICB9O1xyXG4gICAgQXBwQ29udHJvbGxlci5wcm90b3R5cGUuc2V0dXBTdGFydFBhZ2VIZW5kbGVycyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHZhciBidG5TdGFydFBhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3dpdGNoLXN0YXJ0LXBhZ2UnKTtcclxuICAgICAgICBidG5TdGFydFBhZ2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7IHJldHVybiBfdGhpcy5zaG93VG95c1BhZ2UoKTsgfSk7XHJcbiAgICB9O1xyXG4gICAgQXBwQ29udHJvbGxlci5wcm90b3R5cGUuc2V0dXBUb3lzUGFnZUhhbmRsZXJzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy51cGRhdGVDb3VudGVyKCk7XHJcbiAgICAgICAgdmFyIGFsbEZpbHRlcnNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdG95c1BhZ2UnKTtcclxuICAgICAgICB2YXIgc2VsZWN0U29ydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zb3J0LXNlbGVjdCcpO1xyXG4gICAgICAgIGFsbEZpbHRlcnNDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3Jlc2V0JykpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLm1vZGVsLnJlc2V0U3RhdGUoKTtcclxuICAgICAgICAgICAgICAgIF90aGlzLm1vZGVsLnNhdmVTdGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0U29ydC5zZWxlY3RlZEluZGV4ID0gMDtcclxuICAgICAgICAgICAgICAgIF90aGlzLnVwZGF0ZUNvdW50ZXIoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgdHlwZSA9IGV2ZW50LnRhcmdldC5kYXRhc2V0LnR5cGU7XHJcbiAgICAgICAgICAgIHZhciBpc0NoZWNrYm94ID0gZXZlbnQudGFyZ2V0LmRhdGFzZXQuY2hlY2tib3g7XHJcbiAgICAgICAgICAgIHZhciBpc0ZpbHRlckZyb20gPSBldmVudC50YXJnZXQuZGF0YXNldC5maWx0ZXJGcm9tO1xyXG4gICAgICAgICAgICB2YXIgaXNGaWx0ZXJUbyA9IGV2ZW50LnRhcmdldC5kYXRhc2V0LmZpbHRlclRvO1xyXG4gICAgICAgICAgICB2YXIgaXNGaWx0ZXJGcm9tWWVhciA9IGV2ZW50LnRhcmdldC5kYXRhc2V0LmZpbHRlckZyb21ZZWFyO1xyXG4gICAgICAgICAgICB2YXIgaXNGaWx0ZXJUb1llYXIgPSBldmVudC50YXJnZXQuZGF0YXNldC5maWx0ZXJUb1llYXI7XHJcbiAgICAgICAgICAgIHZhciBjYXJkQ2xpY2sgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnLmNhcmQnKTtcclxuICAgICAgICAgICAgaWYgKHR5cGUpIHtcclxuICAgICAgICAgICAgICAgIHZhciBjdXJyZW50U3RhdGUgPSBldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIF90aGlzLm1vZGVsLnNldFN0YXRlKCdmaWx0ZXIuJyArIHR5cGUgKyAnLicgKyBldmVudC50YXJnZXQuZGF0YXNldC5maWx0ZXIsICFjdXJyZW50U3RhdGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGlzQ2hlY2tib3gpIHtcclxuICAgICAgICAgICAgICAgIHZhciBmaWx0ZXJDaGVrYm94RmF2b3JpdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmF2b3JpdGUtaW5wdXQnKTtcclxuICAgICAgICAgICAgICAgIF90aGlzLm1vZGVsLnNldFN0YXRlKCdmaWx0ZXIuZmF2b3JpdGUnLCAhZmlsdGVyQ2hla2JveEZhdm9yaXRlLmNoZWNrZWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGlzRmlsdGVyRnJvbSkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMubW9kZWwuc2V0U3RhdGUoJ2ZpbHRlci5mcm9tJywgZXZlbnQudGFyZ2V0LnZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChpc0ZpbHRlclRvKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5tb2RlbC5zZXRTdGF0ZSgnZmlsdGVyLnRvJywgZXZlbnQudGFyZ2V0LnZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChpc0ZpbHRlckZyb21ZZWFyKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5tb2RlbC5zZXRTdGF0ZSgnZmlsdGVyLmZyb21ZZWFyJywgZXZlbnQudGFyZ2V0LnZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChpc0ZpbHRlclRvWWVhcikge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMubW9kZWwuc2V0U3RhdGUoJ2ZpbHRlci50b1llYXInLCBldmVudC50YXJnZXQudmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGNhcmRDbGljaykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGlzU2VsZWN0ZWQgPSBjYXJkQ2xpY2suY2xhc3NMaXN0LmNvbnRhaW5zKCdzZWxlY3RlZCcpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHRhcmdldENhcmQgPSBfdGhpcy5tb2RlbC5jYXJkcy5maW5kKGZ1bmN0aW9uIChjKSB7IHJldHVybiBjLm1vZGVsLmNhcmQuaWQgPT09IGNhcmRDbGljay5kYXRhc2V0LmlkOyB9KTtcclxuICAgICAgICAgICAgICAgIHZhciBzZWxlY3RlZENhcmRzTGVuZ3RoID0gSlNPTi5wYXJzZShfdGhpcy5tb2RlbC5zdGF0ZVsnc2VsZWN0ZWRDYXJkcyddKS5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWlzU2VsZWN0ZWQgJiYgc2VsZWN0ZWRDYXJkc0xlbmd0aCA9PT0gMjApIHtcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRDYXJkLnNob3dQb3BVcCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0Q2FyZC5tb2RlbC5jYXJkLmlzU2VsZWN0ZWQgPSAhaXNTZWxlY3RlZDtcclxuICAgICAgICAgICAgICAgICAgICBpc1NlbGVjdGVkID8gX3RoaXMubW9kZWwucmVtb3ZlQ2FyZEZyb21TZWxlY3RlZCh0YXJnZXRDYXJkKSA6IF90aGlzLm1vZGVsLmFkZENhcmRUb1NlbGVjdGVkKHRhcmdldENhcmQpO1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnVwZGF0ZUNvdW50ZXIoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBfdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignLmZpbHRlcjEtY29udGFpbmVyJykuaW5uZXJIVE1MID0gX3RoaXMudmlldy5nZXRGaWx0ZXJzMVRlbXBsYXRlKF90aGlzLm1vZGVsLnN0YXRlKTtcclxuICAgICAgICAgICAgX3RoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5maWx0ZXIyLWNvbnRhaW5lcicpLmlubmVySFRNTCA9IF90aGlzLnZpZXcuZ2V0RmlsdGVyczJUZW1wbGF0ZShfdGhpcy5tb2RlbC5zdGF0ZSk7XHJcbiAgICAgICAgICAgIF90aGlzLnNldHVwVG95c1BhZ2VIYW5kbGVycygpO1xyXG4gICAgICAgICAgICBfdGhpcy5yZW5kZXJDYXJkcygpO1xyXG4gICAgICAgIH0sIHsgb25jZTogdHJ1ZSB9KTtcclxuICAgICAgICBzZWxlY3RTb3J0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBldmVudC50YXJnZXQudmFsdWU7XHJcbiAgICAgICAgICAgIF90aGlzLmFwcGx5U29ydCh2YWx1ZSk7XHJcbiAgICAgICAgICAgIF90aGlzLm1vZGVsLnNldFN0YXRlKCdzb3J0JywgdmFsdWUpO1xyXG4gICAgICAgICAgICBfdGhpcy5yZW5kZXJDYXJkcygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIEFwcENvbnRyb2xsZXIucHJvdG90eXBlLmFwcGx5U29ydCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgIHZhciBzZWxlY3RTb3J0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNvcnQtc2VsZWN0Jyk7XHJcbiAgICAgICAgc2VsZWN0U29ydC52YWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIGlmICh2YWx1ZSA9PT0gJ3NvcnQtbmFtZS1tYXgnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc29ydENhcmROYW1lTWF4KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHZhbHVlID09PSAnc29ydC1uYW1lLW1pbicpIHtcclxuICAgICAgICAgICAgdGhpcy5zb3J0Q2FyZE5hbWVNaW4oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodmFsdWUgPT09ICdzb3J0LXllYXItbWluJykge1xyXG4gICAgICAgICAgICB0aGlzLnNvcnRDYXJkWWVhck1pbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh2YWx1ZSA9PT0gJ3NvcnQteWVhci1tYXgnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc29ydENhcmRZZWFyTWF4KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIEFwcENvbnRyb2xsZXIucHJvdG90eXBlLnNvcnRDYXJkTmFtZU1heCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLm1vZGVsLmNhcmRzID0gdGhpcy5tb2RlbC5jYXJkcy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XHJcbiAgICAgICAgICAgIHZhciBuYW1lQSA9IGEubW9kZWwuY2FyZC5uYW1lLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgIHZhciBuYW1lQiA9IGIubW9kZWwuY2FyZC5uYW1lLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgIGlmIChuYW1lQSA8IG5hbWVCKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gLTE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG5hbWVBID4gbmFtZUIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIEFwcENvbnRyb2xsZXIucHJvdG90eXBlLnNvcnRDYXJkTmFtZU1pbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLm1vZGVsLmNhcmRzID0gdGhpcy5tb2RlbC5jYXJkcy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XHJcbiAgICAgICAgICAgIHZhciBuYW1lQSA9IGEubW9kZWwuY2FyZC5uYW1lLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgIHZhciBuYW1lQiA9IGIubW9kZWwuY2FyZC5uYW1lLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgIGlmIChuYW1lQSA+IG5hbWVCKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gLTE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG5hbWVBIDwgbmFtZUIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIEFwcENvbnRyb2xsZXIucHJvdG90eXBlLnNvcnRDYXJkWWVhck1pbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLm1vZGVsLmNhcmRzID0gdGhpcy5tb2RlbC5jYXJkcy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7IHJldHVybiBOdW1iZXIoYi5tb2RlbC5jYXJkLnllYXIpIC0gTnVtYmVyKGEubW9kZWwuY2FyZC55ZWFyKTsgfSk7XHJcbiAgICB9O1xyXG4gICAgQXBwQ29udHJvbGxlci5wcm90b3R5cGUuc29ydENhcmRZZWFyTWF4ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMubW9kZWwuY2FyZHMgPSB0aGlzLm1vZGVsLmNhcmRzLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIE51bWJlcihhLm1vZGVsLmNhcmQueWVhcikgLSBOdW1iZXIoYi5tb2RlbC5jYXJkLnllYXIpOyB9KTtcclxuICAgIH07XHJcbiAgICBBcHBDb250cm9sbGVyLnByb3RvdHlwZS5yZW5kZXJDYXJkcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHZhciBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG95cy1wYWdlX19jYXJkcy1ibG9jaycpO1xyXG4gICAgICAgIHZhciBzdGF0ZUtleXMgPSBPYmplY3Qua2V5cyh0aGlzLm1vZGVsLnN0YXRlKS5maWx0ZXIoZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gL15maWx0ZXIvLnRlc3Qoa2V5KTsgfSk7XHJcbiAgICAgICAgdmFyIGlzQWxsZmlsdGVyc1Vuc2VsZWN0ZWQgPSBzdGF0ZUtleXMuZXZlcnkoZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgICAgICByZXR1cm4gIV90aGlzLm1vZGVsLnN0YXRlW2tleV07XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdmFyIGNhcmRzVGVtcGxhdGUgPSAnJztcclxuICAgICAgICB0aGlzLm1vZGVsLmNhcmRzLmZvckVhY2goZnVuY3Rpb24gKGkpIHtcclxuICAgICAgICAgICAgdmFyIGNhcmQgPSBpLm1vZGVsLmNhcmQ7XHJcbiAgICAgICAgICAgIGNhcmQuaXNWaXNpYmxlID0gaXNBbGxmaWx0ZXJzVW5zZWxlY3RlZCB8fCBfdGhpcy5pc0NhcmRWaXNpYmxlKGNhcmQpO1xyXG4gICAgICAgICAgICBjYXJkc1RlbXBsYXRlICs9IGkudmlldy5nZXRUZW1wbGF0ZShjYXJkKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gY2FyZHNUZW1wbGF0ZTtcclxuICAgIH07XHJcbiAgICBBcHBDb250cm9sbGVyLnByb3RvdHlwZS5pc0NhcmRWaXNpYmxlID0gZnVuY3Rpb24gKGNhcmQpIHtcclxuICAgICAgICB2YXIgbWF0Y2hXaXRoU2hhcGUgPSB0aGlzLm1hdGNoV2l0aFNoYXBlRmlsdGVyKGNhcmQpO1xyXG4gICAgICAgIHZhciBtYXRjaFdpdGhTaXplID0gdGhpcy5tYXRjaFdpdGhTaXplKGNhcmQpO1xyXG4gICAgICAgIHZhciBtYXRjaFdoaXNDb2xvciA9IHRoaXMubWF0Y2hXaXRoQ29sb3IoY2FyZCk7XHJcbiAgICAgICAgdmFyIG1hdGNoV2l0aEZhdm9yaXRlID0gdGhpcy5tYXRjaFdpdGhGYXZvcml0ZShjYXJkKTtcclxuICAgICAgICB2YXIgbWF0Y2hXaXRoRnJvbSA9IHRoaXMubWF0Y2hXaXRoRnJvbShjYXJkKTtcclxuICAgICAgICB2YXIgbWF0Y2hXaXRoVG8gPSB0aGlzLm1hdGNoV2l0aFRvKGNhcmQpO1xyXG4gICAgICAgIHZhciBtYXRjaFdpdGhGcm9tWWVhciA9IHRoaXMubWF0Y2hXaXRoRnJvbVllYXIoY2FyZCk7XHJcbiAgICAgICAgdmFyIG1hdGNoV2l0aFRvWWVhciA9IHRoaXMubWF0Y2hXaXRoVG9ZZWFyKGNhcmQpO1xyXG4gICAgICAgIHJldHVybiAobWF0Y2hXaXRoU2hhcGUgJiZcclxuICAgICAgICAgICAgbWF0Y2hXaXRoU2l6ZSAmJlxyXG4gICAgICAgICAgICBtYXRjaFdoaXNDb2xvciAmJlxyXG4gICAgICAgICAgICBtYXRjaFdpdGhGYXZvcml0ZSAmJlxyXG4gICAgICAgICAgICBtYXRjaFdpdGhGcm9tICYmXHJcbiAgICAgICAgICAgIG1hdGNoV2l0aFRvICYmXHJcbiAgICAgICAgICAgIG1hdGNoV2l0aEZyb21ZZWFyICYmXHJcbiAgICAgICAgICAgIG1hdGNoV2l0aFRvWWVhcik7XHJcbiAgICB9O1xyXG4gICAgQXBwQ29udHJvbGxlci5wcm90b3R5cGUubWF0Y2hXaXRoRnJvbVllYXIgPSBmdW5jdGlvbiAoY2FyZCkge1xyXG4gICAgICAgIGlmICghdGhpcy5tb2RlbC5zdGF0ZVsnZmlsdGVyLmZyb21ZZWFyJ10pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBOdW1iZXIoY2FyZC55ZWFyKSA+PSBOdW1iZXIodGhpcy5tb2RlbC5zdGF0ZVsnZmlsdGVyLmZyb21ZZWFyJ10pO1xyXG4gICAgfTtcclxuICAgIEFwcENvbnRyb2xsZXIucHJvdG90eXBlLm1hdGNoV2l0aFRvWWVhciA9IGZ1bmN0aW9uIChjYXJkKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLm1vZGVsLnN0YXRlWydmaWx0ZXIudG9ZZWFyJ10pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBOdW1iZXIoY2FyZC55ZWFyKSA8PSBOdW1iZXIodGhpcy5tb2RlbC5zdGF0ZVsnZmlsdGVyLnRvWWVhciddKTtcclxuICAgIH07XHJcbiAgICBBcHBDb250cm9sbGVyLnByb3RvdHlwZS5tYXRjaFdpdGhGcm9tID0gZnVuY3Rpb24gKGNhcmQpIHtcclxuICAgICAgICBpZiAoIXRoaXMubW9kZWwuc3RhdGVbJ2ZpbHRlci5mcm9tJ10pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBOdW1iZXIoY2FyZC5jb3VudCkgPj0gTnVtYmVyKHRoaXMubW9kZWwuc3RhdGVbJ2ZpbHRlci5mcm9tJ10pO1xyXG4gICAgfTtcclxuICAgIEFwcENvbnRyb2xsZXIucHJvdG90eXBlLm1hdGNoV2l0aFRvID0gZnVuY3Rpb24gKGNhcmQpIHtcclxuICAgICAgICBpZiAoIXRoaXMubW9kZWwuc3RhdGVbJ2ZpbHRlci50byddKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gTnVtYmVyKGNhcmQuY291bnQpIDw9IE51bWJlcih0aGlzLm1vZGVsLnN0YXRlWydmaWx0ZXIudG8nXSk7XHJcbiAgICB9O1xyXG4gICAgQXBwQ29udHJvbGxlci5wcm90b3R5cGUubWF0Y2hXaXRoU2hhcGVGaWx0ZXIgPSBmdW5jdGlvbiAoY2FyZCkge1xyXG4gICAgICAgIGlmICghdGhpcy5tb2RlbC5zdGF0ZVsnZmlsdGVyLnNoYXBlLmJhbGwnXSAmJlxyXG4gICAgICAgICAgICAhdGhpcy5tb2RlbC5zdGF0ZVsnZmlsdGVyLnNoYXBlLnNoaXNoYSddICYmXHJcbiAgICAgICAgICAgICF0aGlzLm1vZGVsLnN0YXRlWydmaWx0ZXIuc2hhcGUuZmlndXJrYSddICYmXHJcbiAgICAgICAgICAgICF0aGlzLm1vZGVsLnN0YXRlWydmaWx0ZXIuc2hhcGUuc25lemlua2EnXSAmJlxyXG4gICAgICAgICAgICAhdGhpcy5tb2RlbC5zdGF0ZVsnZmlsdGVyLnNoYXBlLmtvbG9rb2xjaGlrJ10pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN3aXRjaCAoY2FyZC5zaGFwZSkge1xyXG4gICAgICAgICAgICBjYXNlICfRiNCw0YAnOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICEhdGhpcy5tb2RlbC5zdGF0ZVsnZmlsdGVyLnNoYXBlLmJhbGwnXTtcclxuICAgICAgICAgICAgY2FzZSAn0YjQuNGI0LrQsCc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gISF0aGlzLm1vZGVsLnN0YXRlWydmaWx0ZXIuc2hhcGUuc2hpc2hhJ107XHJcbiAgICAgICAgICAgIGNhc2UgJ9GE0LjQs9GD0YDQutCwJzpcclxuICAgICAgICAgICAgICAgIHJldHVybiAhIXRoaXMubW9kZWwuc3RhdGVbJ2ZpbHRlci5zaGFwZS5maWd1cmthJ107XHJcbiAgICAgICAgICAgIGNhc2UgJ9GB0L3QtdC20LjQvdC60LAnOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICEhdGhpcy5tb2RlbC5zdGF0ZVsnZmlsdGVyLnNoYXBlLnNuZXppbmthJ107XHJcbiAgICAgICAgICAgIGNhc2UgJ9C60L7Qu9C+0LrQvtC70YzRh9C40LonOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICEhdGhpcy5tb2RlbC5zdGF0ZVsnZmlsdGVyLnNoYXBlLmtvbG9rb2xjaGlrJ107XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgQXBwQ29udHJvbGxlci5wcm90b3R5cGUubWF0Y2hXaXRoU2l6ZSA9IGZ1bmN0aW9uIChjYXJkKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLm1vZGVsLnN0YXRlWydmaWx0ZXIuc2l6ZS7QsdC+0LvRjNGI0L7QuSddICYmXHJcbiAgICAgICAgICAgICF0aGlzLm1vZGVsLnN0YXRlWydmaWx0ZXIuc2l6ZS7RgdGA0LXQtNC90LjQuSddICYmXHJcbiAgICAgICAgICAgICF0aGlzLm1vZGVsLnN0YXRlWydmaWx0ZXIuc2l6ZS7QvNCw0LvRi9C5J10pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN3aXRjaCAoY2FyZC5zaXplKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ9Cx0L7Qu9GM0YjQvtC5JzpcclxuICAgICAgICAgICAgICAgIHJldHVybiAhIXRoaXMubW9kZWwuc3RhdGVbJ2ZpbHRlci5zaXplLtCx0L7Qu9GM0YjQvtC5J107XHJcbiAgICAgICAgICAgIGNhc2UgJ9GB0YDQtdC00L3QuNC5JzpcclxuICAgICAgICAgICAgICAgIHJldHVybiAhIXRoaXMubW9kZWwuc3RhdGVbJ2ZpbHRlci5zaXplLtGB0YDQtdC00L3QuNC5J107XHJcbiAgICAgICAgICAgIGNhc2UgJ9C80LDQu9GL0LknOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICEhdGhpcy5tb2RlbC5zdGF0ZVsnZmlsdGVyLnNpemUu0LzQsNC70YvQuSddO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIEFwcENvbnRyb2xsZXIucHJvdG90eXBlLm1hdGNoV2l0aENvbG9yID0gZnVuY3Rpb24gKGNhcmQpIHtcclxuICAgICAgICBpZiAoIXRoaXMubW9kZWwuc3RhdGVbJ2ZpbHRlci5jb2xvci7QsdC10LvRi9C5J10gJiZcclxuICAgICAgICAgICAgIXRoaXMubW9kZWwuc3RhdGVbJ2ZpbHRlci5jb2xvci7QttC10LvRgtGL0LknXSAmJlxyXG4gICAgICAgICAgICAhdGhpcy5tb2RlbC5zdGF0ZVsnZmlsdGVyLmNvbG9yLtC60YDQsNGB0L3Ri9C5J10gJiZcclxuICAgICAgICAgICAgIXRoaXMubW9kZWwuc3RhdGVbJ2ZpbHRlci5jb2xvci7RgdC40L3QuNC5J10gJiZcclxuICAgICAgICAgICAgIXRoaXMubW9kZWwuc3RhdGVbJ2ZpbHRlci5jb2xvci7Qt9C10LvRkdC90YvQuSddKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzd2l0Y2ggKGNhcmQuY29sb3IpIHtcclxuICAgICAgICAgICAgY2FzZSAn0LHQtdC70YvQuSc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gISF0aGlzLm1vZGVsLnN0YXRlWydmaWx0ZXIuY29sb3Iu0LHQtdC70YvQuSddO1xyXG4gICAgICAgICAgICBjYXNlICfQttC10LvRgtGL0LknOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICEhdGhpcy5tb2RlbC5zdGF0ZVsnZmlsdGVyLmNvbG9yLtC20LXQu9GC0YvQuSddO1xyXG4gICAgICAgICAgICBjYXNlICfQutGA0LDRgdC90YvQuSc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gISF0aGlzLm1vZGVsLnN0YXRlWydmaWx0ZXIuY29sb3Iu0LrRgNCw0YHQvdGL0LknXTtcclxuICAgICAgICAgICAgY2FzZSAn0YHQuNC90LjQuSc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gISF0aGlzLm1vZGVsLnN0YXRlWydmaWx0ZXIuY29sb3Iu0YHQuNC90LjQuSddO1xyXG4gICAgICAgICAgICBjYXNlICfQt9C10LvRkdC90YvQuSc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gISF0aGlzLm1vZGVsLnN0YXRlWydmaWx0ZXIuY29sb3Iu0LfQtdC70ZHQvdGL0LknXTtcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBBcHBDb250cm9sbGVyLnByb3RvdHlwZS5tYXRjaFdpdGhGYXZvcml0ZSA9IGZ1bmN0aW9uIChjYXJkKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLm1vZGVsLnN0YXRlWydmaWx0ZXIuZmF2b3JpdGUnXSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNhcmQuZmF2b3JpdGU7XHJcbiAgICB9O1xyXG4gICAgQXBwQ29udHJvbGxlci5wcm90b3R5cGUudXBkYXRlQ291bnRlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgY291bnQgPSBKU09OLnBhcnNlKHRoaXMubW9kZWwuc3RhdGUuc2VsZWN0ZWRDYXJkcyk7XHJcbiAgICAgICAgdmFyIHNlbGVjdFRveXNTcGFuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlbGVjdFRveXMtc3BhbicpO1xyXG4gICAgICAgIHNlbGVjdFRveXNTcGFuLmlubmVySFRNTCA9IFwiXCIuY29uY2F0KGNvdW50Lmxlbmd0aCk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIEFwcENvbnRyb2xsZXI7XHJcbn0oKSk7XHJcbmV4cG9ydCB7IEFwcENvbnRyb2xsZXIgfTtcclxuIiwiaW1wb3J0IHsgQ2FyZE1vZGVsIH0gZnJvbSAnLi4vY2FyZC9jYXJkLm1vZGVsJztcclxuaW1wb3J0IGRhdGEgZnJvbSAnLi9kYXRhJztcclxuaW1wb3J0IHsgQ2FyZENvbnRyb2xsZXIgfSBmcm9tICcuLi9jYXJkL2NhcmQuY29udHJvbGxlcic7XHJcbmltcG9ydCB7IENhcmRWaWV3IH0gZnJvbSAnLi4vY2FyZC9jYXJkLnZpZXcnO1xyXG52YXIgQXBwTW9kZWwgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBBcHBNb2RlbCgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIHNlbGVjdGVkQ2FyZHM6ICdbXScsXHJcbiAgICAgICAgICAgIGNhcmRzOiBbXVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5jYXJkcyA9IFtdO1xyXG4gICAgICAgIGRhdGEuZm9yRWFjaChmdW5jdGlvbiAoaSkge1xyXG4gICAgICAgICAgICB2YXIgY2FyZCA9IG5ldyBDYXJkQ29udHJvbGxlcihuZXcgQ2FyZE1vZGVsKGkpLCBuZXcgQ2FyZFZpZXcoKSk7XHJcbiAgICAgICAgICAgIF90aGlzLmNhcmRzLnB1c2goY2FyZCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBBcHBNb2RlbC5wcm90b3R5cGUuc2V0U3RhdGUgPSBmdW5jdGlvbiAoa2V5LCBuZXdWYWx1ZSkge1xyXG4gICAgICAgIHRoaXMuc3RhdGVba2V5XSA9IG5ld1ZhbHVlO1xyXG4gICAgICAgIHRoaXMuc2F2ZVN0YXRlKCk7XHJcbiAgICB9O1xyXG4gICAgQXBwTW9kZWwucHJvdG90eXBlLnNhdmVTdGF0ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLnN0YXRlLmNhcmRzID0gdGhpcy5jYXJkcy5tYXAoZnVuY3Rpb24gKGkpIHsgcmV0dXJuIGkubW9kZWwuY2FyZDsgfSk7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3N0YXRlJywgSlNPTi5zdHJpbmdpZnkodGhpcy5zdGF0ZSkpO1xyXG4gICAgfTtcclxuICAgIEFwcE1vZGVsLnByb3RvdHlwZS5yZXN0b3JlU3RhdGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB2YXIgc3RhdGUgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzdGF0ZScpKTtcclxuICAgICAgICBpZiAoc3RhdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xyXG4gICAgICAgICAgICBpZiAoc3RhdGUuY2FyZHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhcmRzID0gW107XHJcbiAgICAgICAgICAgICAgICBzdGF0ZS5jYXJkcy5mb3JFYWNoKGZ1bmN0aW9uIChpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNhcmQgPSBuZXcgQ2FyZENvbnRyb2xsZXIobmV3IENhcmRNb2RlbChpKSwgbmV3IENhcmRWaWV3KCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmNhcmRzLnB1c2goY2FyZCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBBcHBNb2RlbC5wcm90b3R5cGUucmVzZXRTdGF0ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBzZWxlY3RlZENhcmRzOiAnW10nLFxyXG4gICAgICAgICAgICBjYXJkczogW11cclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuY2FyZHMuZm9yRWFjaChmdW5jdGlvbiAoaSkgeyByZXR1cm4gKGkubW9kZWwuY2FyZC5pc1NlbGVjdGVkID0gZmFsc2UpOyB9KTtcclxuICAgIH07XHJcbiAgICBBcHBNb2RlbC5wcm90b3R5cGUuYWRkQ2FyZFRvU2VsZWN0ZWQgPSBmdW5jdGlvbiAoY2FyZCkge1xyXG4gICAgICAgIHZhciBzZWxlY3RlZENhcmRzID0gSlNPTi5wYXJzZSh0aGlzLnN0YXRlLnNlbGVjdGVkQ2FyZHMpO1xyXG4gICAgICAgIHNlbGVjdGVkQ2FyZHMucHVzaChjYXJkLm1vZGVsLmNhcmQpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUuc2VsZWN0ZWRDYXJkcyA9IEpTT04uc3RyaW5naWZ5KHNlbGVjdGVkQ2FyZHMpO1xyXG4gICAgICAgIHRoaXMuc2F2ZVN0YXRlKCk7XHJcbiAgICB9O1xyXG4gICAgQXBwTW9kZWwucHJvdG90eXBlLnJlbW92ZUNhcmRGcm9tU2VsZWN0ZWQgPSBmdW5jdGlvbiAoY2FyZCkge1xyXG4gICAgICAgIHZhciBzZWxlY3RlZENhcmRzID0gSlNPTi5wYXJzZSh0aGlzLnN0YXRlLnNlbGVjdGVkQ2FyZHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUuc2VsZWN0ZWRDYXJkcyA9IEpTT04uc3RyaW5naWZ5KHNlbGVjdGVkQ2FyZHMuZmlsdGVyKGZ1bmN0aW9uIChpKSB7IHJldHVybiBpLmlkICE9PSBjYXJkLm1vZGVsLmNhcmQuaWQ7IH0pKTtcclxuICAgICAgICB0aGlzLnNhdmVTdGF0ZSgpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBBcHBNb2RlbDtcclxufSgpKTtcclxuZXhwb3J0IHsgQXBwTW9kZWwgfTtcclxuIiwidmFyIEFwcFZpZXcgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBBcHBWaWV3KCkge1xyXG4gICAgfVxyXG4gICAgQXBwVmlldy5wcm90b3R5cGUuZ2V0RmlsdGVyczFUZW1wbGF0ZSA9IGZ1bmN0aW9uIChzdGF0ZSkge1xyXG4gICAgICAgIHJldHVybiBcIlxcbiAgICA8aDIgY2xhc3M9XFxcImZpbHRlci10aXRsZVxcXCI+XFx1MDQyNFxcdTA0MzhcXHUwNDNCXFx1MDQ0Q1xcdTA0NDJcXHUwNDQwXFx1MDQ0QiBcXHUwNDNGXFx1MDQzRSBcXHUwNDM3XFx1MDQzRFxcdTA0MzBcXHUwNDQ3XFx1MDQzNVxcdTA0M0RcXHUwNDM4XFx1MDQ0RTwvaDI+XFxuICAgIDxkaXYgY2xhc3M9XFxcInNoYXBlXFxcIj5cXHUwNDI0XFx1MDQzRVxcdTA0NDBcXHUwNDNDXFx1MDQzMDpcXG4gICAgICAgIDxidXR0b24gY2xhc3M9XFxcIlwiLmNvbmNhdChzdGF0ZVsnZmlsdGVyLnNoYXBlLmJhbGwnXSA/ICdhY3RpdmUnIDogJycsIFwiXFxcIiAgZGF0YS1maWx0ZXI9XFxcImJhbGxcXFwiIGRhdGEtdHlwZT1cXFwic2hhcGVcXFwiPjwvYnV0dG9uPlxcbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cXFwiXCIpLmNvbmNhdChzdGF0ZVsnZmlsdGVyLnNoYXBlLmtvbG9rb2xjaGlrJ10gPyAnYWN0aXZlJyA6ICcnLCBcIlxcXCIgZGF0YS1maWx0ZXI9XFxcImtvbG9rb2xjaGlrXFxcIiBkYXRhLXR5cGU9XFxcInNoYXBlXFxcIj48L2J1dHRvbj5cXG4gICAgICAgIDxidXR0b24gY2xhc3M9XFxcIlwiKS5jb25jYXQoc3RhdGVbJ2ZpbHRlci5zaGFwZS5zaGlzaGEnXSA/ICdhY3RpdmUnIDogJycsIFwiXFxcIiBkYXRhLWZpbHRlcj1cXFwic2hpc2hhXFxcIiBkYXRhLXR5cGU9XFxcInNoYXBlXFxcIj48L2J1dHRvbj5cXG4gICAgICAgIDxidXR0b24gY2xhc3M9XFxcIlwiKS5jb25jYXQoc3RhdGVbJ2ZpbHRlci5zaGFwZS5zbmV6aW5rYSddID8gJ2FjdGl2ZScgOiAnJywgXCJcXFwiZGF0YS1maWx0ZXI9XFxcInNuZXppbmthXFxcIiBkYXRhLXR5cGU9XFxcInNoYXBlXFxcIj48L2J1dHRvbj5cXG4gICAgICAgIDxidXR0b24gY2xhc3M9XFxcIlwiKS5jb25jYXQoc3RhdGVbJ2ZpbHRlci5zaGFwZS5maWd1cmthJ10gPyAnYWN0aXZlJyA6ICcnLCBcIlxcXCJkYXRhLWZpbHRlcj1cXFwiZmlndXJrYVxcXCIgZGF0YS10eXBlPVxcXCJzaGFwZVxcXCI+PC9idXR0b24+XFxuICAgIDwvZGl2PlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJjb2xvclxcXCI+XFx1MDQyNlxcdTA0MzJcXHUwNDM1XFx1MDQ0MjpcXG4gICAgICAgIDxidXR0b24gY2xhc3M9XFxcIlwiKS5jb25jYXQoc3RhdGVbJ2ZpbHRlci5jb2xvci7QsdC10LvRi9C5J10gPyAnYWN0aXZlJyA6ICcnLCBcIlxcXCIgZGF0YS1maWx0ZXI9XFxcIlxcdTA0MzFcXHUwNDM1XFx1MDQzQlxcdTA0NEJcXHUwNDM5XFxcIiBkYXRhLXR5cGU9XFxcImNvbG9yXFxcIj48L2J1dHRvbj5cXG4gICAgICAgIDxidXR0b24gIGNsYXNzPVxcXCJcIikuY29uY2F0KHN0YXRlWydmaWx0ZXIuY29sb3Iu0LbQtdC70YLRi9C5J10gPyAnYWN0aXZlJyA6ICcnLCBcIlxcXCIgZGF0YS1maWx0ZXI9XFxcIlxcdTA0MzZcXHUwNDM1XFx1MDQzQlxcdTA0NDJcXHUwNDRCXFx1MDQzOVxcXCIgZGF0YS10eXBlPVxcXCJjb2xvclxcXCI+PC9idXR0b24+XFxuICAgICAgICA8YnV0dG9uICBjbGFzcz1cXFwiXCIpLmNvbmNhdChzdGF0ZVsnZmlsdGVyLmNvbG9yLtC60YDQsNGB0L3Ri9C5J10gPyAnYWN0aXZlJyA6ICcnLCBcIlxcXCIgZGF0YS1maWx0ZXI9XFxcIlxcdTA0M0FcXHUwNDQwXFx1MDQzMFxcdTA0NDFcXHUwNDNEXFx1MDQ0QlxcdTA0MzlcXFwiIGRhdGEtdHlwZT1cXFwiY29sb3JcXFwiPjwvYnV0dG9uPlxcbiAgICAgICAgPGJ1dHRvbiAgY2xhc3M9XFxcIlwiKS5jb25jYXQoc3RhdGVbJ2ZpbHRlci5jb2xvci7RgdC40L3QuNC5J10gPyAnYWN0aXZlJyA6ICcnLCBcIlxcXCIgZGF0YS1maWx0ZXI9XFxcIlxcdTA0NDFcXHUwNDM4XFx1MDQzRFxcdTA0MzhcXHUwNDM5XFxcIiBkYXRhLXR5cGU9XFxcImNvbG9yXFxcIj48L2J1dHRvbj5cXG4gICAgICAgIDxidXR0b24gIGNsYXNzPVxcXCJcIikuY29uY2F0KHN0YXRlWydmaWx0ZXIuY29sb3Iu0LfQtdC70ZHQvdGL0LknXSA/ICdhY3RpdmUnIDogJycsIFwiXFxcIiBkYXRhLWZpbHRlcj1cXFwiXFx1MDQzN1xcdTA0MzVcXHUwNDNCXFx1MDQ1MVxcdTA0M0RcXHUwNDRCXFx1MDQzOVxcXCIgZGF0YS10eXBlPVxcXCJjb2xvclxcXCI+PC9idXR0b24+XFxuICAgIDwvZGl2PlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJzaXplXFxcIj5cXHUwNDIwXFx1MDQzMFxcdTA0MzdcXHUwNDNDXFx1MDQzNVxcdTA0NDA6XFxuICAgICAgICA8YnV0dG9uIGNsYXNzPVxcXCJcIikuY29uY2F0KHN0YXRlWydmaWx0ZXIuc2l6ZS7QsdC+0LvRjNGI0L7QuSddID8gJ2FjdGl2ZScgOiAnJywgXCJcXFwiIGRhdGEtZmlsdGVyPVxcXCJcXHUwNDMxXFx1MDQzRVxcdTA0M0JcXHUwNDRDXFx1MDQ0OFxcdTA0M0VcXHUwNDM5XFxcIiBkYXRhLXR5cGU9XFxcInNpemVcXFwiPjwvYnV0dG9uPlxcbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cXFwiXCIpLmNvbmNhdChzdGF0ZVsnZmlsdGVyLnNpemUu0YHRgNC10LTQvdC40LknXSA/ICdhY3RpdmUnIDogJycsIFwiXFxcIiBkYXRhLWZpbHRlcj1cXFwiXFx1MDQ0MVxcdTA0NDBcXHUwNDM1XFx1MDQzNFxcdTA0M0RcXHUwNDM4XFx1MDQzOVxcXCIgZGF0YS10eXBlPVxcXCJzaXplXFxcIj48L2J1dHRvbj5cXG4gICAgICAgIDxidXR0b24gY2xhc3M9XFxcIlwiKS5jb25jYXQoc3RhdGVbJ2ZpbHRlci5zaXplLtC80LDQu9GL0LknXSA/ICdhY3RpdmUnIDogJycsIFwiXFxcIiBkYXRhLWZpbHRlcj1cXFwiXFx1MDQzQ1xcdTA0MzBcXHUwNDNCXFx1MDQ0QlxcdTA0MzlcXFwiIGRhdGEtdHlwZT1cXFwic2l6ZVxcXCI+PC9idXR0b24+XFxuICAgIDwvZGl2PlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJmYXZvcml0ZS1jb250YWluZXJcXFwiPlxcdTA0MjJcXHUwNDNFXFx1MDQzQlxcdTA0NENcXHUwNDNBXFx1MDQzRSBcXHUwNDNCXFx1MDQ0RVxcdTA0MzFcXHUwNDM4XFx1MDQzQ1xcdTA0NEJcXHUwNDM1OlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+IFxcbiAgICAgICAgPGlucHV0IHR5cGU9XFxcImNoZWNrYm94XFxcIiBcIikuY29uY2F0KHN0YXRlWydmaWx0ZXIuZmF2b3JpdGUnXSA/ICdjaGVja2VkJyA6ICcnLCBcIlxcbiAgICAgICAgICAgIGNsYXNzPVxcXCJmYXZvcml0ZS1pbnB1dFxcXCJcXG4gICAgICAgICAgICBpZD1cXFwiY2hlY2tib3hcXFwiIFxcbiAgICAgICAgICAgIC8+XFxuICAgICAgICA8bGFiZWwgZm9yPVxcXCJjaGVja2JveFxcXCIgZGF0YS1jaGVja2JveD1cXFwidHJ1ZVxcXCJcXG4gICAgICAgICAgICBjbGFzcz1cXFwiZmF2b3JpdGUtaW5wdXQtbGFiZWxcXFwiPjwvbGFiZWw+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuICAgICAgXCIpO1xyXG4gICAgfTtcclxuICAgIEFwcFZpZXcucHJvdG90eXBlLmdldEZpbHRlcnMyVGVtcGxhdGUgPSBmdW5jdGlvbiAoc3RhdGUpIHtcclxuICAgICAgICByZXR1cm4gXCI8ZGl2IGNsYXNzPVxcXCJyYW5nZVxcXCI+XFxuICA8aDIgY2xhc3M9XFxcImZpbHRlci10aXRsZVxcXCI+XFx1MDQyNFxcdTA0MzhcXHUwNDNCXFx1MDQ0Q1xcdTA0NDJcXHUwNDQwXFx1MDQ0QiBcXHUwNDNGXFx1MDQzRSBcXHUwNDM0XFx1MDQzOFxcdTA0MzBcXHUwNDNGXFx1MDQzMFxcdTA0MzdcXHUwNDNFXFx1MDQzRFxcdTA0NDM8L2gyPlxcbiAgPGRpdiBjbGFzcz1cXFwiY291bnRcXFwiPlxcbiAgICAgIDxzcGFuIGNsYXNzPVxcXCJjb250cm9sLXNwYW5cXFwiPlxcdTA0MUFcXHUwNDNFXFx1MDQzQlxcdTA0MzhcXHUwNDQ3XFx1MDQzNVxcdTA0NDFcXHUwNDQyXFx1MDQzMlxcdTA0M0UgXFx1MDQ0RFxcdTA0M0FcXHUwNDM3XFx1MDQzNVxcdTA0M0NcXHUwNDNGXFx1MDQzQlxcdTA0NEZcXHUwNDQwXFx1MDQzRVxcdTA0MzI6PC9zcGFuPlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImNvdW50LXNsaWRlci1jb250YWluZXJcXFwiPlxcbiAgICAgICAgICA8ZGl2PlxcdTA0MUVcXHUwNDQyPC9kaXY+XFxuICAgICAgICAgICAgPGlucHV0IGlkPVxcXCJmaWx0ZXItZnJvbVxcXCIgZGF0YS1maWx0ZXItZnJvbT1cXFwiZmlsdGVyLWZyb21cXFwiIHR5cGU9XFxcInJhbmdlXFxcIiBtaW49XFxcIjBcXFwiIG1heD1cXFwiMTJcXFwiIHZhbHVlPVwiLmNvbmNhdChzdGF0ZVsnZmlsdGVyLmZyb20nXSwgXCI+XFxuICAgICAgICAgIDxkaXYgaWQ9XFxcImZyb20tdmFsdWVcXFwiPlwiKS5jb25jYXQoc3RhdGVbJ2ZpbHRlci5mcm9tJ10gPyBzdGF0ZVsnZmlsdGVyLmZyb20nXSA6ICcnLCBcIjwvZGl2PlxcbiAgICAgICAgICA8ZGl2PlxcdTA0MTRcXHUwNDNFPC9kaXY+XFxuICAgICAgICAgIDxpbnB1dCBpZD1cXFwiZmlsdGVyLXRvXFxcIiBkYXRhLWZpbHRlci10bz1cXFwiZmlsdGVyLXRvXFxcIiB0eXBlPVxcXCJyYW5nZVxcXCIgbWluPVxcXCIwXFxcIiBtYXg9XFxcIjEyXFxcIiB2YWx1ZT1cIikuY29uY2F0KHN0YXRlWydmaWx0ZXIudG8nXSwgXCI+XFxuICAgICAgICA8ZGl2IGlkPVxcXCJ0by12YWx1ZVxcXCI+XCIpLmNvbmNhdChzdGF0ZVsnZmlsdGVyLnRvJ10gPyBzdGF0ZVsnZmlsdGVyLnRvJ10gOiAnJywgXCI8L2Rpdj5cXG5cXG4gICAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcbiAgPGRpdiBjbGFzcz1cXFwieWVhclxcXCI+XFxuICAgICAgPHNwYW4gY2xhc3M9XFxcImNvbnRyb2wtc3BhblxcXCI+XFx1MDQxM1xcdTA0M0VcXHUwNDM0IFxcdTA0M0ZcXHUwNDQwXFx1MDQzOFxcdTA0M0VcXHUwNDMxXFx1MDQ0MFxcdTA0MzVcXHUwNDQyXFx1MDQzNVxcdTA0M0RcXHUwNDM4XFx1MDQ0Rjo8L3NwYW4+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwieWVhci1zbGlkZXItY29udGFpbmVyXFxcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJzbGlkZXItb3V0cHV0XFxcIj5cXHUwNDFFXFx1MDQ0MjwvZGl2PlxcbiAgICAgICAgPGlucHV0IGlkPVxcXCJmaWx0ZXItZnJvbVllYXJcXFwiIGRhdGEtZmlsdGVyLWZyb20tWWVhcj1cXFwiZmlsdGVyLWZyb21ZZWFyXFxcIiB0eXBlPVxcXCJyYW5nZVxcXCIgbWluPVxcXCIxOTQwXFxcIiBtYXg9XFxcIjIwMjFcXFwiIHZhbHVlPVwiKS5jb25jYXQoc3RhdGVbJ2ZpbHRlci5mcm9tWWVhciddLCBcIj5cXG4gICAgICA8ZGl2IGlkPVxcXCJmcm9tLXZhbHVlLVllYXJcXFwiPlwiKS5jb25jYXQoc3RhdGVbJ2ZpbHRlci5mcm9tWWVhciddID8gc3RhdGVbJ2ZpbHRlci5mcm9tWWVhciddIDogJycsIFwiPC9kaXY+XFxuXFxuICA8ZGl2IGNsYXNzPVxcXCJzbGlkZXItb3V0cHV0XFxcIj5cXHUwNDE0XFx1MDQzRTwvZGl2PlxcbiAgPGlucHV0IGlkPVxcXCJmaWx0ZXItdG9ZZWFyXFxcIiBkYXRhLWZpbHRlci10by1ZZWFyPVxcXCJmaWx0ZXItdG9ZZWFyXFxcIiB0eXBlPVxcXCJyYW5nZVxcXCIgbWluPVxcXCIxOTQwXFxcIiBtYXg9XFxcIjIwMjFcXFwiIHZhbHVlPVwiKS5jb25jYXQoc3RhdGVbJ2ZpbHRlci50b1llYXInXSwgXCI+XFxuICA8ZGl2IGlkPVxcXCJ0by12YWx1ZS1ZZWFyXFxcIj5cIikuY29uY2F0KHN0YXRlWydmaWx0ZXIudG9ZZWFyJ10gPyBzdGF0ZVsnZmlsdGVyLnRvWWVhciddIDogJycsIFwiPC9kaXY+XFxuXFxuXFxuICAgICAgPC9kaXY+XFxuICA8L2Rpdj5cXG48L2Rpdj5cIik7XHJcbiAgICB9O1xyXG4gICAgQXBwVmlldy5wcm90b3R5cGUuZ2V0RmlsdGVyczNUZW1sYXRlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBcIjxkaXYgY2xhc3M9XFxcInNvcnRcXFwiPlxcbiAgPGgyIGNsYXNzPVxcXCJmaWx0ZXItdGl0bGVcXFwiPlxcdTA0MjFcXHUwNDNFXFx1MDQ0MFxcdTA0NDJcXHUwNDM4XFx1MDQ0MFxcdTA0M0VcXHUwNDMyXFx1MDQzQVxcdTA0MzA8L2gyPlxcbiAgPHNlbGVjdCBjbGFzcz1cXFwic29ydC1zZWxlY3RcXFwiPlxcbiAgICAgIDxvcHRpb24gc2VsZWN0ZWQ+XFx1MDQzMlxcdTA0NEJcXHUwNDMxXFx1MDQzNVxcdTA0NDBcXHUwNDM4XFx1MDQ0MlxcdTA0MzU8L29wdGlvbj5cXG4gICAgICA8b3B0aW9uIHZhbHVlPVxcXCJzb3J0LW5hbWUtbWF4XFxcIj5cXHUwNDFGXFx1MDQzRSBcXHUwNDNEXFx1MDQzMFxcdTA0MzdcXHUwNDMyXFx1MDQzMFxcdTA0M0RcXHUwNDM4XFx1MDQ0RSBcXHUwNDNFXFx1MDQ0MiBcXHUwMEFCXFx1MDQxMFxcdTAwQkIgXFx1MDQzNFxcdTA0M0UgXFx1MDBBQlxcdTA0MkZcXHUwMEJCPC9vcHRpb24+XFxuICAgICAgPG9wdGlvbiB2YWx1ZT1cXFwic29ydC1uYW1lLW1pblxcXCI+XFx1MDQxRlxcdTA0M0UgXFx1MDQzRFxcdTA0MzBcXHUwNDM3XFx1MDQzMlxcdTA0MzBcXHUwNDNEXFx1MDQzOFxcdTA0NEUgXFx1MDQzRVxcdTA0NDIgXFx1MDBBQlxcdTA0MkZcXHUwMEJCIFxcdTA0MzRcXHUwNDNFIFxcdTAwQUJcXHUwNDEwXFx1MDBCQjwvb3B0aW9uPlxcbiAgICAgIDxvcHRpb24gdmFsdWU9XFxcInNvcnQteWVhci1tYXhcXFwiPlxcdTA0MUZcXHUwNDNFIFxcdTA0MzNcXHUwNDNFXFx1MDQzNFxcdTA0NDMgXFx1MDQzOFxcdTA0NDUgXFx1MDQzRlxcdTA0NDBcXHUwNDM4XFx1MDQzRVxcdTA0MzFcXHUwNDQwXFx1MDQzNVxcdTA0NDJcXHUwNDM1XFx1MDQzRFxcdTA0MzhcXHUwNDRGIFxcdTAwQUJcXHUyMTkxXFx1MDBCQiA8L29wdGlvbj5cXG4gICAgICA8b3B0aW9uIHZhbHVlPVxcXCJzb3J0LXllYXItbWluXFxcIj5cXHUwNDFGXFx1MDQzRSBcXHUwNDMzXFx1MDQzRVxcdTA0MzRcXHUwNDQzIFxcdTA0MzhcXHUwNDQ1IFxcdTA0M0ZcXHUwNDQwXFx1MDQzOFxcdTA0M0VcXHUwNDMxXFx1MDQ0MFxcdTA0MzVcXHUwNDQyXFx1MDQzNVxcdTA0M0RcXHUwNDM4XFx1MDQ0RiBcXHUwMEFCXFx1MjE5M1xcdTAwQkIgPC9vcHRpb24+XFxuXFxuICA8L3NlbGVjdD5cXG4gIDxidXR0b24gY2xhc3M9XFxcInJlc2V0XFxcIj5cXHUwNDIxXFx1MDQzMVxcdTA0NDBcXHUwNDNFXFx1MDQ0MSBcXHUwNDQ0XFx1MDQzOFxcdTA0M0JcXHUwNDRDXFx1MDQ0MlxcdTA0NDBcXHUwNDNFXFx1MDQzMjwvYnV0dG9uPlxcbjwvZGl2PlwiO1xyXG4gICAgfTtcclxuICAgIEFwcFZpZXcucHJvdG90eXBlLmdldFRyZWVQYWdlVGVtcGxhdGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIFwiPGRpdj48L2Rpdj5cIjtcclxuICAgIH07XHJcbiAgICBBcHBWaWV3LnByb3RvdHlwZS5nZXRTdGFydFBhZ2VUZW1hcGxhdGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIFwiPHNlY3Rpb24gaWQ9XFxcInN0YXJ0UGFnZVxcXCIgY2xhc3M9XFxcInBhZ2Ugc3RhcnQtcGFnZVxcXCI+XFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImJhbGwgYmFsbDFcXFwiPjwvZGl2PlxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJiYWxsIGJhbGwyXFxcIj48L2Rpdj5cXG4gICAgICAgICAgICAgICAgPGgxIGNsYXNzPVxcXCJzdGFydC1wYWdlLXRpdGxlXFxcIj5cXHUwNDFEXFx1MDQzRVxcdTA0MzJcXHUwNDNFXFx1MDQzM1xcdTA0M0VcXHUwNDM0XFx1MDQzRFxcdTA0NEZcXHUwNDRGIFxcdTA0MzhcXHUwNDMzXFx1MDQ0MFxcdTA0MzA8c3Bhbj5cXHUwMEFCXFx1MDQxRFxcdTA0MzBcXHUwNDQwXFx1MDQ0RlxcdTA0MzRcXHUwNDM4IFxcdTA0NTFcXHUwNDNCXFx1MDQzQVxcdTA0NDNcXHUwMEJCPC9zcGFuPjwvaDE+XFxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XFxcInN3aXRjaC1zdGFydC1wYWdlXFxcIiBkYXRhLXBhZ2U9XFxcIm1haW5QYWdlXFxcIj5cXHUwNDFEXFx1MDQzMFxcdTA0NDdcXHUwNDMwXFx1MDQ0MlxcdTA0NEM8L2J1dHRvbj5cXG4gICAgICAgICAgICA8L3NlY3Rpb24+XCI7XHJcbiAgICB9O1xyXG4gICAgQXBwVmlldy5wcm90b3R5cGUuZ2V0VG95c1BhZ2VUZW1wbGF0ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gXCIgXFxuICAgICAgPHNlY3Rpb24gaWQ9XFxcInRveXNQYWdlXFxcIiBjbGFzcz1cXFwicGFnZSB0b3lzLXBhZ2UgXFxcIj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ0b3lzLXBhZ2VfX2ZpbHRlclxcXCI+XFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJmaWx0ZXJzIGZpbHRlcjEtY29udGFpbmVyXFxcIj5cXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiXFxcIj48L2Rpdj5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJmaWx0ZXIyLWNvbnRhaW5lclxcXCI+PC9kaXY+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZmlsdGVyMy1jb250YWluZXJcXFwiPjwvZGl2PlxcbiAgICAgICAgICAgIFxcblxcbiAgICAgXFxuXFxuICAgICBcXG4gPC9kaXY+XFxuIDxkaXYgY2xhc3M9XFxcInRveXMtcGFnZV9fY2FyZHMtYmxvY2tcXFwiPlxcblxcbiA8L2Rpdj5cXG48L3NlY3Rpb24+XCI7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIEFwcFZpZXc7XHJcbn0oKSk7XHJcbmV4cG9ydCB7IEFwcFZpZXcgfTtcclxuIiwidmFyIGRhdGEgPSBbXHJcbiAgICB7XHJcbiAgICAgICAgbnVtOiBcIjFcIixcclxuICAgICAgICBuYW1lOiBcItCR0L7Qu9GM0YjQvtC5INGI0LDRgCDRgSDRgNC40YHRg9C90LrQvtC8XCIsXHJcbiAgICAgICAgY291bnQ6IFwiMlwiLFxyXG4gICAgICAgIHllYXI6IFwiMTk2MFwiLFxyXG4gICAgICAgIHNoYXBlOiBcItGI0LDRgFwiLFxyXG4gICAgICAgIGNvbG9yOiBcItC20LXQu9GC0YvQuVwiLFxyXG4gICAgICAgIHNpemU6IFwi0LHQvtC70YzRiNC+0LlcIixcclxuICAgICAgICBmYXZvcml0ZTogZmFsc2UsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIG51bTogXCIyXCIsXHJcbiAgICAgICAgbmFtZTogXCLQl9C10LvRkdC90YvQuSDRiNCw0YAg0YEg0YbQstC10YLQsNC80LhcIixcclxuICAgICAgICBjb3VudDogXCI1XCIsXHJcbiAgICAgICAgeWVhcjogXCIyMDAwXCIsXHJcbiAgICAgICAgc2hhcGU6IFwi0YjQsNGAXCIsXHJcbiAgICAgICAgY29sb3I6IFwi0LfQtdC70ZHQvdGL0LlcIixcclxuICAgICAgICBzaXplOiBcItCx0L7Qu9GM0YjQvtC5XCIsXHJcbiAgICAgICAgZmF2b3JpdGU6IGZhbHNlLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBudW06IFwiM1wiLFxyXG4gICAgICAgIG5hbWU6IFwi0JrRgNCw0YHQvdGL0Lkg0LzQsNGC0L7QstGL0Lkg0YjQsNGAXCIsXHJcbiAgICAgICAgY291bnQ6IFwiM1wiLFxyXG4gICAgICAgIHllYXI6IFwiMTk5MFwiLFxyXG4gICAgICAgIHNoYXBlOiBcItGI0LDRgFwiLFxyXG4gICAgICAgIGNvbG9yOiBcItC60YDQsNGB0L3Ri9C5XCIsXHJcbiAgICAgICAgc2l6ZTogXCLQsdC+0LvRjNGI0L7QuVwiLFxyXG4gICAgICAgIGZhdm9yaXRlOiBmYWxzZSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgbnVtOiBcIjRcIixcclxuICAgICAgICBuYW1lOiBcItCh0L7RgdGD0LvRjNC60LAg0LrRgNCw0YHQvdCw0Y9cIixcclxuICAgICAgICBjb3VudDogXCIyXCIsXHJcbiAgICAgICAgeWVhcjogXCIxOTgwXCIsXHJcbiAgICAgICAgc2hhcGU6IFwi0YTQuNCz0YPRgNC60LBcIixcclxuICAgICAgICBjb2xvcjogXCLQutGA0LDRgdC90YvQuVwiLFxyXG4gICAgICAgIHNpemU6IFwi0LHQvtC70YzRiNC+0LlcIixcclxuICAgICAgICBmYXZvcml0ZTogZmFsc2UsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIG51bTogXCI1XCIsXHJcbiAgICAgICAgbmFtZTogXCLQmtGA0LDRgdC90YvQuSDQstC40L3QvtCz0YDQsNC0XCIsXHJcbiAgICAgICAgY291bnQ6IFwiNFwiLFxyXG4gICAgICAgIHllYXI6IFwiMTk4MFwiLFxyXG4gICAgICAgIHNoYXBlOiBcItGE0LjQs9GD0YDQutCwXCIsXHJcbiAgICAgICAgY29sb3I6IFwi0LrRgNCw0YHQvdGL0LlcIixcclxuICAgICAgICBzaXplOiBcItGB0YDQtdC00L3QuNC5XCIsXHJcbiAgICAgICAgZmF2b3JpdGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIG51bTogXCI2XCIsXHJcbiAgICAgICAgbmFtZTogXCLQmtGA0LDRgdC90YvQuSDRiNCw0YAg0YEg0YDQuNGB0YPQvdC60L7QvFwiLFxyXG4gICAgICAgIGNvdW50OiBcIjZcIixcclxuICAgICAgICB5ZWFyOiBcIjIwMTBcIixcclxuICAgICAgICBzaGFwZTogXCLRiNCw0YBcIixcclxuICAgICAgICBjb2xvcjogXCLQutGA0LDRgdC90YvQuVwiLFxyXG4gICAgICAgIHNpemU6IFwi0LHQvtC70YzRiNC+0LlcIixcclxuICAgICAgICBmYXZvcml0ZTogZmFsc2UsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIG51bTogXCI3XCIsXHJcbiAgICAgICAgbmFtZTogXCLQnNC+0LvQvtGH0L3Qvi3QsdC10LvRi9C5INGI0LDRgFwiLFxyXG4gICAgICAgIGNvdW50OiBcIjEyXCIsXHJcbiAgICAgICAgeWVhcjogXCIxOTYwXCIsXHJcbiAgICAgICAgc2hhcGU6IFwi0YjQsNGAXCIsXHJcbiAgICAgICAgY29sb3I6IFwi0LHQtdC70YvQuVwiLFxyXG4gICAgICAgIHNpemU6IFwi0YHRgNC10LTQvdC40LlcIixcclxuICAgICAgICBmYXZvcml0ZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgbnVtOiBcIjhcIixcclxuICAgICAgICBuYW1lOiBcItCa0YDQsNGB0L3Ri9C5INGI0LDRgFwiLFxyXG4gICAgICAgIGNvdW50OiBcIjEwXCIsXHJcbiAgICAgICAgeWVhcjogXCIyMDEwXCIsXHJcbiAgICAgICAgc2hhcGU6IFwi0YjQsNGAXCIsXHJcbiAgICAgICAgY29sb3I6IFwi0LrRgNCw0YHQvdGL0LlcIixcclxuICAgICAgICBzaXplOiBcItCx0L7Qu9GM0YjQvtC5XCIsXHJcbiAgICAgICAgZmF2b3JpdGU6IGZhbHNlLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBudW06IFwiOVwiLFxyXG4gICAgICAgIG5hbWU6IFwi0JrQvtC70L7QutC+0LvRjNGH0LjQuiDRgdGC0LDRgNC40L3QvdGL0LlcIixcclxuICAgICAgICBjb3VudDogXCIyXCIsXHJcbiAgICAgICAgeWVhcjogXCIxOTUwXCIsXHJcbiAgICAgICAgc2hhcGU6IFwi0LrQvtC70L7QutC+0LvRjNGH0LjQulwiLFxyXG4gICAgICAgIGNvbG9yOiBcItCx0LXQu9GL0LlcIixcclxuICAgICAgICBzaXplOiBcItCx0L7Qu9GM0YjQvtC5XCIsXHJcbiAgICAgICAgZmF2b3JpdGU6IGZhbHNlLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBudW06IFwiMTBcIixcclxuICAgICAgICBuYW1lOiBcItCR0LXQu9GL0Lkg0YjQsNGAINGA0LXRgtGA0L5cIixcclxuICAgICAgICBjb3VudDogXCI3XCIsXHJcbiAgICAgICAgeWVhcjogXCIxOTYwXCIsXHJcbiAgICAgICAgc2hhcGU6IFwi0YjQsNGAXCIsXHJcbiAgICAgICAgY29sb3I6IFwi0LHQtdC70YvQuVwiLFxyXG4gICAgICAgIHNpemU6IFwi0LHQvtC70YzRiNC+0LlcIixcclxuICAgICAgICBmYXZvcml0ZTogZmFsc2UsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIG51bTogXCIxMVwiLFxyXG4gICAgICAgIG5hbWU6IFwi0KjQuNGI0LrQsCDQtdC70L7QstCw0Y8g0LHQtdC70LDRj1wiLFxyXG4gICAgICAgIGNvdW50OiBcIjExXCIsXHJcbiAgICAgICAgeWVhcjogXCIxOTYwXCIsXHJcbiAgICAgICAgc2hhcGU6IFwi0YjQuNGI0LrQsFwiLFxyXG4gICAgICAgIGNvbG9yOiBcItCx0LXQu9GL0LlcIixcclxuICAgICAgICBzaXplOiBcItC80LDQu9GL0LlcIixcclxuICAgICAgICBmYXZvcml0ZTogZmFsc2UsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIG51bTogXCIxMlwiLFxyXG4gICAgICAgIG5hbWU6IFwi0JHQtdC70YvQuSDRiNCw0YAg0YEg0YbQstC10YLQsNC80LhcIixcclxuICAgICAgICBjb3VudDogXCI1XCIsXHJcbiAgICAgICAgeWVhcjogXCIxOTgwXCIsXHJcbiAgICAgICAgc2hhcGU6IFwi0YjQsNGAXCIsXHJcbiAgICAgICAgY29sb3I6IFwi0LHQtdC70YvQuVwiLFxyXG4gICAgICAgIHNpemU6IFwi0LHQvtC70YzRiNC+0LlcIixcclxuICAgICAgICBmYXZvcml0ZTogZmFsc2UsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIG51bTogXCIxM1wiLFxyXG4gICAgICAgIG5hbWU6IFwi0KjQsNGAINGA0LDRgdC/0LjRgdC90L7QuSDQoNC10LrQsFwiLFxyXG4gICAgICAgIGNvdW50OiBcIjNcIixcclxuICAgICAgICB5ZWFyOiBcIjE5NzBcIixcclxuICAgICAgICBzaGFwZTogXCLRiNCw0YBcIixcclxuICAgICAgICBjb2xvcjogXCLRgdC40L3QuNC5XCIsXHJcbiAgICAgICAgc2l6ZTogXCLQsdC+0LvRjNGI0L7QuVwiLFxyXG4gICAgICAgIGZhdm9yaXRlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBudW06IFwiMTRcIixcclxuICAgICAgICBuYW1lOiBcItCo0LDRgCDRgNCw0YHQv9C40YHQvdC+0Lkg0JTQtdGA0LXQstC90Y9cIixcclxuICAgICAgICBjb3VudDogXCI0XCIsXHJcbiAgICAgICAgeWVhcjogXCIxOTcwXCIsXHJcbiAgICAgICAgc2hhcGU6IFwi0YjQsNGAXCIsXHJcbiAgICAgICAgY29sb3I6IFwi0YHQuNC90LjQuVwiLFxyXG4gICAgICAgIHNpemU6IFwi0LHQvtC70YzRiNC+0LlcIixcclxuICAgICAgICBmYXZvcml0ZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgbnVtOiBcIjE1XCIsXHJcbiAgICAgICAgbmFtZTogXCLQmtC+0LvQvtC60L7Qu9GM0YfQuNC6INGA0LDRgdC/0LjRgdC90L7QuVwiLFxyXG4gICAgICAgIGNvdW50OiBcIjNcIixcclxuICAgICAgICB5ZWFyOiBcIjE5NzBcIixcclxuICAgICAgICBzaGFwZTogXCLQutC+0LvQvtC60L7Qu9GM0YfQuNC6XCIsXHJcbiAgICAgICAgY29sb3I6IFwi0YHQuNC90LjQuVwiLFxyXG4gICAgICAgIHNpemU6IFwi0YHRgNC10LTQvdC40LlcIixcclxuICAgICAgICBmYXZvcml0ZTogZmFsc2UsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIG51bTogXCIxNlwiLFxyXG4gICAgICAgIG5hbWU6IFwi0KjQuNGI0LrQsCDRgNCw0YHQv9C40YHQvdCw0Y8g0J/QtdC50LfQsNC2XCIsXHJcbiAgICAgICAgY291bnQ6IFwiM1wiLFxyXG4gICAgICAgIHllYXI6IFwiMTk3MFwiLFxyXG4gICAgICAgIHNoYXBlOiBcItGI0LjRiNC60LBcIixcclxuICAgICAgICBjb2xvcjogXCLRgdC40L3QuNC5XCIsXHJcbiAgICAgICAgc2l6ZTogXCLRgdGA0LXQtNC90LjQuVwiLFxyXG4gICAgICAgIGZhdm9yaXRlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBudW06IFwiMTdcIixcclxuICAgICAgICBuYW1lOiBcItCo0LjRiNC60LAg0YDQsNGB0L/QuNGB0L3QsNGPXCIsXHJcbiAgICAgICAgY291bnQ6IFwiN1wiLFxyXG4gICAgICAgIHllYXI6IFwiMTk3MFwiLFxyXG4gICAgICAgIHNoYXBlOiBcItGI0LjRiNC60LBcIixcclxuICAgICAgICBjb2xvcjogXCLQutGA0LDRgdC90YvQuVwiLFxyXG4gICAgICAgIHNpemU6IFwi0YHRgNC10LTQvdC40LlcIixcclxuICAgICAgICBmYXZvcml0ZTogZmFsc2UsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIG51bTogXCIxOFwiLFxyXG4gICAgICAgIG5hbWU6IFwi0JbQtdC70YLRi9C5INGI0LDRgCDRgSDQsdCw0L3RgtC+0LxcIixcclxuICAgICAgICBjb3VudDogXCIyXCIsXHJcbiAgICAgICAgeWVhcjogXCIyMDEwXCIsXHJcbiAgICAgICAgc2hhcGU6IFwi0YjQsNGAXCIsXHJcbiAgICAgICAgY29sb3I6IFwi0LbQtdC70YLRi9C5XCIsXHJcbiAgICAgICAgc2l6ZTogXCLQsdC+0LvRjNGI0L7QuVwiLFxyXG4gICAgICAgIGZhdm9yaXRlOiBmYWxzZSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgbnVtOiBcIjE5XCIsXHJcbiAgICAgICAgbmFtZTogXCLQltC10LvRgtGL0Lkg0YjQsNGAINGBINC/0LDQtdGC0LrQsNC80LhcIixcclxuICAgICAgICBjb3VudDogXCIxMlwiLFxyXG4gICAgICAgIHllYXI6IFwiMTk4MFwiLFxyXG4gICAgICAgIHNoYXBlOiBcItGI0LDRgFwiLFxyXG4gICAgICAgIGNvbG9yOiBcItC20LXQu9GC0YvQuVwiLFxyXG4gICAgICAgIHNpemU6IFwi0LHQvtC70YzRiNC+0LlcIixcclxuICAgICAgICBmYXZvcml0ZTogZmFsc2UsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIG51bTogXCIyMFwiLFxyXG4gICAgICAgIG5hbWU6IFwi0JrRgNCw0YHQvdGL0Lkg0YjQsNGAINGBINCx0LDQvdGC0L7QvFwiLFxyXG4gICAgICAgIGNvdW50OiBcIjhcIixcclxuICAgICAgICB5ZWFyOiBcIjE5NTBcIixcclxuICAgICAgICBzaGFwZTogXCLRiNCw0YBcIixcclxuICAgICAgICBjb2xvcjogXCLQutGA0LDRgdC90YvQuVwiLFxyXG4gICAgICAgIHNpemU6IFwi0YHRgNC10LTQvdC40LlcIixcclxuICAgICAgICBmYXZvcml0ZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgbnVtOiBcIjIxXCIsXHJcbiAgICAgICAgbmFtZTogXCLQmtGA0LDRgdC90YvQuSDRiNCw0YAg0YEg0LfQstGR0LfQtNCw0LzQuFwiLFxyXG4gICAgICAgIGNvdW50OiBcIjRcIixcclxuICAgICAgICB5ZWFyOiBcIjE5NzBcIixcclxuICAgICAgICBzaGFwZTogXCLRiNCw0YBcIixcclxuICAgICAgICBjb2xvcjogXCLQutGA0LDRgdC90YvQuVwiLFxyXG4gICAgICAgIHNpemU6IFwi0LHQvtC70YzRiNC+0LlcIixcclxuICAgICAgICBmYXZvcml0ZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgbnVtOiBcIjIyXCIsXHJcbiAgICAgICAgbmFtZTogXCLQqNC40YjQutCwINC10LvQvtCy0LDRjyDQt9C+0LvQvtGC0LDRj1wiLFxyXG4gICAgICAgIGNvdW50OiBcIjExXCIsXHJcbiAgICAgICAgeWVhcjogXCIxOTkwXCIsXHJcbiAgICAgICAgc2hhcGU6IFwi0YjQuNGI0LrQsFwiLFxyXG4gICAgICAgIGNvbG9yOiBcItC20LXQu9GC0YvQuVwiLFxyXG4gICAgICAgIHNpemU6IFwi0LzQsNC70YvQuVwiLFxyXG4gICAgICAgIGZhdm9yaXRlOiBmYWxzZSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgbnVtOiBcIjIzXCIsXHJcbiAgICAgICAgbmFtZTogXCLQmtC+0LvQvtC60L7Qu9GM0YfQuNC6INGB0YLQsNGA0LjQvdC90YvQuVwiLFxyXG4gICAgICAgIGNvdW50OiBcIjlcIixcclxuICAgICAgICB5ZWFyOiBcIjE5NTBcIixcclxuICAgICAgICBzaGFwZTogXCLQutC+0LvQvtC60L7Qu9GM0YfQuNC6XCIsXHJcbiAgICAgICAgY29sb3I6IFwi0LbQtdC70YLRi9C5XCIsXHJcbiAgICAgICAgc2l6ZTogXCLQsdC+0LvRjNGI0L7QuVwiLFxyXG4gICAgICAgIGZhdm9yaXRlOiBmYWxzZSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgbnVtOiBcIjI0XCIsXHJcbiAgICAgICAgbmFtZTogXCLQodC90LXQttC40L3QutCwINC40LfRj9GJ0L3QsNGPXCIsXHJcbiAgICAgICAgY291bnQ6IFwiMVwiLFxyXG4gICAgICAgIHllYXI6IFwiMTk0MFwiLFxyXG4gICAgICAgIHNoYXBlOiBcItGB0L3QtdC20LjQvdC60LBcIixcclxuICAgICAgICBjb2xvcjogXCLQsdC10LvRi9C5XCIsXHJcbiAgICAgICAgc2l6ZTogXCLQsdC+0LvRjNGI0L7QuVwiLFxyXG4gICAgICAgIGZhdm9yaXRlOiBmYWxzZSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgbnVtOiBcIjI1XCIsXHJcbiAgICAgICAgbmFtZTogXCLQoNC+0LfQvtCy0YvQuSDRiNCw0YAg0YEg0LHQu9GR0YHRgtC60LDQvNC4XCIsXHJcbiAgICAgICAgY291bnQ6IFwiMTJcIixcclxuICAgICAgICB5ZWFyOiBcIjIwMTBcIixcclxuICAgICAgICBzaGFwZTogXCLRiNCw0YBcIixcclxuICAgICAgICBjb2xvcjogXCLQutGA0LDRgdC90YvQuVwiLFxyXG4gICAgICAgIHNpemU6IFwi0LHQvtC70YzRiNC+0LlcIixcclxuICAgICAgICBmYXZvcml0ZTogZmFsc2UsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIG51bTogXCIyNlwiLFxyXG4gICAgICAgIG5hbWU6IFwi0KDRg9Cx0LjQvdC+0LLQvi3Qt9C+0LvQvtGC0L7QuSDRiNCw0YBcIixcclxuICAgICAgICBjb3VudDogXCI4XCIsXHJcbiAgICAgICAgeWVhcjogXCIxOTYwXCIsXHJcbiAgICAgICAgc2hhcGU6IFwi0YjQsNGAXCIsXHJcbiAgICAgICAgY29sb3I6IFwi0LbQtdC70YLRi9C5XCIsXHJcbiAgICAgICAgc2l6ZTogXCLQsdC+0LvRjNGI0L7QuVwiLFxyXG4gICAgICAgIGZhdm9yaXRlOiBmYWxzZSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgbnVtOiBcIjI3XCIsXHJcbiAgICAgICAgbmFtZTogXCLQmtGA0LDRgdC90YvQuSDRiNCw0YAg0YEg0YPQt9C+0YDQvtC8XCIsXHJcbiAgICAgICAgY291bnQ6IFwiNFwiLFxyXG4gICAgICAgIHllYXI6IFwiMjAxMFwiLFxyXG4gICAgICAgIHNoYXBlOiBcItGI0LDRgFwiLFxyXG4gICAgICAgIGNvbG9yOiBcItC60YDQsNGB0L3Ri9C5XCIsXHJcbiAgICAgICAgc2l6ZTogXCLQsdC+0LvRjNGI0L7QuVwiLFxyXG4gICAgICAgIGZhdm9yaXRlOiBmYWxzZSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgbnVtOiBcIjI4XCIsXHJcbiAgICAgICAgbmFtZTogXCLQkdC+0YDQtNC+0LLRi9C5INGI0LDRgCDRgSDRg9C30L7RgNC+0LxcIixcclxuICAgICAgICBjb3VudDogXCIxMFwiLFxyXG4gICAgICAgIHllYXI6IFwiMjAxMFwiLFxyXG4gICAgICAgIHNoYXBlOiBcItGI0LDRgFwiLFxyXG4gICAgICAgIGNvbG9yOiBcItC60YDQsNGB0L3Ri9C5XCIsXHJcbiAgICAgICAgc2l6ZTogXCLQsdC+0LvRjNGI0L7QuVwiLFxyXG4gICAgICAgIGZhdm9yaXRlOiBmYWxzZSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgbnVtOiBcIjI5XCIsXHJcbiAgICAgICAgbmFtZTogXCLQodGC0LDRgNC40L3QvdGL0Lkg0YjQsNGAINGBINGG0LLQtdGC0LDQvNC4XCIsXHJcbiAgICAgICAgY291bnQ6IFwiNVwiLFxyXG4gICAgICAgIHllYXI6IFwiMTk1MFwiLFxyXG4gICAgICAgIHNoYXBlOiBcItGI0LDRgFwiLFxyXG4gICAgICAgIGNvbG9yOiBcItC20LXQu9GC0YvQuVwiLFxyXG4gICAgICAgIHNpemU6IFwi0LHQvtC70YzRiNC+0LlcIixcclxuICAgICAgICBmYXZvcml0ZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgbnVtOiBcIjMwXCIsXHJcbiAgICAgICAgbmFtZTogXCLQodGC0LDRgNC40L3QvdGL0Lkg0YjQsNGAINGBINGD0LfQvtGA0L7QvFwiLFxyXG4gICAgICAgIGNvdW50OiBcIjhcIixcclxuICAgICAgICB5ZWFyOiBcIjE5NTBcIixcclxuICAgICAgICBzaGFwZTogXCLRiNCw0YBcIixcclxuICAgICAgICBjb2xvcjogXCLQttC10LvRgtGL0LlcIixcclxuICAgICAgICBzaXplOiBcItCx0L7Qu9GM0YjQvtC5XCIsXHJcbiAgICAgICAgZmF2b3JpdGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIG51bTogXCIzMVwiLFxyXG4gICAgICAgIG5hbWU6IFwi0JrRgNCw0YHQvdGL0Lkg0YjQsNGAINGBINCx0LvRkdGB0YLQutCw0LzQuFwiLFxyXG4gICAgICAgIGNvdW50OiBcIjhcIixcclxuICAgICAgICB5ZWFyOiBcIjIwMTBcIixcclxuICAgICAgICBzaGFwZTogXCLRiNCw0YBcIixcclxuICAgICAgICBjb2xvcjogXCLQutGA0LDRgdC90YvQuVwiLFxyXG4gICAgICAgIHNpemU6IFwi0LHQvtC70YzRiNC+0LlcIixcclxuICAgICAgICBmYXZvcml0ZTogZmFsc2UsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIG51bTogXCIzMlwiLFxyXG4gICAgICAgIG5hbWU6IFwi0KHQuNC90LjQuSDRiNCw0YAg0JLRgdC10LvQtdC90L3QsNGPXCIsXHJcbiAgICAgICAgY291bnQ6IFwiMTFcIixcclxuICAgICAgICB5ZWFyOiBcIjE5NzBcIixcclxuICAgICAgICBzaGFwZTogXCLRiNCw0YBcIixcclxuICAgICAgICBjb2xvcjogXCLRgdC40L3QuNC5XCIsXHJcbiAgICAgICAgc2l6ZTogXCLQsdC+0LvRjNGI0L7QuVwiLFxyXG4gICAgICAgIGZhdm9yaXRlOiBmYWxzZSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgbnVtOiBcIjMzXCIsXHJcbiAgICAgICAgbmFtZTogXCLQodC40L3QuNC5INGI0LDRgCDRgdC+INGB0L3QtdC20LjQvdC60L7QuVwiLFxyXG4gICAgICAgIGNvdW50OiBcIjZcIixcclxuICAgICAgICB5ZWFyOiBcIjIwMTBcIixcclxuICAgICAgICBzaGFwZTogXCLRiNCw0YBcIixcclxuICAgICAgICBjb2xvcjogXCLRgdC40L3QuNC5XCIsXHJcbiAgICAgICAgc2l6ZTogXCLRgdGA0LXQtNC90LjQuVwiLFxyXG4gICAgICAgIGZhdm9yaXRlOiBmYWxzZSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgbnVtOiBcIjM0XCIsXHJcbiAgICAgICAgbmFtZTogXCLQl9C10LvRkdC90YvQuSAg0YjQsNGAINGBINGD0LfQvtGA0L7QvFwiLFxyXG4gICAgICAgIGNvdW50OiBcIjhcIixcclxuICAgICAgICB5ZWFyOiBcIjIwMTBcIixcclxuICAgICAgICBzaGFwZTogXCLRiNCw0YBcIixcclxuICAgICAgICBjb2xvcjogXCLQt9C10LvRkdC90YvQuVwiLFxyXG4gICAgICAgIHNpemU6IFwi0LHQvtC70YzRiNC+0LlcIixcclxuICAgICAgICBmYXZvcml0ZTogZmFsc2UsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIG51bTogXCIzNVwiLFxyXG4gICAgICAgIG5hbWU6IFwi0KTQuNCz0YPRgNC60LAg0JvQuNGBINCyINGI0LDRgNGE0LVcIixcclxuICAgICAgICBjb3VudDogXCI4XCIsXHJcbiAgICAgICAgeWVhcjogXCIxOTUwXCIsXHJcbiAgICAgICAgc2hhcGU6IFwi0YTQuNCz0YPRgNC60LBcIixcclxuICAgICAgICBjb2xvcjogXCLQttC10LvRgtGL0LlcIixcclxuICAgICAgICBzaXplOiBcItGB0YDQtdC00L3QuNC5XCIsXHJcbiAgICAgICAgZmF2b3JpdGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIG51bTogXCIzNlwiLFxyXG4gICAgICAgIG5hbWU6IFwi0KHQuNGA0LXQvdC10LLRi9C5INGI0LDRgCDQnNC10YLQtdC70YxcIixcclxuICAgICAgICBjb3VudDogXCIxXCIsXHJcbiAgICAgICAgeWVhcjogXCIyMDAwXCIsXHJcbiAgICAgICAgc2hhcGU6IFwi0YjQsNGAXCIsXHJcbiAgICAgICAgY29sb3I6IFwi0YHQuNC90LjQuVwiLFxyXG4gICAgICAgIHNpemU6IFwi0LHQvtC70YzRiNC+0LlcIixcclxuICAgICAgICBmYXZvcml0ZTogZmFsc2UsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIG51bTogXCIzN1wiLFxyXG4gICAgICAgIG5hbWU6IFwi0JfQtdC70ZHQvdGL0LkgINGI0LDRgCDQnNC10YLQtdC70YxcIixcclxuICAgICAgICBjb3VudDogXCI2XCIsXHJcbiAgICAgICAgeWVhcjogXCIyMDAwXCIsXHJcbiAgICAgICAgc2hhcGU6IFwi0YjQsNGAXCIsXHJcbiAgICAgICAgY29sb3I6IFwi0LfQtdC70ZHQvdGL0LlcIixcclxuICAgICAgICBzaXplOiBcItCx0L7Qu9GM0YjQvtC5XCIsXHJcbiAgICAgICAgZmF2b3JpdGU6IGZhbHNlLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBudW06IFwiMzhcIixcclxuICAgICAgICBuYW1lOiBcItCT0L7Qu9GD0LHQvtC5ICDRiNCw0YAg0JzQtdGC0LXQu9GMXCIsXHJcbiAgICAgICAgY291bnQ6IFwiNlwiLFxyXG4gICAgICAgIHllYXI6IFwiMjAwMFwiLFxyXG4gICAgICAgIHNoYXBlOiBcItGI0LDRgFwiLFxyXG4gICAgICAgIGNvbG9yOiBcItGB0LjQvdC40LlcIixcclxuICAgICAgICBzaXplOiBcItCx0L7Qu9GM0YjQvtC5XCIsXHJcbiAgICAgICAgZmF2b3JpdGU6IGZhbHNlLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBudW06IFwiMzlcIixcclxuICAgICAgICBuYW1lOiBcItCa0YDQsNGB0L3QsNGPINGB0L3QtdC20LjQvdC60LBcIixcclxuICAgICAgICBjb3VudDogXCI2XCIsXHJcbiAgICAgICAgeWVhcjogXCIxOTkwXCIsXHJcbiAgICAgICAgc2hhcGU6IFwi0YHQvdC10LbQuNC90LrQsFwiLFxyXG4gICAgICAgIGNvbG9yOiBcItC60YDQsNGB0L3Ri9C5XCIsXHJcbiAgICAgICAgc2l6ZTogXCLQsdC+0LvRjNGI0L7QuVwiLFxyXG4gICAgICAgIGZhdm9yaXRlOiBmYWxzZSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgbnVtOiBcIjQwXCIsXHJcbiAgICAgICAgbmFtZTogXCLQodC90LXQttC40L3QutCwINC30L7Qu9C+0YLQsNGPXCIsXHJcbiAgICAgICAgY291bnQ6IFwiMTJcIixcclxuICAgICAgICB5ZWFyOiBcIjIwMjBcIixcclxuICAgICAgICBzaGFwZTogXCLRgdC90LXQttC40L3QutCwXCIsXHJcbiAgICAgICAgY29sb3I6IFwi0LbQtdC70YLRi9C5XCIsXHJcbiAgICAgICAgc2l6ZTogXCLQsdC+0LvRjNGI0L7QuVwiLFxyXG4gICAgICAgIGZhdm9yaXRlOiBmYWxzZSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgbnVtOiBcIjQxXCIsXHJcbiAgICAgICAgbmFtZTogXCLQodC90LXQttC40L3QutCwINCw0YDQutGC0LjRh9C10YHQutCw0Y9cIixcclxuICAgICAgICBjb3VudDogXCIxMVwiLFxyXG4gICAgICAgIHllYXI6IFwiMjAyMFwiLFxyXG4gICAgICAgIHNoYXBlOiBcItGB0L3QtdC20LjQvdC60LBcIixcclxuICAgICAgICBjb2xvcjogXCLQsdC10LvRi9C5XCIsXHJcbiAgICAgICAgc2l6ZTogXCLQsdC+0LvRjNGI0L7QuVwiLFxyXG4gICAgICAgIGZhdm9yaXRlOiBmYWxzZSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgbnVtOiBcIjQyXCIsXHJcbiAgICAgICAgbmFtZTogXCLQl9C10LvRkdC90YvQuSDRiNCw0YBcIixcclxuICAgICAgICBjb3VudDogXCIxMFwiLFxyXG4gICAgICAgIHllYXI6IFwiMTk4MFwiLFxyXG4gICAgICAgIHNoYXBlOiBcItGI0LDRgFwiLFxyXG4gICAgICAgIGNvbG9yOiBcItC30LXQu9GR0L3Ri9C5XCIsXHJcbiAgICAgICAgc2l6ZTogXCLRgdGA0LXQtNC90LjQuVwiLFxyXG4gICAgICAgIGZhdm9yaXRlOiBmYWxzZSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgbnVtOiBcIjQzXCIsXHJcbiAgICAgICAgbmFtZTogXCLQodC90LXQttC40L3QutCwINC00LLRg9GF0YbQstC10YLQvdCw0Y9cIixcclxuICAgICAgICBjb3VudDogXCI2XCIsXHJcbiAgICAgICAgeWVhcjogXCIxOTYwXCIsXHJcbiAgICAgICAgc2hhcGU6IFwi0YHQvdC10LbQuNC90LrQsFwiLFxyXG4gICAgICAgIGNvbG9yOiBcItC60YDQsNGB0L3Ri9C5XCIsXHJcbiAgICAgICAgc2l6ZTogXCLQsdC+0LvRjNGI0L7QuVwiLFxyXG4gICAgICAgIGZhdm9yaXRlOiBmYWxzZSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgbnVtOiBcIjQ0XCIsXHJcbiAgICAgICAgbmFtZTogXCLQpNC40LPRg9GA0LrQsCDQkNC90LPQtdC70LBcIixcclxuICAgICAgICBjb3VudDogXCIxMVwiLFxyXG4gICAgICAgIHllYXI6IFwiMTk0MFwiLFxyXG4gICAgICAgIHNoYXBlOiBcItGE0LjQs9GD0YDQutCwXCIsXHJcbiAgICAgICAgY29sb3I6IFwi0LrRgNCw0YHQvdGL0LlcIixcclxuICAgICAgICBzaXplOiBcItGB0YDQtdC00L3QuNC5XCIsXHJcbiAgICAgICAgZmF2b3JpdGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIG51bTogXCI0NVwiLFxyXG4gICAgICAgIG5hbWU6IFwi0KHQvdC10LbQuNC90LrQsCDQvdC+0LLQvtCz0L7QtNC90Y/Rj1wiLFxyXG4gICAgICAgIGNvdW50OiBcIjFcIixcclxuICAgICAgICB5ZWFyOiBcIjE5ODBcIixcclxuICAgICAgICBzaGFwZTogXCLRgdC90LXQttC40L3QutCwXCIsXHJcbiAgICAgICAgY29sb3I6IFwi0LHQtdC70YvQuVwiLFxyXG4gICAgICAgIHNpemU6IFwi0LHQvtC70YzRiNC+0LlcIixcclxuICAgICAgICBmYXZvcml0ZTogZmFsc2UsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIG51bTogXCI0NlwiLFxyXG4gICAgICAgIG5hbWU6IFwi0KTQuNCz0YPRgNC60LAg0JzRg9GF0L7QvNC+0YBcIixcclxuICAgICAgICBjb3VudDogXCIxMFwiLFxyXG4gICAgICAgIHllYXI6IFwiMTk1MFwiLFxyXG4gICAgICAgIHNoYXBlOiBcItGE0LjQs9GD0YDQutCwXCIsXHJcbiAgICAgICAgY29sb3I6IFwi0LrRgNCw0YHQvdGL0LlcIixcclxuICAgICAgICBzaXplOiBcItC80LDQu9GL0LlcIixcclxuICAgICAgICBmYXZvcml0ZTogZmFsc2UsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIG51bTogXCI0N1wiLFxyXG4gICAgICAgIG5hbWU6IFwi0KTQuNCz0YPRgNC60LAg0JrQvtC70L7QtNC10YZcIixcclxuICAgICAgICBjb3VudDogXCI2XCIsXHJcbiAgICAgICAgeWVhcjogXCIxOTUwXCIsXHJcbiAgICAgICAgc2hhcGU6IFwi0YTQuNCz0YPRgNC60LBcIixcclxuICAgICAgICBjb2xvcjogXCLQutGA0LDRgdC90YvQuVwiLFxyXG4gICAgICAgIHNpemU6IFwi0LzQsNC70YvQuVwiLFxyXG4gICAgICAgIGZhdm9yaXRlOiBmYWxzZSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgbnVtOiBcIjQ4XCIsXHJcbiAgICAgICAgbmFtZTogXCLQltC10LvRgtGL0Lkg0YjQsNGAINGBINCx0LDQvdGC0L7QvFwiLFxyXG4gICAgICAgIGNvdW50OiBcIjZcIixcclxuICAgICAgICB5ZWFyOiBcIjE5NjBcIixcclxuICAgICAgICBzaGFwZTogXCLRiNCw0YBcIixcclxuICAgICAgICBjb2xvcjogXCLQttC10LvRgtGL0LlcIixcclxuICAgICAgICBzaXplOiBcItCx0L7Qu9GM0YjQvtC5XCIsXHJcbiAgICAgICAgZmF2b3JpdGU6IGZhbHNlLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBudW06IFwiNDlcIixcclxuICAgICAgICBuYW1lOiBcItCh0L3QtdC20LjQvdC60LAg0YEg0LHQuNGA0Y7Qt9C+0LlcIixcclxuICAgICAgICBjb3VudDogXCI0XCIsXHJcbiAgICAgICAgeWVhcjogXCIxOTgwXCIsXHJcbiAgICAgICAgc2hhcGU6IFwi0YHQvdC10LbQuNC90LrQsFwiLFxyXG4gICAgICAgIGNvbG9yOiBcItC20LXQu9GC0YvQuVwiLFxyXG4gICAgICAgIHNpemU6IFwi0LHQvtC70YzRiNC+0LlcIixcclxuICAgICAgICBmYXZvcml0ZTogZmFsc2UsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIG51bTogXCI1MFwiLFxyXG4gICAgICAgIG5hbWU6IFwi0JrQvtC70L7QutC+0LvRjNGH0LjQuiDQsdC+0LvRjNGI0L7QuVwiLFxyXG4gICAgICAgIGNvdW50OiBcIjNcIixcclxuICAgICAgICB5ZWFyOiBcIjIwMjBcIixcclxuICAgICAgICBzaGFwZTogXCLQutC+0LvQvtC60L7Qu9GM0YfQuNC6XCIsXHJcbiAgICAgICAgY29sb3I6IFwi0LrRgNCw0YHQvdGL0LlcIixcclxuICAgICAgICBzaXplOiBcItCx0L7Qu9GM0YjQvtC5XCIsXHJcbiAgICAgICAgZmF2b3JpdGU6IGZhbHNlLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBudW06IFwiNTFcIixcclxuICAgICAgICBuYW1lOiBcItCo0LjRiNC60LAg0YEg0LjQt9C80L7RgNC+0LfRjNGOXCIsXHJcbiAgICAgICAgY291bnQ6IFwiMTJcIixcclxuICAgICAgICB5ZWFyOiBcIjE5NzBcIixcclxuICAgICAgICBzaGFwZTogXCLRiNC40YjQutCwXCIsXHJcbiAgICAgICAgY29sb3I6IFwi0LrRgNCw0YHQvdGL0LlcIixcclxuICAgICAgICBzaXplOiBcItC80LDQu9GL0LlcIixcclxuICAgICAgICBmYXZvcml0ZTogZmFsc2UsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIG51bTogXCI1MlwiLFxyXG4gICAgICAgIG5hbWU6IFwi0JrRgNCw0YHQvdGL0Lkg0YjQsNGAINGBINC90LDQtNC/0LjRgdGM0Y5cIixcclxuICAgICAgICBjb3VudDogXCIxMlwiLFxyXG4gICAgICAgIHllYXI6IFwiMTk5MFwiLFxyXG4gICAgICAgIHNoYXBlOiBcItGI0LDRgFwiLFxyXG4gICAgICAgIGNvbG9yOiBcItC60YDQsNGB0L3Ri9C5XCIsXHJcbiAgICAgICAgc2l6ZTogXCLQsdC+0LvRjNGI0L7QuVwiLFxyXG4gICAgICAgIGZhdm9yaXRlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBudW06IFwiNTNcIixcclxuICAgICAgICBuYW1lOiBcItCh0L3QtdC20LjQvdC60LAg0YHQtdGA0LXQsdGA0LjRgdGC0LDRj1wiLFxyXG4gICAgICAgIGNvdW50OiBcIjZcIixcclxuICAgICAgICB5ZWFyOiBcIjIwMjBcIixcclxuICAgICAgICBzaGFwZTogXCLRgdC90LXQttC40L3QutCwXCIsXHJcbiAgICAgICAgY29sb3I6IFwi0LHQtdC70YvQuVwiLFxyXG4gICAgICAgIHNpemU6IFwi0LHQvtC70YzRiNC+0LlcIixcclxuICAgICAgICBmYXZvcml0ZTogZmFsc2UsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIG51bTogXCI1NFwiLFxyXG4gICAgICAgIG5hbWU6IFwi0JfQtdC70ZHQvdGL0Lkg0YjQsNGAINGBINGA0LjRgdGD0L3QutC+0LxcIixcclxuICAgICAgICBjb3VudDogXCI2XCIsXHJcbiAgICAgICAgeWVhcjogXCIyMDEwXCIsXHJcbiAgICAgICAgc2hhcGU6IFwi0YjQsNGAXCIsXHJcbiAgICAgICAgY29sb3I6IFwi0LfQtdC70ZHQvdGL0LlcIixcclxuICAgICAgICBzaXplOiBcItCx0L7Qu9GM0YjQvtC5XCIsXHJcbiAgICAgICAgZmF2b3JpdGU6IGZhbHNlLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBudW06IFwiNTVcIixcclxuICAgICAgICBuYW1lOiBcItCf0YDRj9C90LjRh9C90YvQuSDQtNC+0LzQuNC6XCIsXHJcbiAgICAgICAgY291bnQ6IFwiMVwiLFxyXG4gICAgICAgIHllYXI6IFwiMTk0MFwiLFxyXG4gICAgICAgIHNoYXBlOiBcItGE0LjQs9GD0YDQutCwXCIsXHJcbiAgICAgICAgY29sb3I6IFwi0LbQtdC70YLRi9C5XCIsXHJcbiAgICAgICAgc2l6ZTogXCLQsdC+0LvRjNGI0L7QuVwiLFxyXG4gICAgICAgIGZhdm9yaXRlOiBmYWxzZSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgbnVtOiBcIjU2XCIsXHJcbiAgICAgICAgbmFtZTogXCLQn9GA0Y/QvdC40YfQvdGL0Lkg0YLQtdGA0LXQvNC+0LpcIixcclxuICAgICAgICBjb3VudDogXCIxXCIsXHJcbiAgICAgICAgeWVhcjogXCIxOTQwXCIsXHJcbiAgICAgICAgc2hhcGU6IFwi0YTQuNCz0YPRgNC60LBcIixcclxuICAgICAgICBjb2xvcjogXCLQttC10LvRgtGL0LlcIixcclxuICAgICAgICBzaXplOiBcItC80LDQu9GL0LlcIixcclxuICAgICAgICBmYXZvcml0ZTogZmFsc2UsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIG51bTogXCI1N1wiLFxyXG4gICAgICAgIG5hbWU6IFwi0J/RgNGP0L3QuNGH0L3QsNGPINC40LfQsdGD0YjQutCwXCIsXHJcbiAgICAgICAgY291bnQ6IFwiMVwiLFxyXG4gICAgICAgIHllYXI6IFwiMTk0MFwiLFxyXG4gICAgICAgIHNoYXBlOiBcItGE0LjQs9GD0YDQutCwXCIsXHJcbiAgICAgICAgY29sb3I6IFwi0LbQtdC70YLRi9C5XCIsXHJcbiAgICAgICAgc2l6ZTogXCLRgdGA0LXQtNC90LjQuVwiLFxyXG4gICAgICAgIGZhdm9yaXRlOiBmYWxzZSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgbnVtOiBcIjU4XCIsXHJcbiAgICAgICAgbmFtZTogXCLQpNC40LPRg9GA0LrQsCDQsdC10LvQvtCz0L4g0LzQtdC00LLQtdC00Y9cIixcclxuICAgICAgICBjb3VudDogXCIyXCIsXHJcbiAgICAgICAgeWVhcjogXCIxOTgwXCIsXHJcbiAgICAgICAgc2hhcGU6IFwi0YTQuNCz0YPRgNC60LBcIixcclxuICAgICAgICBjb2xvcjogXCLQsdC10LvRi9C5XCIsXHJcbiAgICAgICAgc2l6ZTogXCLRgdGA0LXQtNC90LjQuVwiLFxyXG4gICAgICAgIGZhdm9yaXRlOiBmYWxzZSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgbnVtOiBcIjU5XCIsXHJcbiAgICAgICAgbmFtZTogXCLQltC10LvRgtGL0Lkg0YjQsNGAINGBINC90LDQtNC/0LjRgdGM0Y5cIixcclxuICAgICAgICBjb3VudDogXCIxMFwiLFxyXG4gICAgICAgIHllYXI6IFwiMTk5MFwiLFxyXG4gICAgICAgIHNoYXBlOiBcItGI0LDRgFwiLFxyXG4gICAgICAgIGNvbG9yOiBcItC20LXQu9GC0YvQuVwiLFxyXG4gICAgICAgIHNpemU6IFwi0YHRgNC10LTQvdC40LlcIixcclxuICAgICAgICBmYXZvcml0ZTogZmFsc2UsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIG51bTogXCI2MFwiLFxyXG4gICAgICAgIG5hbWU6IFwi0KTQuNCz0YPRgNC60LAg0JPQvtC70YPQsdGMXCIsXHJcbiAgICAgICAgY291bnQ6IFwiMTJcIixcclxuICAgICAgICB5ZWFyOiBcIjE5NDBcIixcclxuICAgICAgICBzaGFwZTogXCLRhNC40LPRg9GA0LrQsFwiLFxyXG4gICAgICAgIGNvbG9yOiBcItCx0LXQu9GL0LlcIixcclxuICAgICAgICBzaXplOiBcItGB0YDQtdC00L3QuNC5XCIsXHJcbiAgICAgICAgZmF2b3JpdGU6IHRydWUsXHJcbiAgICB9LFxyXG5dO1xyXG5leHBvcnQgZGVmYXVsdCBkYXRhO1xyXG4iLCJ2YXIgQ2FyZENvbnRyb2xsZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBDYXJkQ29udHJvbGxlcihtb2RlbCwgdmlldykge1xyXG4gICAgICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcclxuICAgICAgICB0aGlzLnZpZXcgPSB2aWV3O1xyXG4gICAgfVxyXG4gICAgQ2FyZENvbnRyb2xsZXIucHJvdG90eXBlLnNob3dQb3BVcCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIGlmICh0aGlzLmlzUG9wdXBTaG93ZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmlzUG9wdXBTaG93ZWQgPSB0cnVlO1xyXG4gICAgICAgIHZhciBodG1sUG9wVXAgPSB0aGlzLnZpZXcuc2hvd1BvcFVwKCk7XHJcbiAgICAgICAgdmFyIHBvcFVwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgcG9wVXAuY2xhc3NOYW1lID0gJ3BvcFVwJztcclxuICAgICAgICBwb3BVcC5pbm5lckhUTUwgPSBodG1sUG9wVXA7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBjYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltkYXRhLWlkPVxcXCJcIi5jb25jYXQoX3RoaXMubW9kZWwuY2FyZC5pZCwgXCJcXFwiXVwiKSk7XHJcbiAgICAgICAgICAgIGNhcmQuYXBwZW5kKHBvcFVwKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5pc1BvcHVwU2hvd2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBjYXJkLnF1ZXJ5U2VsZWN0b3IoJy5wb3BVcCcpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gQ2FyZENvbnRyb2xsZXI7XHJcbn0oKSk7XHJcbmV4cG9ydCB7IENhcmRDb250cm9sbGVyIH07XHJcbiIsInZhciBDYXJkTW9kZWwgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBDYXJkTW9kZWwoY2FyZCkge1xyXG4gICAgICAgIGlmICghY2FyZC5pZCkge1xyXG4gICAgICAgICAgICBjYXJkLmlkID0gTWF0aC5yYW5kb20oKS50b1N0cmluZygxNikuc2xpY2UoMik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2FyZCA9IGNhcmQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gQ2FyZE1vZGVsO1xyXG59KCkpO1xyXG5leHBvcnQgeyBDYXJkTW9kZWwgfTtcclxuIiwidmFyIENhcmRWaWV3ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gQ2FyZFZpZXcoKSB7XHJcbiAgICB9XHJcbiAgICBDYXJkVmlldy5wcm90b3R5cGUuZ2V0VGVtcGxhdGUgPSBmdW5jdGlvbiAoY2FyZCkge1xyXG4gICAgICAgIHJldHVybiBcIiAgICBcXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJcIi5jb25jYXQoY2FyZC5pc1NlbGVjdGVkID8gJ3NlbGVjdGVkJyA6ICcnLCBcIiBjYXJkIFwiKS5jb25jYXQoY2FyZC5pc1Zpc2libGUgPyAnJyA6ICdoaWRlJywgXCIgXFxcIiBkYXRhLW51bT1cIikuY29uY2F0KGNhcmQubnVtLCBcIiBkYXRhLWlkPVwiKS5jb25jYXQoY2FyZC5pZCwgXCI+XFxuICAgXFxuICAgICAgICAgIDxoMiBjbGFzcz1cXFwiY2FyZC10aXRsZVxcXCI+XCIpLmNvbmNhdChjYXJkLm5hbWUsIFwiPC9oMj5cXG4gICAgICAgICAgPGltZyBjbGFzcz1cXFwiY2FyZC1pbWdcXFwiIHNyYz1cXFwiLi9hc3NldHMvdG95cy9cIikuY29uY2F0KGNhcmQubnVtLCBcIi5wbmdcXFwiIGFsdD1cXFwidG95XFxcIj5cXG4gICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY2FyZC1kZXNjcmlwdGlvblxcXCI+XFxuICAgICAgICAgICAgICA8cCBjbGFzcz1cXFwiY291bnRcXFwiPlxcdTA0MUFcXHUwNDNFXFx1MDQzQlxcdTA0MzhcXHUwNDQ3XFx1MDQzNVxcdTA0NDFcXHUwNDQyXFx1MDQzMlxcdTA0M0U6IDxzcGFuPlwiKS5jb25jYXQoY2FyZC5jb3VudCwgXCI8L3NwYW4+PC9wPlxcbiAgICAgICAgICAgICAgPHAgY2xhc3M9XFxcInllYXJcXFwiPlxcdTA0MTNcXHUwNDNFXFx1MDQzNCBcXHUwNDNGXFx1MDQzRVxcdTA0M0FcXHUwNDQzXFx1MDQzRlxcdTA0M0FcXHUwNDM4OiA8c3Bhbj5cIikuY29uY2F0KGNhcmQueWVhciwgXCI8L3NwYW4+PC9wPlxcbiAgICAgICAgICAgICAgPHAgY2xhc3M9XFxcInNoYXBlXFxcIj5cXHUwNDI0XFx1MDQzRVxcdTA0NDBcXHUwNDNDXFx1MDQzMDogPHNwYW4+XCIpLmNvbmNhdChjYXJkLnNoYXBlLCBcIjwvc3Bhbj48L3A+XFxuICAgICAgICAgICAgICA8cCBjbGFzcz1cXFwiY29sb3JcXFwiPlxcdTA0MjZcXHUwNDMyXFx1MDQzNVxcdTA0NDI6IDxzcGFuPlwiKS5jb25jYXQoY2FyZC5jb2xvciwgXCI8L3NwYW4+PC9wPlxcbiAgICAgICAgICAgICAgPHAgY2xhc3M9XFxcInNpemVcXFwiPlxcdTA0MjBcXHUwNDMwXFx1MDQzN1xcdTA0M0NcXHUwNDM1XFx1MDQ0MDogPHNwYW4+XCIpLmNvbmNhdChjYXJkLnNpemUsIFwiPC9zcGFuPjwvcD5cXG4gICAgICAgICAgICAgIDxwIGNsYXNzPVxcXCJmYXZvcml0ZVxcXCI+XFx1MDQxQlxcdTA0NEVcXHUwNDMxXFx1MDQzOFxcdTA0M0NcXHUwNDMwXFx1MDQ0RjogPHNwYW4+XCIpLmNvbmNhdChjYXJkLmZhdm9yaXRlID8gJ9C00LAnIDogJ9C90LXRgicsIFwiPC9zcGFuPjwvcD5cXG4gICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInJpYmJvblxcXCI+PC9kaXY+XFxuICAgICAgICA8L2Rpdj4gICAgICBcXG5cIik7XHJcbiAgICB9O1xyXG4gICAgQ2FyZFZpZXcucHJvdG90eXBlLnNob3dQb3BVcCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gXCIgXFxuICAgICAgPGRpdiBjbGFzcz1cXFwicG9wVXBfX2NvbnRlbnRcXFwiPlxcbiAgICAgICAgPHA+XFx1MDQxOFxcdTA0MzdcXHUwNDMyXFx1MDQzOFxcdTA0M0RcXHUwNDM4XFx1MDQ0MlxcdTA0MzgsIFxcdTA0M0NcXHUwNDNFXFx1MDQzNlxcdTA0M0RcXHUwNDNFIFxcdTA0MzJcXHUwNDRCXFx1MDQzMVxcdTA0NDBcXHUwNDMwXFx1MDQ0MlxcdTA0NEMgXFx1MDQzQ1xcdTA0MzBcXHUwNDNBXFx1MDQ0MVxcdTA0MzhcXHUwNDNDXFx1MDQ0M1xcdTA0M0MgMjAgXFx1MDQzOFxcdTA0MzNcXHUwNDQwXFx1MDQ0M1xcdTA0NDhcXHUwNDM1XFx1MDQzQSAhPC9wPlxcbiAgICA8L2Rpdj5cXG4gICBcIjtcclxuICAgIH07XHJcbiAgICByZXR1cm4gQ2FyZFZpZXc7XHJcbn0oKSk7XHJcbmV4cG9ydCB7IENhcmRWaWV3IH07XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgQXBwQ29udHJvbGxlciB9IGZyb20gJy4vY29tcG9uZW50cy9hcHAvYXBwLmNvbnRyb2xsZXInO1xyXG5pbXBvcnQgeyBBcHBNb2RlbCB9IGZyb20gJy4vY29tcG9uZW50cy9hcHAvYXBwLm1vZGVsJztcclxuaW1wb3J0IHsgQXBwVmlldyB9IGZyb20gJy4vY29tcG9uZW50cy9hcHAvYXBwLnZpZXcnO1xyXG52YXIgYXBwID0gbmV3IEFwcENvbnRyb2xsZXIobmV3IEFwcE1vZGVsKCksIG5ldyBBcHBWaWV3KCkpO1xyXG5hcHAucmVzdG9yZVBhZ2UoKTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9