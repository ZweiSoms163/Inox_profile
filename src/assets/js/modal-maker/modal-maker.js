// const
const mmAttrTrigger = 'data-mm-trigger'
const mmAttrPopup = 'data-mm-popup'
const mmAttrOverlay = 'data-mm-overlay'
const mmAttrClose = 'data-mm-close'

// events
$('['+mmAttrTrigger+']').click(function () {
  let that = $(this)

  mmAttrCloseAll()
  mmToggle(that)
  mmSetScroll()
})
$('['+mmAttrOverlay+']').click(function () {
  mmAttrCloseAll()
  mmSetScroll()
})
$('['+mmAttrClose+']').click(function () {
  mmAttrCloseAll()
  mmSetScroll()
})

// functions
function mmToggle (target) {
  let id = target.attr(mmAttrTrigger)

  $('['+mmAttrTrigger+'='+id+'], ['+mmAttrPopup+'='+id+'], ['+mmAttrOverlay+']').toggleClass('is-active')
}
function mmAttrCloseAll () {
  $('['+mmAttrTrigger+'], ['+mmAttrPopup+'], ['+mmAttrOverlay+']').removeClass('is-active')
}
function mmSetScroll () {
  let html = $('html')

  if ( $('['+mmAttrPopup+']').hasClass('is-active') ) {
    html.css('overflow', 'hidden')
  } else {
    html.css('overflow', '')
  }
}
