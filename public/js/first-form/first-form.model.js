export default class FirstFormModel {
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
}
