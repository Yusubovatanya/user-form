import UserFormController from './form/form.controller.js';
import UserFormModel from './form/form.model.js';
import UserFormView from './form/form.view.js';
import Validator from './utils/validator.js';

window.addEventListener('load', loadForm);

function loadForm() {
  let FormModel = new UserFormModel;
  let FormView = new UserFormView;
  let validator = new Validator();

  new UserFormController(FormModel, FormView, validator);
}

