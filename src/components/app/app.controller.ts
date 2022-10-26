import { ICard } from '../card/card.model'
import { AppModel } from './app.model'
import { AppView } from './app.view'

export class AppController {
  model: AppModel
  view: AppView
  container: HTMLElement

  constructor(model: AppModel, view: AppView) {
    this.model = model
    this.view = view

    this.container = document.querySelector('main')
  }

  restorePage(): void {
    this.model.restoreState()

    const page = this.model.state.currentPage
    if (page === 'start') {
      this.showStartPage()
    } else if (page === 'toys') {
      this.showToysPage()
    } else if (page === 'tree') {
      this.showTreePage()
    } else {
      this.showStartPage()
    }
  }

  showStartPage(): void {
    this.container.innerHTML = this.view.getStartPageTemaplate()
    this.setupStartPageHendlers()
    this.model.setState('currentPage', 'start')
  }

  showToysPage(): void {
    this.model.setState('currentPage', 'toys')
    this.container.innerHTML = this.view.getToysPageTemplate()

    this.container.querySelector('.filter1-container').innerHTML = this.view.getFilters1Template(this.model.state)
    this.container.querySelector('.filter2-container').innerHTML = this.view.getFilters2Template(this.model.state)
    this.container.querySelector('.filter3-container').innerHTML = this.view.getFilters3Temlate()

    this.setupToysPageHandlers()

    if (this.model.state.sort) {
      this.applySort(this.model.state.sort as string)
    }

    this.renderCards()
  }

  showTreePage(): void {
    this.model.setState('currentPage', 'tree')
  }

  setupStartPageHendlers(): void {
    const btnStartPage = document.querySelector('.switch-start-page')
    btnStartPage.addEventListener('click', () => this.showToysPage())
  }

  setupToysPageHandlers(): void {
    this.updateCounter()
    const allFiltersContainer = document.querySelector('#toysPage')
    const selectSort = document.querySelector('.sort-select')

    allFiltersContainer.addEventListener(
      'click',
      (event) => {
        if ((event.target as HTMLElement).classList.contains('reset')) {
          this.model.resetState()
          this.model.saveState()
          ;(selectSort as HTMLSelectElement).selectedIndex = 0
          this.updateCounter()
        }

        const type = (event.target as HTMLElement).dataset.type
        const isCheckbox = (event.target as HTMLInputElement).dataset.checkbox
        const isFilterFrom = (event.target as HTMLInputElement).dataset.filterFrom
        const isFilterTo = (event.target as HTMLInputElement).dataset.filterTo
        const isFilterFromYear = (event.target as HTMLInputElement).dataset.filterFromYear
        const isFilterToYear = (event.target as HTMLInputElement).dataset.filterToYear
        const cardClick = (event.target as HTMLElement).closest('.card')

        if (type) {
          const currentState = (event.target as HTMLElement).classList.contains('active')

          this.model.setState('filter.' + type + '.' + (event.target as HTMLElement).dataset.filter, !currentState)
        } else if (isCheckbox) {
          const filterChekboxFavorite = document.querySelector('.favorite-input')
          this.model.setState('filter.favorite', !(filterChekboxFavorite as HTMLInputElement).checked)
        } else if (isFilterFrom) {
          this.model.setState('filter.from', (event.target as HTMLInputElement).value)
        } else if (isFilterTo) {
          this.model.setState('filter.to', (event.target as HTMLInputElement).value)
        } else if (isFilterFromYear) {
          this.model.setState('filter.fromYear', (event.target as HTMLInputElement).value)
        } else if (isFilterToYear) {
          this.model.setState('filter.toYear', (event.target as HTMLInputElement).value)
        } else if (cardClick) {
          const isSelected = cardClick.classList.contains('selected')
          const targetCard = this.model.cards.find((c) => c.model.card.id === (cardClick as HTMLElement).dataset.id)
          const selectedCardsLength = JSON.parse(this.model.state['selectedCards']).length

          if (!isSelected && selectedCardsLength === 20) {
            targetCard.showPopUp()
          } else {
            targetCard.model.card.isSelected = !isSelected

            isSelected ? this.model.removeCardFromSelected(targetCard) : this.model.addCardToSelected(targetCard)

            this.updateCounter()
          }
        }

        this.container.querySelector('.filter1-container').innerHTML = this.view.getFilters1Template(this.model.state)
        this.container.querySelector('.filter2-container').innerHTML = this.view.getFilters2Template(this.model.state)
        this.setupToysPageHandlers()
        this.renderCards()
      },
      { once: true }
    )

    selectSort.addEventListener('change', (event) => {
      const value = (event.target as HTMLSelectElement).value
      this.applySort(value)
      this.model.setState('sort', value)
      this.renderCards()
    })
  }

  applySort(value: string): void {
    const selectSort = document.querySelector('.sort-select') as HTMLSelectElement
    selectSort.value = value

    if (value === 'sort-name-max') {
      this.sortCardNameMax()
    } else if (value === 'sort-name-min') {
      this.sortCardNameMin()
    } else if (value === 'sort-year-min') {
      this.sortCardYearMin()
    } else if (value === 'sort-year-max') {
      this.sortCardYearMax()
    }
  }

  sortCardNameMax(): void {
    this.model.cards = this.model.cards.sort((a, b) => {
      const nameA = a.model.card.name.toLowerCase()
      const nameB = b.model.card.name.toLowerCase()

      if (nameA < nameB) {
        return -1
      }
      if (nameA > nameB) {
        return 1
      }
      return 0
    })
  }

