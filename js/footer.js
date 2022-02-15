import Element from "./element.js"

class Footer extends Element {
  constructor() {
    super()
    this.renderFooter()
  }

  renderFooter() {
    this.footer = this.createElement(
      "footer",
      ["card-footer", "text-muted"],
      '© Medical Portal "Medical Center" 2011-2022. All rights reserved.'
    )
    document.querySelector(".main-container").after(this.footer)
  }
}
export default Footer
