export default class UserFormModel {
  constructor() {
    this.languages = [];
  }

  getCityList() {
    return fetch('/city')
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  getFoodList() {
    return fetch('/foods')
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  getLanguageList() {
    return fetch('/languages')
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }
}
