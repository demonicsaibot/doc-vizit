import Element from './element.js';
import { header } from '../script.js';
class Filter extends Element{
 constructor(){
  super()
  this.render()
  header.renderFilter()
 }
 renderInput(){
    this.filter.insertAdjacentHTML('afterbegin', `
      <input type="text" class="form-control filter-item" placeholder="Enter type to search visit" aria-label="Username" aria-describedby="basic-addon1">
  `)
 }
 renderIsDoneSelect() {
    this.filter.insertAdjacentHTML('beforeend', `
      <select class="form-select filter-select filter-done " aria-label="Default select example">
        <option selected>All</option>
        <option value="open">Open</option>
        <option value="done">Done</option>
      </select>
    `)
  }
  renderPrioritySelect() {
    this.filter.insertAdjacentHTML('beforeend', `
      <select class="form-select filter-select filter-priority" aria-label="Default select example">
        <option selected>All</option>
        <option value="high">High</option>
        <option value="normal">Normal</option>
        <option value="low">Low</option>
      </select>
    `)
  }
  renderSearchButton() {
    this.filter.insertAdjacentHTML('beforeend', `
      <button class="btn btn-primary search-btn" type="submit">Search</button>
    `)
  }
  render() {
    this.filter = this.createElement('form', ['filter']);
    document.querySelector('.main-container').prepend(this.filter);
    this.renderInput();
    this.renderIsDoneSelect();
    this.renderPrioritySelect();
    this.renderSearchButton();

  }
}
export default Filter