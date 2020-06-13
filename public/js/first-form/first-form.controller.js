import CustomElementsForm from '../utils/utils.js';

let utils = new CustomElementsForm();

export default class FirstFormController {
  constructor(model, view, validator) {
    this.model = model;
    this.view = view;
    this.validator = validator;
    this.init();
  }

  init() {
    fetch('first-form.html', {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Accept': 'application/json',
      },
    })
      .then(response => response.text())
      .then(data => {
        document.getElementById('first-form').innerHTML = data;
        this.initListeners();
        this.getCityOptions();
        this.initCustomElements();
      });
  }

  initCustomElements() {
    utils.initSelect(this.view.DOMElements.cityBlock[0]);
  }

  initListeners() {
    this.initMaskPhone();

    this.view.DOMElements.firstForm.addEventListener('input', (e) => {
      this.view.removeErrors(e.target);
    });

    this.view.DOMElements.cityBlock[0].getElementsByClassName('form-control')[0]
      .addEventListener('click', (e) => {
        this.view.removeErrors(e.target);
      });
  }

  validateForm(fields) {
    this.removeErrors(fields);
    let errors = this.validator.validationForm(fields);

    if (Object.keys(errors).length) {
      this.view.showErrors(errors);

      return false;
    }

    return true;
  }

  removeErrors(fields) {
    for (let i = 0; i < fields.length; i++) {
      this.view.removeErrors(fields[i]);
    }
  }

  initMaskPhone() {
    utils.initMaskPhone('#phone');
  }

  getCityOptions() {
    this.model.getCityList().then((cities) => {
        this.view.renderCityOptions(cities);
      },
    );
  }

}
