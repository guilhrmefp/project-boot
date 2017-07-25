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

  $('.navbar__nav a').click(function(e){
    e.preventDefault();
    scrollToAnchor($(this).attr('href'));
  });

  //$('.modal-pricing').on('show.bs.modal', function (e) {
  //  history.pushState(null, null, 'salgados-fritos');
  //  $('body').removeClass('historyStop');
  //});
  //$('.modal-pricing').on('hide.bs.modal', function (e) {
  //  $('.owl-gallery-thumbs').owlCarousel('destroy');
  //  if(!$('body').hasClass('historyStop')) {
  //    history.back();
  //  }
  //});

  $('.modal-pricing').on('shown.bs.modal', function (e) {
    $('.owl-gallery').owlCarousel({
      items:     1,
      loop:      true,
      nav:       true,
      lazyLoad:  true,
      navText: [
        '<span class="glyphicon glyphicon-chevron-left"></span>',
        '<span class="glyphicon glyphicon-chevron-right"></span>'
      ],
      onInitialized: owlRefresh()
    });
  });

  $('.js-btn-contato').click(function(){
    $('.modal-pricing').modal('hide');
    scrollToAnchor('#contato');
  });
});


$(window).on('popstate', function (e) {
  var state = e.originalEvent.state;
  if (state !== null) {
    console.log('1')
  } else {
    $('body').addClass('historyStop');
    $('.modal-pricing').modal('hide');
  }
});

function owlRefresh() {
  //setTimeout(function() {
  //  $('.owl-gallery-thumbs').trigger('refresh.owl.carousel');
  //}, 500);
}
function scrollToAnchor(aid) {
  var aTag = $(aid);
  $('html,body').animate({scrollTop: aTag.offset().top - 20},'slow');
}