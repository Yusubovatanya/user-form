export default class Validator {
  checkConfirmPassword(password, confirmPassword) {
    return password === confirmPassword;
  }

  checkFullField(fields) {
    let errors = {};
    const keys = Object.keys(fields);
    for (let i = 0; i < keys.length; i++) {
      if (!fields[keys[i]].value.trim().length) {
        const fieldName = fields[keys[i]].getAttribute('name');
        errors = {
          ...errors,
          [fieldName]: 'Обов\'язкове поле',
        };
      }
    }

    return errors;
  }

  validationForm(fields) {
    let errors = this.checkFullField(fields);
    const { email, phone, password, passwordConfirm } = fields;

    if (!errors.hasOwnProperty('email')) {
      if (!this.validateEmail(email.value)) {
        errors = {
          ...errors,
          email: 'Невірний формат',
        };
      }
    }

    if (!errors.hasOwnProperty('phone')) {
      if (!this.validatePhone(phone.value)) {
        errors = {
          ...errors,
          phone: 'Невірний формат',
        };
      }
    }

    if (!errors.hasOwnProperty('password')) {
      if (!this.validatePassword(password.value)) {
        errors = {
          ...errors,
          password: 'Мінімальная кількість символів 8',
        };
      }
    }

    if (!errors.hasOwnProperty('passwordConfirm')) {
      if (!this.validatePassword(passwordConfirm.value)) {
        errors = {
          ...errors,
          passwordConfirm: 'Мінімальная кількість символів 8',
        };
      }
    }

    if (!errors.hasOwnProperty('passwordConfirm') && !errors.hasOwnProperty('password')) {
      if (!this.checkConfirmPassword(password.value, passwordConfirm.value)) {
        errors = {
          ...errors,
          passwordConfirm: 'Паролі мають співпадати',
        };
      }
    }

    return errors;
  }

  validatePhone(phone) {
    const reg = /^[+][3][8] [(][0-9]{3}[)] [0-9]{3}[-][0-9]{2}[-][0-9]{2}$/;

    return reg.test(phone);
  }

  validateEmail(emailValue) {
    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    return reg.test(emailValue);
  }

  validatePassword(passwordValue) {
    return passwordValue.length >= 8;
  }
}
