$(document).ready(function($) {
  /* 菜单切换 */
  $('#header .nav__links--toggle .nav-toggle').click(function() {
    // console.log('toggle')
    $(this).toggleClass('on')
    $('#header .nav__links').toggle()
    $('#header .navigation__wrap').toggleClass('bg-e23d0e')
    return false
  })

  /* 子菜单切换 */
  $('#header .nav__links .subnav-toggle').hover(function() {
    $(this).find('.nav__links--sub').toggleClass('hidden')
  })
  $('#header .nav__links .subnav-toggle').click(function() {
    $(this).find('.nav__links--sub').toggleClass('hidden')
  })
  
  /* 轮播 */
  let imgCount = $('#banner .banner__inner__swiper .swiper__slide').length
  let i = 0
  window.setInterval(function() {
    i = i == imgCount - 1 ? 0 : i + 1
    let ml = 100 * i
    $('#banner .banner__inner__swiper').animate({
      marginLeft: '-' + ml + 'vw'},
      500, function() {
        // console.log('all: ' + imgCount)
        // console.log('next image')
        // console.log(ml)
        // console.log(i+1)
        // console.log('-------------')
      /* stuff to do after animation is complete */
    })
  }, 7000)

  /* about关于页面-页面切换 */
  $('.page-tab .page-tab__tab li').click(function() {
    let page = $(this).attr('page') || this.dataset.page
    $(this).toggleClass('active').siblings().removeClass('active');
    $('.page-tab .page-tab__page').addClass('hidden').parent().find('.page-tab__' + page).removeClass('hidden');
  })
})
