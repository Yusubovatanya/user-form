import CustomElementsForm from '../utils/utils.js';

let utils = new CustomElementsForm();

export default class ThirdFormController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.init();
  }

  init() {
    fetch('third-form.html', {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Accept': 'application/json',
      },
    })
      .then(response => response.text())
      .then(data => {
        this.view.DOMElements.thirdForm.innerHTML = data;
        this.initCustomElements();
        this.initListeners();
      });
  }

  initCustomElements() {
    utils.initSelect(document.getElementsByClassName('food')[0]);

    const id = 1;
    this.initEducationDatePicker(id);
    this.initExperienceDatePicker(id);
  }

  initListeners() {
    this.view.DOMElements.addEducationBtn[0].addEventListener('click', (event) => {
      event.stopPropagation();
      this.addEducation();
    });

    this.view.DOMElements.addExperienceBtn[0].addEventListener('click', (event) => {
      event.stopPropagation();
      this.addExperience();
    });
  }

  addExperience() {
    const id = this.view.addExperienceForm();
    this.initExperienceDatePicker(id);
  }

  addEducation() {
    const id = this.view.addEducationForm();
    this.initEducationDatePicker(id);
  }

  initExperienceDatePicker(id) {
    const startSelector = `#start-period-btn-${id}`;
    const startValueSelector = `#start-period-${id}`;
    const hideStartSelector = `#start-period-btn-${id} .date-placeholder`;

    utils.initDatePicker(startSelector, startValueSelector, hideStartSelector);

    const endSelector = `#end-period-btn-${id}`;
    const endValueSelector = `#end-period-${id}`;
    const hideEndSelector = `#end-period-btn-${id} .date-placeholder`;

    utils.initDatePicker(endSelector, endValueSelector, hideEndSelector);
  }

  initEducationDatePicker(id) {
    const startSelector = `#start-date-btn-${id}`;
    const startValueSelector = `#start-date-${id}`;
    const hideStartSelector = `#start-date-btn-${id} .date-placeholder`;

    utils.initDatePicker(startSelector, startValueSelector, hideStartSelector);

    const endSelector = `#end-date-btn-${id}`;
    const endValueSelector = `#end-date-${id}`;
    const hideEndSelector = `#end-date-btn-${id} .date-placeholder`;

    utils.initDatePicker(endSelector, endValueSelector, hideEndSelector);
  }
}
