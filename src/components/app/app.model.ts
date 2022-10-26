import { CardModel, ICard } from '../card/card.model'
import data from './data'
import { CardController } from '../card/card.controller'
import { CardView } from '../card/card.view'

export type IState = {
  [name: string]: boolean | string | ICard[]
  selectedCards?: string
  cards?: ICard[]
}

export class AppModel {
  state: IState
  cards: CardController[]

  constructor() {
    this.state = {
      selectedCards: '[]',
      cards: []
    }
    this.cards = []
    data.forEach((i) => {
      const card = new CardController(new CardModel(i as ICard), new CardView())

      this.cards.push(card)
    })
  }

  setState(key: string, newValue: string | boolean) {
    this.state[key] = newValue
    this.saveState()
  }

  saveState(): void {
    this.state.cards = this.cards.map((i) => i.model.card)

    localStorage.setItem('state', JSON.stringify(this.state))
  }

  restoreState(): void {
    const state = JSON.parse(localStorage.getItem('state')) as IState
    if (state) {
      this.state = state
      if (state.cards.length) {
        this.cards = []
        state.cards.forEach((i) => {
          const card = new CardController(new CardModel(i as ICard), new CardView())

          this.cards.push(card)
        })
      }
    }
  }

  resetState() {
    this.state = {
      selectedCards: '[]',
      cards: []
    }
    this.cards.forEach((i) => (i.model.card.isSelected = false))
  }

  addCardToSelected(card: CardController): void {
    const selectedCards = JSON.parse(this.state.selectedCards)
    selectedCards.push(card.model.card)

    this.state.selectedCards = JSON.stringify(selectedCards)
    this.saveState()
  }

  removeCardFromSelected(card: CardController): void {
    const selectedCards = JSON.parse(this.state.selectedCards)
    this.state.selectedCards = JSON.stringify(selectedCards.filter((i: ICard) => i.id !== card.model.card.id))

    this.saveState()
  }
}
