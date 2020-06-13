export default class SecondFormModel {
  constructor() {
    this.languages = [];
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
