// const
const ttButton = 'data-tt-button'
const ttContent = 'data-tt-content'

// events
$('['+ttButton+']').click(function () {
  let that = $(this)

  ttSwitch(that)
})

$('['+ttContent+']').not('.is-active').fadeOut(0) // hide not .is-active

// functions
function ttSwitch (target) {
  let id = target.attr(ttButton)
  let index = target.index()

  ttSetActive('['+ttButton+'='+id+']', index)

  ttSetActive('['+ttContent+'='+id+']', index)
  ttSetFade('['+ttContent+'='+id+']', index)
}

function ttSetActive(elem, index) {
  $(elem)
    .removeClass('is-active')
    .eq(index).addClass('is-active')
}

function ttSetFade(elem, index) {
  $(elem)
    .fadeOut(0)
    .eq(index).fadeIn(200)
}
