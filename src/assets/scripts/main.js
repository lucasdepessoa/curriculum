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
    switch ($(this).attr('href')) {
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


  function getMessage(url) {

    let dados = $('#formContact').serialize()

    return $.ajax({
      type: 'POST',
      url: url,
      cache: false,
      data: dados
    })
  }

  async function getTest() {
    try {

      const message = await getMessage('/')


      let msg = ``
      msg += `<div class="alert alert-${message.type} text-center " >`
      msg += `<strong>${message.intro}</strong> ${message.message}`
      msg += `</div>`

      $('.afterMessage').html(msg)

      setTimeout(() => {
        $('.afterMessage').html('')
        $('#formContact').reset()
        $('#name').focus()
      }, 4000);

    } catch (err) {
      console.log('caiu no catch')

      let msg = ``
      msg += `<div class="alert alert-${err.responseJSON.type} text-center" >`
      msg += `<strong>${err.responseJSON.intro}</strong> ${err.responseJSON.message}`
      msg += `</div>`

      $('.afterMessage').html(msg)

      setTimeout(() => {
        $('.afterMessage').html('')
      }, 4000);

    }
  }

  $('#btnSendEmail').on('click', function () {

    getTest()

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