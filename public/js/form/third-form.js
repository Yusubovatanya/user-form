import CustomElementsForm from '../utils/utils.js';

let utils = new CustomElementsForm();

export default class ThirdForm {
  constructor() {
    this.DOMElements = {
      thirdForm: document.getElementById('third-form'),
      experienceWrapper: document.getElementsByClassName('experience-wrapper'),
      educationalWrapper: document.getElementsByClassName('educational-wrapper'),
      education: document.getElementsByClassName('education'),
      experience: document.getElementsByClassName('experience'),
      addEducationBtn: document.getElementsByClassName('add-education-btn'),
      addExperienceBtn: document.getElementsByClassName('add-experience-btn'),
    };
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
        this.DOMElements.thirdForm.innerHTML = data;
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
    this.DOMElements.addEducationBtn[0].addEventListener('click', (event) => {
      event.stopPropagation();
      this.addEducation();
    });

    this.DOMElements.addExperienceBtn[0].addEventListener('click', (event) => {
      event.stopPropagation();
      this.addExperience();
    });
  }

  addExperience() {
    const id = this.addExperienceForm();
    this.initExperienceDatePicker(id);
  }

  addEducation() {
    const id = this.addEducationForm();
    this.initEducationDatePicker(id);
  }

  addEducationForm() {
    const formList = this.DOMElements.education;
    const lastId = +formList[formList.length - 1].getAttribute('data-id') + 1;
    let elem = document.createElement('div');
    elem.setAttribute('class', 'education');
    elem.setAttribute('data-id', `${lastId}`);
    elem.innerHTML = `
              <label for="education-location" class="label-field">Освіта</label>\
            <!-- education location -->\
            <input\
              type="text"\
              class="form-control"\
              id="education-location-${lastId}"\
              name="educationLocation"\
              placeholder="Місце навчання"\
              autocomplete="off"\
              spellcheck="off"\
              required\
            >\
            <!-- specialty -->\
            <input\
              type="text"\
              class="form-control"\
              id="specialty-${lastId}"\
              name="specialty"\
              placeholder="Спеціальність"\
              autocomplete="off"\
              spellcheck="off"\
              required\
            >\
            <!-- education period -->\
            <div class="period">\
              <label for="start-date" class="label-field">\
                <p class="field-description">\
                  Виберіть дату початку та закінчення навчання в цьому закладі\
                </p>\
              </label>\
              <div class="period-fields">\
                <div class="relative" id="start-date-btn-${lastId}">\
                  <div class="date-placeholder">\
                    <p class="date-icon"></p><span>Дата початку</span>\
                  </div>\
                  <input\
                    type="text"\
                    class="form-control"\
                    id="start-date-${lastId}"\
                    name="start-date"\
                    autocomplete="off"\
                    spellcheck="off"\
                    required\
                    readonly\
                    data-input\
                  >\
                </div>\
                <div class="relatives" id="end-date-btn-${lastId}">\
                  <div class="date-placeholder">\
                    <p class="date-icon"></p><span>Дата кінцуя</span>\
                  </div>\
                  <input\
                    type="text"\
                    class="form-control"\
                    id="end-date-${lastId}"\
                    name="end-date"\
                    autocomplete="off"\
                    spellcheck="off"\
                    required\
                    readonly\
                    data-input\
                  >\
                </div>\
              </div>\
            </div>\
            <!-- some worlds -->\
            <textarea\
              class="form-control about-education-field"\
              id="about-education-${lastId}"\
              name="aboutEducation"\
              placeholder="Декілька слів про навчання..."\
            ></textarea>\
`;

    this.DOMElements.educationalWrapper[0].appendChild(elem);

    return lastId;
  }

  addExperienceForm() {
    const formList = this.DOMElements.experience;
    const lastId = +formList[formList.length - 1].getAttribute('data-id') + 1;
    let elem = document.createElement('div');
    elem.setAttribute('class', 'experience');
    elem.setAttribute('data-id', `${lastId}`);
    elem.innerHTML = `
          <label for="experience-location-${lastId}" class="label-field">Досвід</label>\
          <!-- work location -->\
          <input\
            type="text"\
            class="form-control"\
            id="experience-location-${lastId}"\
            name="experienceLocation"\
            placeholder="Місце навчання"\
            autocomplete="off"\
          >\
          <!-- position -->\
          <input\
            type="text"\
            class="form-control"\
            id="position-${lastId}"\
            name="position"\
            placeholder="Спеціальність"\
            autocomplete="off"\
          >\
          <!-- experience period -->\
          <div class="period">\
            <label for="start-date-${lastId}" class="label-field">\
              <p class="field-description">\
                Виберіть дату початку та закінчення навчання в цьому закладі\
              </p>\
            </label>\
            <div class="period-fields">\
              <div class="relative" id="start-period-btn-${lastId}">\
                <div class="date-placeholder">\
                  <p class="date-icon"></p><span>Дата початку</span>\
                </div>\
                <input\
                  type="text"\
                  class="form-control"\
                  id="start-period-${lastId}"\
                  name="start-date"\
                  autocomplete="off"\
                  spellcheck="off"\
                  readonly\
                  data-input\
                >\
              </div>\
\
              <div class="relatives" id="end-period-btn-${lastId}">\
                <div class="date-placeholder">\
                  <p class="date-icon"></p><span>Дата кінця</span>\
                </div>\
                <input\
                  type="text"\
                  class="form-control"\
                  id="end-period-${lastId}"\
                  name="end-date"\
                  autocomplete="off"\
                  spellcheck="off"\
                  readonly\
                  data-input\
                >\
              </div>\
            </div>\
          </div>\
          <!-- some worlds -->\
          <textarea\
            class="form-control about-experience-field"\
            id="about-experience-${lastId}"\
            name="aboutEducation"\
            placeholder="Декілька слів про досвід роботи на цій посаді ..."\
          ></textarea>\
`;

    this.DOMElements.experienceWrapper[0].appendChild(elem);

    return lastId;
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
