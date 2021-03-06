export default class SecondFormView {
  constructor() {
    this.DOMElements = {
      secondForm: document.getElementById('second-form'),
      foodList: document.getElementsByClassName('food-list'),
      selectLevelList: document.getElementsByClassName('select-level-list'),
      languagesLevelField: document.getElementsByClassName('languages-level-field'),
      languageNameList: document.getElementsByClassName('language-name-list'),
      languagesItem: document.getElementsByClassName('languages-item'),
      languagesFields: document.getElementsByClassName('languages-fields'),
      languageAddBtn: document.getElementsByClassName('language-add-btn'),
    };
  }

  addLanguageForm() {
    const formList = this.DOMElements.languagesItem;
    const lastId = +formList[formList.length - 1].getAttribute('data-id') + 1;
    let elem = document.createElement('div');
    elem.setAttribute('class', 'languages-item');
    elem.setAttribute('data-id', `${lastId}`);
    elem.innerHTML = `
                <div class="relative languages-name-block" id="languages-name-${lastId}">\
                  <input\
                    type="text"\
                    class="form-control"\
                    id="language-name-field-${lastId}"\
                    name="language-${lastId}"\
                    placeholder="Мови"\
                    required\
                    readonly\
                    data-id=""${lastId}\
                  >\
                  <ul class="language-name-list hide select-list customselect">\
                  </ul>\
              </div>\

              <div class="relative languages-level-block" id="languages-level-${lastId}">\
                <div class="relative">\
                  <input\
                    type="text"\
                    class="form-control"\
                    id="language-level-${lastId}"\
                    name="language-${lastId}"\
                    placeholder="Рівень володіння"\
                    required\
                    readonly\
                  >\
                  <span class="select-level-btn">\
                    <i class="fas fa-chevron-down"></i>\
                  </span>\
                </div>\
                <ul class="hide select-list customselect">\
                  <li data-value="elementary">Елементарний</li>\
                  <li data-value="intermediate">Незалежний</li>\
                  <li data-value="advanced">Досвідчений</li>\
                </ul>\
              </div>\
`;

    this.DOMElements.languagesFields[0].appendChild(elem);

    return [`languages-level-${lastId}`, `languages-name-${lastId}`];
  }

  renderFoodOptions(list) {
    let options = '';

    list.forEach(item => {
      options += `<li data-value="${item.value}">${item.name}</li>`;
    });

    this.DOMElements.foodList[0].innerHTML = options;
  }

  renderLanguagesOptions(languages) {
    let options = '';

    languages.forEach(item => {
      options += `<li data-value="${item.value}">${item.name}</li>`;
    });

    this.DOMElements.languageNameList[this.DOMElements.languageNameList.length - 1].innerHTML = options;
  }
}
