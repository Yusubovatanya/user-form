import CustomElementsForm from '../utils/utils.js';

let utils = new CustomElementsForm();

export default class FirstForm {
  constructor(validator) {
    this.validator = validator;
    this.DOMElements = {
      firstForm: document.getElementById('first-form'),
      cityBlock: document.getElementsByClassName('city-block'),
      selectCityList: document.getElementsByClassName('select-city'),
    };
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
    utils.initSelect(this.DOMElements.cityBlock[0]);
  }

  initListeners() {
    this.initMaskPhone();

    this.DOMElements.firstForm.addEventListener('input', (e) => {
      this.removeErrorField(e.target);
    });

    this.DOMElements.cityBlock[0].getElementsByClassName('form-control')[0]
      .addEventListener('click', (e) => {
        this.removeErrorField(e.target);
      });
  }

  validateForm(fields) {
    this.removeErrors(fields);
    let errors = this.validator.validationForm(fields);

    if (Object.keys(errors).length) {
      this.showErrors(errors);

      return false;
    }

    return true;
  }

  removeErrors(fields) {
    for (let i = 0; i < fields.length; i++) {
      this.removeErrorField(fields[i]);
    }
  }

  initMaskPhone() {
    utils.initMaskPhone('#phone');
  }

  getCityOptions() {
    this.getCityList().then((cities) => {
        this.renderCityOptions(cities);
      },
    );
  }

  getCityList() {
    return fetch('/city')
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  renderCityOptions(cities) {
    let options = '';

    cities.forEach(city => {
      options += `<li data-value="${city.value}">${city.name}</li>`;
    });

    this.DOMElements.selectCityList[0].innerHTML = options;
  }

  removeErrorField(field) {
    field.classList.remove('warn');
    if (field.nextElementSibling && field.nextElementSibling.classList.contains('error-msg')) {
      field.nextElementSibling.remove();
    }
  }

  showErrors(errors) {
    const fields = this.DOMElements.firstForm.getElementsByClassName('form-control');

    for (let i = 0; i < fields.length; i++) {
      const fieldName = fields[i].getAttribute('name');

      if (errors.hasOwnProperty(fieldName)) {
        fields[i].classList.add('warn');

        let elem = document.createElement('p');
        elem.setAttribute('class', 'error-msg');
        elem.innerHTML = `${errors[fieldName]}`;
        fields[i].parentElement.insertBefore(elem, fields[i]);
        fields[i].parentElement.insertBefore(elem, fields[i].nextSibling);
      }
    }
  }
}
