// const
const mmAttrTrigger = 'data-ff-trigger'
const mmAttrContent = 'data-ff-content'
const mmAttrWrapper = 'data-ff-wrapper'

// events
$('['+mmAttrContent+']').fadeOut(0)

$('['+mmAttrTrigger+']').click(function () {
  let that = $(this)
  let id = that.attr(mmAttrTrigger)

  ffToggle(that, id)
})

// functions
function ffToggle (elem, index) {
  if (elem.hasClass('is-active')) {

    ffSetInactive(elem)

  } else {

    if (index) {
      ffDisableByIndex(index)
      ffSetActive(elem)
    } else {
      ffSetActive(elem)
    }

  }
}
function ffSetInactive (elem) {
  elem
    .removeClass('is-active')
    .next('['+mmAttrContent+']').removeClass('is-active').slideUp()
}
function ffSetActive (elem) {
  elem
    .addClass('is-active')
    .next('['+mmAttrContent+']').addClass('is-active').slideDown()
}
function ffDisableByIndex (index) {
  $('['+mmAttrTrigger+'='+index+'], ['+mmAttrContent+'='+index+']').removeClass('is-active')
  $('['+mmAttrContent+'='+index+']').slideUp()
}
