import FirstFormView from '../first-form/first-form.view.js';
import FirstFormController from '../first-form/first-form.controller.js';
import FirstFormModel from '../first-form/first-form.model.js';
import SecondFormModel from '../second-form/second-form.model.js';
import SecondFormView from '../second-form/second-form.view.js';
import SecondFormController from '../second-form/second-form.controller.js';
import ThirdFormController from '../third-form/third-form.controller.js';
import ThirdFormModel from '../third-form/third-form.model.js';
import ThirdFormView from '../third-form/third-form.view.js';
import Validator from '../utils/validator.js';

export default class UserFormController {
  constructor(model, view, validator) {
    this.model = model;
    this.view = view;
    this.validator = validator;
    this.init();
    this.isInitFirst = false;
    this.isInitThird = false;
    this.isInitSecond = false;
    this.currentStep = 1;
  }

  init() {
    if (this.isInitFirst) {
      this.view.toggleShowOrHide(this.view.DOMElements.secondForm);
      this.view.toggleShowOrHide(this.view.DOMElements.firstForm);
    } else {
      this.initFirstForm();
      this.initListeners();
      this.isInitFirst = true;
    }
  }

  initFirstForm() {
    let firstFormModel = new FirstFormModel;
    let firstFormView = new FirstFormView;
    let validator = new Validator();
    this.firstForm = new FirstFormController(firstFormModel, firstFormView, validator);
  }

  initListeners() {
    this.view.DOMElements.nextBtn[0].addEventListener('click', (event) => {
        event.stopPropagation();
        const fields = this.view.DOMElements.firstForm.getElementsByClassName('form-control');
        let isValid = this.firstForm.validateForm(fields);

        if (isValid) {
          this.view.DOMElements.nextSecondBtn[0].getElementsByClassName('btn-text')[0].innerHTML = 'Далі';
          this.currentStep = 2;

          if (this.isInitSecond) {
            this.view.toggleShowOrHide(this.view.DOMElements.secondForm);
            this.view.toggleShowOrHide(this.view.DOMElements.nextBtn[0]);
            this.view.toggleShowOrHide(this.view.DOMElements.actions[0]);
            this.changeStepper(this.currentStep - 1);
          } else {
            this.initSecondForm();
            this.isInitSecond = true;
          }

          this.view.toggleShowOrHide(this.view.DOMElements.firstForm);
        }
      },
    );

    this.view.DOMElements.nextSecondBtn[0].addEventListener('click', (event) => {
      event.stopPropagation();

      if (this.currentStep === 2) {
        this.initSecondStep();
      }

      if (this.currentStep === 3) {
        this.submitForm();
      }
    });

    this.view.DOMElements.previousSecondBtn[0].addEventListener('click', (event) => {
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
    let secondFormModel = new SecondFormModel;
    let secondFormView = new SecondFormView;
    new SecondFormController(secondFormModel, secondFormView);

    this.view.toggleShowOrHide(this.view.DOMElements.nextBtn[0]);
    this.view.toggleShowOrHide(this.view.DOMElements.actions[0]);

    this.changeStepper(this.currentStep - 1);
  }

  changeStepper(step) {
    const markElement = this.view.DOMElements.progressbar[0].getElementsByClassName('mark-step')[step - 1];
    const activeElement = this.view.DOMElements.progressbar[0].getElementsByTagName('li')[step];

    this.view.toggleDoneStep(markElement);
    this.view.toggleShowOrHide(markElement);
    this.view.toggleActiveStep(activeElement);
  }

  initPreviousSecondStep() {
    this.view.toggleShowOrHide(this.view.DOMElements.firstForm);
    this.view.toggleShowOrHide(this.view.DOMElements.secondForm);
    this.view.toggleShowOrHide(this.view.DOMElements.nextBtn[0]);
    this.view.toggleShowOrHide(this.view.DOMElements.actions[0]);
    this.currentStep = 1;
    this.changeStepper(this.currentStep);
  }

  initSecondStep() {
    this.view.toggleShowOrHide(this.view.DOMElements.secondForm);
    this.view.DOMElements.nextSecondBtn[0].getElementsByClassName('btn-text')[0].innerHTML = 'Відправити';
    this.currentStep = 3;

    if (this.isInitThird) {
      this.view.toggleShowOrHide(this.view.DOMElements.thirdForm);
      this.changeStepper(this.currentStep - 1);
    } else {
      this.initThirdForm();
    }
  }

  initThirdForm() {
    let thirdFormModel = new ThirdFormModel;
    let thirdFormView = new ThirdFormView;
    new ThirdFormController(thirdFormModel, thirdFormView);
    this.isInitThird = true;
    this.changeStepper(this.currentStep - 1);
  }

  initPreviousThirdStep() {
    this.view.toggleShowOrHide(this.view.DOMElements.thirdForm);
    this.view.toggleShowOrHide(this.view.DOMElements.secondForm);
    this.view.DOMElements.nextSecondBtn[0].getElementsByClassName('btn-text')[0].innerHTML = 'Відправити';
    this.currentStep = 2;
    this.changeStepper(this.currentStep);
  }

  submitForm() {
    //  submit form
  }
}
