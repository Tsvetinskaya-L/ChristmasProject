import { IState } from './app.model'

export class AppView {
  getFilters1Template(state: IState): string {
    return `
    <h2 class="filter-title">Фильтры по значению</h2>
    <div class="shape">Форма:
        <button class="${state['filter.shape.ball'] ? 'active' : ''}"  data-filter="ball" data-type="shape"></button>
        <button class="${
          state['filter.shape.kolokolchik'] ? 'active' : ''
        }" data-filter="kolokolchik" data-type="shape"></button>
        <button class="${state['filter.shape.shisha'] ? 'active' : ''}" data-filter="shisha" data-type="shape"></button>
        <button class="${
          state['filter.shape.snezinka'] ? 'active' : ''
        }"data-filter="snezinka" data-type="shape"></button>
        <button class="${
          state['filter.shape.figurka'] ? 'active' : ''
        }"data-filter="figurka" data-type="shape"></button>
    </div>
    <div class="color">Цвет:
        <button class="${state['filter.color.белый'] ? 'active' : ''}" data-filter="белый" data-type="color"></button>
        <button  class="${
          state['filter.color.желтый'] ? 'active' : ''
        }" data-filter="желтый" data-type="color"></button>
        <button  class="${
          state['filter.color.красный'] ? 'active' : ''
        }" data-filter="красный" data-type="color"></button>
        <button  class="${state['filter.color.синий'] ? 'active' : ''}" data-filter="синий" data-type="color"></button>
        <button  class="${
          state['filter.color.зелёный'] ? 'active' : ''
        }" data-filter="зелёный" data-type="color"></button>
    </div>
    <div class="size">Размер:
        <button class="${state['filter.size.большой'] ? 'active' : ''}" data-filter="большой" data-type="size"></button>
        <button class="${state['filter.size.средний'] ? 'active' : ''}" data-filter="средний" data-type="size"></button>
        <button class="${state['filter.size.малый'] ? 'active' : ''}" data-filter="малый" data-type="size"></button>
    </div>
    <div class="favorite-container">Только любимые:
        <div class="form-group"> 
        <input type="checkbox" ${state['filter.favorite'] ? 'checked' : ''}
            class="favorite-input"
            id="checkbox" 
            />
        <label for="checkbox" data-checkbox="true"
            class="favorite-input-label"></label>
        </div>
    </div>
      `
  }

  getFilters2Template(state: IState): string {
    return `<div class="range">
  <h2 class="filter-title">Фильтры по диапазону</h2>
  <div class="count">
      <span class="control-span">Количество экземпляров:</span>
      <div class="count-slider-container">
          <div>От</div>
            <input id="filter-from" data-filter-from="filter-from" type="range" min="0" max="12" value=${
              state['filter.from']
            }>
          <div id="from-value">${state['filter.from'] ? state['filter.from'] : ''}</div>
          <div>До</div>
          <input id="filter-to" data-filter-to="filter-to" type="range" min="0" max="12" value=${state['filter.to']}>
        <div id="to-value">${state['filter.to'] ? state['filter.to'] : ''}</div>

      </div>
  </div>
  <div class="year">
      <span class="control-span">Год приобретения:</span>
      <div class="year-slider-container">
      <div class="slider-output">От</div>
        <input id="filter-fromYear" data-filter-from-Year="filter-fromYear" type="range" min="1940" max="2021" value=${
          state['filter.fromYear']
        }>
      <div id="from-value-Year">${state['filter.fromYear'] ? state['filter.fromYear'] : ''}</div>

  <div class="slider-output">До</div>
  <input id="filter-toYear" data-filter-to-Year="filter-toYear" type="range" min="1940" max="2021" value=${
    state['filter.toYear']
  }>
  <div id="to-value-Year">${state['filter.toYear'] ? state['filter.toYear'] : ''}</div>


      </div>
  </div>
</div>`
  }

  getFilters3Temlate(): string {
    return `<div class="sort">
  <h2 class="filter-title">Сортировка</h2>
  <select class="sort-select">
      <option selected>выберите</option>
      <option value="sort-name-max">По названию от «А» до «Я»</option>
      <option value="sort-name-min">По названию от «Я» до «А»</option>
      <option value="sort-year-max">По году их приобретения «↑» </option>
      <option value="sort-year-min">По году их приобретения «↓» </option>

  </select>
  <button class="reset">Сброс фильтров</button>
</div>`
  }

  getTreePageTemplate(): string {
    return `<div></div>`
  }

  getStartPageTemaplate(): string {
    return `<section id="startPage" class="page start-page">
                <div class="ball ball1"></div>
                <div class="ball ball2"></div>
                <h1 class="start-page-title">Новогодняя игра<span>«Наряди ёлку»</span></h1>
                <button class="switch-start-page" data-page="mainPage">Начать</button>
            </section>`
  }

  getToysPageTemplate(): string {
    return ` 
      <section id="toysPage" class="page toys-page ">
            <div class="toys-page__filter">
              <div class="filters filter1-container">
                <div class=""></div>
            </div>
            <div class="filter2-container"></div>
            <div class="filter3-container"></div>
            

     

     
 </div>
 <div class="toys-page__cards-block">

 </div>
</section>`
  }
}
