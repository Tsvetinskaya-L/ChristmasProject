import { ICard } from './card.model'

export class CardView {
  getTemplate(card: ICard) {
    return `    
      <div class="${card.isSelected ? 'selected' : ''} card ${card.isVisible ? '' : 'hide'} " data-num=${
      card.num
    } data-id=${card.id}>
   
          <h2 class="card-title">${card.name}</h2>
          <img class="card-img" src="./assets/toys/${card.num}.png" alt="toy">
          <div class="card-description">
              <p class="count">Количество: <span>${card.count}</span></p>
              <p class="year">Год покупки: <span>${card.year}</span></p>
              <p class="shape">Форма: <span>${card.shape}</span></p>
              <p class="color">Цвет: <span>${card.color}</span></p>
              <p class="size">Размер: <span>${card.size}</span></p>
              <p class="favorite">Любимая: <span>${card.favorite ? 'да' : 'нет'}</span></p>
          </div>
          <div class="ribbon"></div>
        </div>      
`
  }

  showPopUp() {
    return ` 
      <div class="popUp__content">
        <p>Извинити, можно выбрать максимум 20 игрушек !</p>
    </div>
   `
  }
}
