import { CardModel } from './card.model'
import { CardView } from './card.view'

export class CardController {
  model: CardModel
  view: CardView
  isPopupShowed: boolean

  constructor(model: CardModel, view: CardView) {
    this.model = model
    this.view = view
  }

  showPopUp(): void {
    if (this.isPopupShowed) {
      return
    }

    this.isPopupShowed = true
    const htmlPopUp = this.view.showPopUp()
    const popUp = document.createElement('div')
    popUp.className = 'popUp'
    popUp.innerHTML = htmlPopUp

    setTimeout(() => {
      const card = document.querySelector(`[data-id="${this.model.card.id}"]`)
      card.append(popUp)

      setTimeout(() => {
        this.isPopupShowed = false
        card.querySelector('.popUp').remove()
      }, 1000)
    })
  }
}
