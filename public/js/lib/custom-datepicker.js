flatpickr('#end-date-btn-1', {
  onClose: function (selectedDates, dateStr, instance) {
    document.getElementById('end-date-1').value = dateStr;
    document.querySelector('#end-date-btn-1 .date-placeholder').style.display = 'none';
  },
});
flatpickr('#start-date-btn-1', {
  onClose: function (selectedDates, dateStr, instance) {
    document.getElementById('start-date-1').value = dateStr;
    document.querySelector('#start-date-btn-1 .date-placeholder').style.display = 'none';
  },
});


