import Modal from "./modal.js"
import { VisitDentist, VisitCardiologist, VisitTherapist } from "./visitComponents.js"
import Card from "../card/card.js"
import { addVisit, updateVisit } from "../api/api.js"
class VisitModal extends Modal {
  constructor(title) {
    super(title)
    this.visit = null
    this.onSelectChange = this.onSelectChange.bind(this)
    this.onCreateBtnClick = this.onCreateBtnClick.bind(this)
  }
  renderModalBody() {
    this.modalBlock.classList.add("visit-form") //========== visit-select
    const content = `		  
				<div class="mb-3">
					<select class="form-select form-select-lg col-sm-12 visit-select">
						<option selected>Doctor's choice</option>
						<option value="Dentist">Dentist</option>
						<option value="Cardiologist">Cardiologist</option>
						<option value="Therapist">Therapist</option>
					</select>
				</div>`
    return content
  }

  renderBtn() {
    const buttonHTML = `
     		<button id="card-create-btn" type="submit" class="btn btn-primary 
			  btn-sm btn-block d-none"></button>`
    return buttonHTML
  }

  show() {
    super.show()

    this.addListeners()
  }

  hide() {
    super.hide()
    this.removeListeners()
  }

  addListeners() {
    this.selector = document.querySelector(".visit-select")
    this.selector.addEventListener("change", this.onSelectChange)

    this.btn = document.querySelector("#card-create-btn")
    this.btn.addEventListener("click", this.onCreateBtnClick)
  }

  removeListeners() {
    this.selector.removeEventListener("change", this.onSelectChange)
  }

  addVisitForm(value = "Add new card") {
    document.querySelector(".dialog-width").style.minWidth = "734px"
    this.selector.insertAdjacentHTML("afterend", this.visit.renderFields())
    this.form = document.querySelector("#visit-form")
    this.btn.classList.remove("d-none")
    this.btn.textContent = value
  }

  removeVisitForm() {
    if (this.form) {
      this.form.remove()
    }
  }

  selectVisitForm(value) {
    switch (value) {
      case "Dentist":
        this.visit = new VisitDentist()
        break

      case "Cardiologist":
        this.visit = new VisitCardiologist()
        break

      case "Therapist":
        this.visit = new VisitTherapist()
        break

      default:
        break
    }
  }

  onSelectChange() {
    this.removeVisitForm()
    this.selectVisitForm(this.selector.value)
    this.addVisitForm()
    this.modalBlock.classList.add("visit-form--selected")
  }

  async onCreateBtnClick(e) {
    e.preventDefault()
    this.options = this.visit.getValue()
    this.options["Status:"] = "open"
    if (Object.values(this.options).some((el) => el === "")) return

    if (this.btn.textContent === "Add new card") {
      this.options["Doctor:"] = this.selector.value
      const result = await addVisit(this.options)
      this.card = new Card()
      await this.card.renderCard(result)
    }

    if (this.btn.textContent === "Save") {
      this.options["Doctor:"] = this.doctor
      const result = await updateVisit(this.options, this.id)
      const card = this.cardInstance
      await card.removeCardInfo(this.currentCard)
      card.renderCardInfo(result, true)
    }
    this.btn.removeEventListener("click", this.onCreateBtnClick)
    this.hide()
  }

  editCard(obj, currentCardInfo, cardInstance) {
    this.selectVisitForm(obj["Doctor:"])
    this.show()
    this.addVisitForm("Save")
    this.modalBlock.classList.add("visit-modal--selected")
    this.selector.remove()
    this.visit.setValue(obj)
    this.id = obj.id
    this.doctor = obj["Doctor:"]
    this.cardInstance = cardInstance
    this.currentCard = currentCardInfo
  }
}

export default VisitModal
