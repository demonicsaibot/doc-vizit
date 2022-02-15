import Element from "../element.js"
import { header } from "../../script.js"
import { getData } from "../api/api.js"

class CardsContainer extends Element {
    constructor() {
        super()
        this.crenderСardBody()
    }

    crenderСardBody() {
        this.div = this.createElement("div", ["card-body"])
        document.querySelector(".main-container").prepend(this.div)
        const mainContainer = document.querySelector(".card-body")
        mainContainer.insertAdjacentHTML("afterbegin", '<div class="card__field"><ul class="card__list"></ul></div>')
    }

    async checkItemsOnPage() {
        await getData().then((data) => {
            header.renderAddVisitTitle(data)
        })
    }
}

const cardsContainer = new CardsContainer()
export { cardsContainer }