class Element {
    constructor() {}
    createElement(elementName, classNames = [], text) {
        const element = document.createElement(elementName)
        if (text) {
            element.textContent = text
        }
        element.classList.add(...classNames)
        return element
    }

    appendAttribute(el, name, value) {
        el.setAttribute(name, value)
        return el
    }
}

export default Element