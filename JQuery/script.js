
$(function() {

  $('.list').on('click', function() {
    if($(this).parent().is('.sublist')) {
      $(this).hide();
    }
    if($(this).is("special")) {
      alert('special');
    }
  });

});
