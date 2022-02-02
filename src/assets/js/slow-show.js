    (function($){
        jQuery.fn.extend({

            //Options is added within the brackets after function
            // This informs the plugin that options will be used
            slowShow: function(options) {

                //Defaults
                var defaults = {
                  origin: 'center',
                  direction: 'right',
                  translate: '100%',
                  rotateX: '0',
                  rotateY: '0',
                  scale: '1',
                  transition: '1s 0s ease',
                  start: '0',
                  fade: false,
                  addClass: ''
                };
                var options = $.extend(defaults, options);

                return this.each(function() {

                  //Options
                  const directionVal
                    = options.direction == 'left' ? 'X('
                    : options.direction == 'top' ? 'Y('
                      : options.direction == 'right' ? 'X(-'
                        : options.direction == 'bot' ? 'Y(-'
                          : 'X(';

                  $(this).css({
                    'transform-origin': options.origin,
                    'transform': 'translate' + directionVal + defaults.translate + ') scale(' + options.scale + ') rotateX(' + options.rotateX + 'deg) rotateY(' + options.rotateY + 'deg)',
                  })

                  if (options.fade){ $(this).css('opacity', '0') }

                  $(this).css('transition', 0)

                  //Code
                  let that = this

                  function slowShow() {
                      $(that).each(function(){
                          let wScrollTop = $(window).scrollTop()
                          let wHeight = $(window).height()
                          let wBotBorder = wScrollTop + wHeight
                          let eTopBorder = $(that).offset().top
                          if (wBotBorder > eTopBorder - Number(options.start)) {
                            $(that).css({
                              'transform': '',
                              'opacity': '',
                              'scaleX': '',
                              'scaleY': '',
                              'scale': '',
                              'transition': defaults.transition
                              }
                            ).addClass(options.addClass)
                          }
                      })
                  }

                  $(document).scroll(function(){ slowShow() })
                  $(document).ready(function(){ slowShow() })

              });
            }
        });
    })(jQuery);

console.log('Slow-Show plugin included!')
