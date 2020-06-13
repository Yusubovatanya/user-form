import CustomElementsForm from '../utils/utils.js';

let utils = new CustomElementsForm();

export default class SecondFormController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.init();
  }

  init() {
    fetch('second-form.html', {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Accept': 'application/json',
      },
    })
      .then(response => response.text())
      .then(data => {
        this.getFoodList();
        this.getLanguageList();
        this.view.DOMElements.secondForm.innerHTML = data;
        this.initCustomElements();
        this.initListeners();
      });
  }

  getLanguageList() {
    this.model.getLanguageList().then((languages) => {
        this.model.languages = languages;
        this.view.renderLanguagesOptions(languages);
      },
    );
  }

  getFoodList() {
    this.model.getFoodList().then((foods) => {
        this.view.renderFoodOptions(foods);
      },
    );
  }

  initCustomElements() {
    utils.initSelect(document.getElementById('languages-name-1'));
    utils.initSelect(document.getElementById('languages-level-1'));
    utils.initSelectFilter(document.getElementsByClassName('food')[0]);
  }

  initListeners() {
    this.view.DOMElements.languageAddBtn[0].addEventListener('click', (event) => {
        event.stopPropagation();
        this.addLanguageForm();
      },
    );
  }

  addLanguageForm() {
    const idsNewForm = this.view.addLanguageForm();
    this.view.renderLanguagesOptions(this.model.languages);

    idsNewForm.forEach(id => {
      utils.initSelect(document.getElementById(id));
    });
  }
}
