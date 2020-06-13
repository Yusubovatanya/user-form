export default class FirstFormView {
  constructor() {
    this.DOMElements = {
      firstForm: document.getElementById('first-form'),
      cityBlock: document.getElementsByClassName('city-block'),
      selectCityList: document.getElementsByClassName('select-city'),
    };
  }

  renderCityOptions(cities) {
    let options = '';

    cities.forEach(city => {
      options += `<li data-value="${city.value}">${city.name}</li>`;
    });

    this.DOMElements.selectCityList[0].innerHTML = options;
  }

  removeErrors(field) {
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
