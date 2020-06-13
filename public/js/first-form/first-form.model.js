export default class FirstFormModel {
  constructor() {
  }

  getCityList() {
    return fetch('/city')
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }
}
