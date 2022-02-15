import Element from "./element.js"
import LoginForm from "./modal/loginForm.js"
import VisitModal from "./modal/visitModal.js"
import Card from "./card/card.js"
import { getData } from "./api/api.js"

class Header extends Element {
  constructor() {
    super()
    this.loginBtnHendler = this.loginBtnHendler.bind(this)
    this.logoutPage = this.logoutPage.bind(this)
    this.renderHeader()
    this.render()
  }

  renderHeader() {
    this.header = this.createElement("header", ["card-header"])
    this.header.insertAdjacentHTML(
      "afterbegin",
      `<a href="https://www.medcentre.com.ua/clinics/">
                <img class="logo" src="./img/logo.png" alt="logo" />
            </a>`
    )
    const btnWrapper = this.createElement("div", ["btn-box"])
    this.createVisitBtn = this.createElement("button", ["btn", "btn-outline-info", "d-none"], "Create visit") //, "d-none"
    this.loginBtn = this.createElement("button", ["btn", "btn-with-img", "btn-outline-primary"], "Login")
    this.header.append(btnWrapper)
    btnWrapper.append(this.loginBtn, this.createVisitBtn)
    document.querySelector("#body").prepend(this.header)
  }

  render() {
    if (!localStorage.getItem("isLogged") || localStorage.getItem("isLogged") === "false") {
      this.loginBtn.addEventListener("click", this.loginBtnHendler)
    } else if (localStorage.getItem("isLogged")) {
      this.renderVisitPage()
      this.renderPageAfterLogin()
    }
  }

  loginBtnHendler(ev) {
    ev.preventDefault()
    this.LoginForm = new LoginForm("Fill in the login form")
    this.LoginForm.show()
    this.submitLoginBtn = document.querySelector("#login-btn")
    this.submitLoginBtn.addEventListener("click", () => {
      this.mailValue = document.querySelector("#inputEmail").value
      this.passwordValue = document.querySelector("#inputPassword").value
      this.setUserName(this.mailValue)

      // Login: pasha@ukr.net   password: 1

      if (this.mailValue === "pasha@ukr.net" && this.passwordValue === "1") {
        this.renderVisitPage()
        this.LoginForm.hide()
        this.renderPageAfterLogin()
      }
    })
  }

  setUserName(value) {
    let userName = value.split("@")
    userName = userName[0].toString()
    localStorage.setItem("user", userName)
  }

  getUserName() {
    let user = localStorage.getItem("user")
    return (this.userName = user[0].toUpperCase() + user.slice(1))
  }
  renderVisitPage() {
    this.getUserName()
    this.loginBtn.innerHTML = `${this.userName}
                 <svg id="logout-icon" xmlns="http://www.w3.org/2000/svg" >
                	<path d="M3 3h8V1H3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8v-2H3z" />
                	<path d="M19 10l-6-5v4H5v2h8v4l6-5z" />
                 </svg>`
    this.createVisitBtn.classList.remove("d-none")

    this.createVisitBtn.addEventListener("click", () => {
      new VisitModal("Create visit").show()
    })

    this.loginBtn.removeEventListener("click", this.loginBtnHendler)
    this.loginBtn.addEventListener("click", this.logoutPage)
    localStorage.setItem("isLogged", "true")
    localStorage.setItem("token", "fa8300f4-8841-4a0a-9692-1e323f2abb73")
  }

  logoutPage() {
    this.header.remove()
    this.renderHeader()
    this.loginBtn.removeEventListener("click", this.logoutPage)
    localStorage.setItem("isLogged", "false")
    document.querySelector(".card__list").innerHTML = ""
    if (this.title) this.title.remove()
    this.render()
  }

  renderAddVisitTitle(items) {
    const cardField = document.querySelector(".card__field")
    if (!items.length > 0) {
      this.title = this.createElement("h2", ["visit__title"], "Create your first visit")
      cardField.append(this.title)
    } else {
      if (this.title) this.title.remove()
    }
  }

  renderPageAfterLogin() {
    getData().then((data) => {
      this.renderAddVisitTitle(data)
      data.map((item) => {
        new Card().renderCardWithCheck(item)
      })
    })
  }
  renderFilter() {
    const input = document.querySelector('.filter-item');
    const searchBtn = document.querySelector('.search-btn');
    const isDoneSelectBtn = document.querySelector('.filter-done');
    const priorityBtn = document.querySelector('.filter-priority');
    searchBtn.addEventListener('click', event => {
      event.preventDefault();
      const filteredItems = document.querySelectorAll('.card__item');
      filteredItems.forEach(item => {
        item.closest('.card__item').classList.remove('d-none');
        if (item.textContent.toLowerCase().indexOf(input.value.toLowerCase()) === -1) {
          item.closest('.card__item').classList.add('d-none');
        }
        if (isDoneSelectBtn.value === 'open') {
          if (item.classList.contains('card__item--done')) {
            item.closest('.card__item').classList.add('d-none');
          }
        }
        if (isDoneSelectBtn.value === 'done') {
          if (!item.classList.contains('card__item--done')) {
            item.closest('.card__item').classList.add('d-none');
          }
        }
        if (priorityBtn.value === 'high') {
          if (!item.classList.contains('card__item--urgent')) {
            item.closest('.card__item').classList.add('d-none');
          }
        }
        if (priorityBtn.value === 'normal') {
          if (!item.classList.contains('card__item--priority')) {
            item.closest('.card__item').classList.add('d-none');
          }
        }
        if (priorityBtn.value === 'low') {
          if (!item.classList.contains('card__item--ordinary')) {
            item.closest('.card__item').classList.add('d-none');
          }
        }
      })
    })
  }
}

export default Header
