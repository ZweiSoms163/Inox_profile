import $ from 'jquery'
global.jQuery = $
global.$ = $

require('./slow-show.js')
require('./focus-visible.js')
require('./keyboard-click.js')

// require('./slick-slider/slick-slider')
// require('./modal-maker/modal-maker')
// require('./folder-faller/folder-faller')
// require('./tab-tracker/tab-tracker')

$(document).ready(function () {
  // body show <
  $('.body__wrapper').css({
    opacity: 1,
    overflow: ''
  })
  // body show >

})