  sortCardNameMin(): void {
    this.model.cards = this.model.cards.sort((a, b) => {
      const nameA = a.model.card.name.toLowerCase()
      const nameB = b.model.card.name.toLowerCase()

      if (nameA > nameB) {
        return -1
      }
      if (nameA < nameB) {
        return 1
      }
      return 0
    })
  }

  sortCardYearMin(): void {
    this.model.cards = this.model.cards.sort((a, b) => Number(b.model.card.year) - Number(a.model.card.year))
  }

  sortCardYearMax(): void {
    this.model.cards = this.model.cards.sort((a, b) => Number(a.model.card.year) - Number(b.model.card.year))
  }

  renderCards(): void {
    const container = document.querySelector('.toys-page__cards-block')
    const stateKeys = Object.keys(this.model.state).filter((key) => /^filter/.test(key))
    const isAllfiltersUnselected = stateKeys.every((key) => {
      return !this.model.state[key]
    })

    let cardsTemplate = ''

    this.model.cards.forEach((i) => {
      const card = i.model.card

      card.isVisible = isAllfiltersUnselected || this.isCardVisible(card)

      cardsTemplate += i.view.getTemplate(card)
    })

    container.innerHTML = cardsTemplate
  }

  isCardVisible(card: ICard): boolean {
    const matchWithShape = this.matchWithShapeFilter(card)
    const matchWithSize = this.matchWithSize(card)
    const matchWhisColor = this.matchWithColor(card)
    const matchWithFavorite = this.matchWithFavorite(card)
    const matchWithFrom = this.matchWithFrom(card)
    const matchWithTo = this.matchWithTo(card)
    const matchWithFromYear = this.matchWithFromYear(card)
    const matchWithToYear = this.matchWithToYear(card)

    return (
      matchWithShape &&
      matchWithSize &&
      matchWhisColor &&
      matchWithFavorite &&
      matchWithFrom &&
      matchWithTo &&
      matchWithFromYear &&
      matchWithToYear
    )
  }

  matchWithFromYear(card: ICard): boolean {
    if (!this.model.state['filter.fromYear']) {
      return true
    }

    return Number(card.year) >= Number(this.model.state['filter.fromYear'])
  }

  matchWithToYear(card: ICard): boolean {
    if (!this.model.state['filter.toYear']) {
      return true
    }

    return Number(card.year) <= Number(this.model.state['filter.toYear'])
  }

  matchWithFrom(card: ICard): boolean {
    if (!this.model.state['filter.from']) {
      return true
    }

    return Number(card.count) >= Number(this.model.state['filter.from'])
  }

  matchWithTo(card: ICard): boolean {
    if (!this.model.state['filter.to']) {
      return true
    }

    return Number(card.count) <= Number(this.model.state['filter.to'])
  }

  matchWithShapeFilter(card: ICard): boolean {
    if (
      !this.model.state['filter.shape.ball'] &&
      !this.model.state['filter.shape.shisha'] &&
      !this.model.state['filter.shape.figurka'] &&
      !this.model.state['filter.shape.snezinka'] &&
      !this.model.state['filter.shape.kolokolchik']
    ) {
      return true
    }

    switch (card.shape) {
      case 'шар':
        return !!this.model.state['filter.shape.ball']
      case 'шишка':
        return !!this.model.state['filter.shape.shisha']
      case 'фигурка':
        return !!this.model.state['filter.shape.figurka']
      case 'снежинка':
        return !!this.model.state['filter.shape.snezinka']
      case 'колокольчик':
        return !!this.model.state['filter.shape.kolokolchik']
      default:
        return true
    }
  }

  matchWithSize(card: ICard): boolean {
    if (
      !this.model.state['filter.size.большой'] &&
      !this.model.state['filter.size.средний'] &&
      !this.model.state['filter.size.малый']
    ) {
      return true
    }

    switch (card.size) {
      case 'большой':
        return !!this.model.state['filter.size.большой']
      case 'средний':
        return !!this.model.state['filter.size.средний']
      case 'малый':
        return !!this.model.state['filter.size.малый']
      default:
        return true
    }
  }

  matchWithColor(card: ICard): boolean {
    if (
      !this.model.state['filter.color.белый'] &&
      !this.model.state['filter.color.желтый'] &&
      !this.model.state['filter.color.красный'] &&
      !this.model.state['filter.color.синий'] &&
      !this.model.state['filter.color.зелёный']
    ) {
      return true
    }

    switch (card.color) {
      case 'белый':
        return !!this.model.state['filter.color.белый']
      case 'желтый':
        return !!this.model.state['filter.color.желтый']
      case 'красный':
        return !!this.model.state['filter.color.красный']
      case 'синий':
        return !!this.model.state['filter.color.синий']
      case 'зелёный':
        return !!this.model.state['filter.color.зелёный']

      default:
        return true
    }
  }

  matchWithFavorite(card: ICard): boolean {
    if (!this.model.state['filter.favorite']) {
      return true
    }

    return card.favorite
  }

  updateCounter(): void {
    const count = JSON.parse(this.model.state.selectedCards)

    const selectToysSpan = document.querySelector('.selectToys-span')

    selectToysSpan.innerHTML = `${count.length}`
  }
}
