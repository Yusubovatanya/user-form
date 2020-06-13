import FirstForm from './first-form.js';
import SecondForm from './second-form.js';
import ThirdForm from './third-form.js';
import Validator from '../utils/validator.js';

export default class UserFormController {
  constructor() {
    this.DOMElements = {
      progressbar: document.getElementsByClassName('progressbar'),
      firstForm: document.getElementById('first-form'),
      secondForm: document.getElementById('second-form'),
      thirdForm: document.getElementById('third-form'),
      nextBtn: document.getElementsByClassName('next-first-btn'),
      nextSecondBtn: document.getElementsByClassName('next-second-btn'),
      previousSecondBtn: document.getElementsByClassName('previous-second-btn'),
      actions: document.getElementsByClassName('actions'),
    };
    this.init();
    this.isInitFirst = false;
    this.isInitThird = false;
    this.isInitSecond = false;
    this.currentStep = 1;
  }

  init() {
    if (this.isInitFirst) {
      this.toggleShowOrHide(this.DOMElements.secondForm);
      this.toggleShowOrHide(this.DOMElements.firstForm);
    } else {
      this.initFirstForm();
      this.initListeners();
      this.isInitFirst = true;
    }
  }

  initFirstForm() {
    let validator = new Validator();
    this.firstForm = new FirstForm(validator);
  }

  initListeners() {
    this.DOMElements.nextBtn[0].addEventListener('click', (event) => {
        event.stopPropagation();
        const fields = this.DOMElements.firstForm.getElementsByClassName('form-control');
        let isValid = this.firstForm.validateForm(fields);

        if (isValid) {
          this.DOMElements.nextSecondBtn[0].getElementsByClassName('btn-text')[0].innerHTML = 'Далі';
          this.currentStep = 2;

          if (this.isInitSecond) {
            this.toggleShowOrHide(this.DOMElements.secondForm);
            this.toggleShowOrHide(this.DOMElements.nextBtn[0]);
            this.toggleShowOrHide(this.DOMElements.actions[0]);
            this.changeStepper(this.currentStep - 1);
          } else {
            this.initSecondForm();
            this.isInitSecond = true;
          }

          this.toggleShowOrHide(this.DOMElements.firstForm);
        }
      },
    );

    this.DOMElements.nextSecondBtn[0].addEventListener('click', (event) => {
      event.stopPropagation();

      if (this.currentStep === 2) {
        this.initSecondStep();
      }

      if (this.currentStep === 3) {
        this.submitForm();
      }
    });

    this.DOMElements.previousSecondBtn[0].addEventListener('click', (event) => {
      event.stopPropagation();

      if (this.currentStep === 2) {
        this.initPreviousSecondStep();
      }

      if (this.currentStep === 3) {
        this.initPreviousThirdStep();
      }
    });
  }

  initSecondForm() {
    new SecondForm();

    this.toggleShowOrHide(this.DOMElements.nextBtn[0]);
    this.toggleShowOrHide(this.DOMElements.actions[0]);

    this.changeStepper(this.currentStep - 1);
  }

  changeStepper(step) {
    const markElement = this.DOMElements.progressbar[0].getElementsByClassName('mark-step')[step - 1];
    const activeElement = this.DOMElements.progressbar[0].getElementsByTagName('li')[step];

    this.toggleDoneStep(markElement);
    this.toggleShowOrHide(markElement);
    this.toggleActiveStep(activeElement);
  }

  initPreviousSecondStep() {
    this.toggleShowOrHide(this.DOMElements.firstForm);
    this.toggleShowOrHide(this.DOMElements.secondForm);
    this.toggleShowOrHide(this.DOMElements.nextBtn[0]);
    this.toggleShowOrHide(this.DOMElements.actions[0]);
    this.currentStep = 1;
    this.changeStepper(this.currentStep);
  }

  initSecondStep() {
    this.toggleShowOrHide(this.DOMElements.secondForm);
    this.DOMElements.nextSecondBtn[0].getElementsByClassName('btn-text')[0].innerHTML = 'Відправити';
    this.currentStep = 3;

    if (this.isInitThird) {
      this.toggleShowOrHide(this.DOMElements.thirdForm);
      this.changeStepper(this.currentStep - 1);
    } else {
      this.initThirdForm();
    }
  }

  initThirdForm() {
    new ThirdForm();
    this.isInitThird = true;
    this.changeStepper(this.currentStep - 1);
  }

  initPreviousThirdStep() {
    this.toggleShowOrHide(this.DOMElements.thirdForm);
    this.toggleShowOrHide(this.DOMElements.secondForm);
    this.DOMElements.nextSecondBtn[0].getElementsByClassName('btn-text')[0].innerHTML = 'Відправити';
    this.currentStep = 2;
    this.changeStepper(this.currentStep);
  }

  submitForm() {
    //  submit form
  }

  toggleShowOrHide(element) {
    element.classList.toggle('hide');
  }

  toggleDoneStep(element) {
    element.classList.toggle('done');
  }

  toggleActiveStep(element) {
    element.classList.toggle('active');
  }
}
