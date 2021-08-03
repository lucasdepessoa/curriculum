// Animations
AOS.init({
  anchorPlacement: 'top-left',
  duration: 1000
});


//My scripts here//

//Append dinamic versions on script and link tags//
$(document).ready(function () {

  //run through all elements 'script' and adding 'ver' variabel with a new version
  $('script').each(function (e) {
    $(this).attr('src', `${$(this).attr('src')}?ver=${Date.now()}`)
  })


  //run through all elements 'link' and adding 'ver' variabel with a new version
  $('link').each(function (e) {
    switch($(this).attr('href')){
      case '/assets/css/font-awesome/css/all.min.css':
        $(this).attr('href', `${$(this).attr('href')}?ver=${Date.now()}`)
      break;
      case '/assets/css/mdb.min.css':
        $(this).attr('href', `${$(this).attr('href')}?ver=${Date.now()}`)
      break;
      case '/assets/css/aos.css':
        $(this).attr('href', `${$(this).attr('href')}?ver=${Date.now()}`)
      break;
      case '/assets/css/main.css':
        $(this).attr('href', `${$(this).attr('href')}?ver=${Date.now()}`)
      break;
    }
    
  })
})

/*Scroll to top when arrow up clicked BEGIN*/
$(window).scroll(function () {
  var height = $(window).scrollTop();
  if (height > 100) {
    $('#back2Top').fadeIn();
  } else {
    $('#back2Top').fadeOut();
  }
});
$(document).ready(function () {
  $("#back2Top").click(function (event) {
    event.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, "slow");
    return false;
  });

});
/*Scroll to top when arrow up clicked END*/