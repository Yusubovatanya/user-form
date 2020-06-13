import CustomSelect from '../lib/custom-select.js';
import CustomFilterSelect from '../lib/custom-filter-select.js';

export default function CustomElementsForm() {

  this.initSelect = (element) => {
    new CustomSelect({
      elem: element,
    });
  };

  this.initDatePicker = (element, elementValue, hideSelector) => {
    flatpickr(element, {
      onClose: function (selectedDates, dateStr) {
        document.querySelector(elementValue).value = dateStr;
        document.querySelector(hideSelector).style.display = 'none';
      },
    });
  };

  this.initMaskPhone = (element) => {
    $(element).inputmask({ 'mask': '+38 (999) 999-99-99' });
  };

  this.initSelectFilter = (element) => {
    new CustomFilterSelect({
      elem: element,
    });
  }
}
