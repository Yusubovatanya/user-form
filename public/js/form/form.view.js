export default class UserFormView {
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
