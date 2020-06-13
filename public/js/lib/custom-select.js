export default function CustomSelect(options) {
  let elem = options.elem;
  let isOpen = false;

  elem.addEventListener('click', (event) => {
      if (event.target.className == 'form-control') {
        toggle();
      } else if (event.target.tagName == 'LI') {
        setValue(event.target.innerHTML, event.target.dataset.value);
        close();
      }
    },
  );

  function onDocumentClick(event) {
    if (!elem.contains(event.target)) {
      close();
    }
  }

  function setValue(title, value) {
    elem.querySelector('.form-control').value = title;
    elem.querySelector('.form-control').setAttribute('data-value', value);
  }

  function toggle() {
    if (isOpen) {
      close();
    } else {
      open();
    }
  }

  function open() {
    elem.getElementsByClassName('customselect')[0].classList.remove('hide');
    document.addEventListener('click', onDocumentClick);
    isOpen = true;
  }

  function close() {
    elem.getElementsByClassName('customselect')[0].classList.add('hide');
    document.removeEventListener('click', onDocumentClick);
    isOpen = false;
  }
}
