export default function CustomFilterSelect(options) {
  let elem = options.elem;
  let isOpen = false;
  const selectList = elem.getElementsByClassName('select-list')[0];
  const formField = elem.getElementsByClassName('form-control')[0];

  elem.addEventListener('keyup', (event) => {
      initFoodInputListeners(event);
    },
  );

  elem.addEventListener('click', (event) => {
      if (event.target.className == 'form-control' && !formField.value.length) {
        toggle();
      }

      if (event.target.tagName == 'LI') {
        initSelectFood(event);
        close();
      }
    },
  );

  function initFoodInputListeners(event) {
    const searchValue = event.target.value;

    if (searchValue?.length >= 1) {
      searchFood(searchValue);
      if (!isOpen) {
        open();
      }
    }

    if (searchValue?.length === 0) {
      let option = elem.getElementsByTagName('li');
      for (let i = 0; i < option.length; i++) {
        option[i].style.display = '';
      }
    }
  }

  function initSelectFood(event) {
    formField.value = event.target.innerHTML;
    formField.setAttribute('data-value', event.target.value);
    const option = elem.getElementsByTagName('li');

    for (let i = 0; i < option.length; i++) {
      option[i].style.display = '';
    }
  }

  function searchFood(searchValue) {
    const option = elem.getElementsByTagName('li');
    const filter = searchValue.toUpperCase();
    selectList.classList.remove('hide');

    for (let i = 0; i < option.length; i++) {
      let txtValue = option[i].textContent || option[i].innerText;

      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        option[i].style.display = '';
      } else {
        option[i].style.display = 'none';
      }
    }
  }

  function onDocumentClick(event) {
    if (!elem.contains(event.target)) {
      close();
    }
  }

  function toggle() {
    if (isOpen) {
      close();
    } else {
      open();
    }
  }

  function open() {
    selectList.classList.remove('hide');
    document.addEventListener('click', onDocumentClick);
    isOpen = true;
  }

  function close() {
    selectList.classList.add('hide');
    document.removeEventListener('click', onDocumentClick);
    isOpen = false;
  }

}
