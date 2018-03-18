$(document).ready(function() {
  $('.form-control').on({
    'focus': function() {
      $(this).addClass('fill');
    },
    'blur': function() {
      if($(this).val() == "") {
        $(this).removeClass('fill');
      }
    }
  });
});

function scrollToAnchor(aid) {
  var aTag = $(aid);
  $('html,body').animate({scrollTop: aTag.offset().top - 20},'slow');
}
