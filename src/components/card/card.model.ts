export interface ICard {
  num: string
  name: string
  count: string
  year: string
  shape: string
  color: string
  size: string
  favorite: boolean
  id?: string
  isVisible?: boolean
  isSelected?: boolean
}

export class CardModel {
  card: ICard

  constructor(card: ICard) {
    if (!card.id) {
      card.id = Math.random().toString(16).slice(2)
    }

    this.card = card
  }
}
