$(window).load(function(){
    (function($) {

        $.fn.flexboxslider = function(opts) {
            var options = $.extend({}, $.fn.flexboxslider.defaults, opts);
    
            return this.each(function() {
    
                var el = $(this), 
                    $slides_container = el.find('.slider-wrapper'),
                    $slides = el.find('.product_card'),
                    $slides_length = $slides.length,
                    prev = el.find('.slider-button--prev'),
                    next = el.find('.slider-button--next'),
                    slider_nav, 
                    timer,
                    resizeTimer,
                    steps = 1,
                    current_step = 1,
                    items_per_step = 4;
    
                function initialize() {
    
                    items_per_step = options.items;
                    steps = Math.ceil($slides_length / items_per_step);
                    current_step = 1;
    
                    $slides_container.wrap('<div class="slider-viewport"></div>');
    
                    if (options.show_nav) {
                        create_nav();
                    }
    
                    el.css({
                        'max-height':  options.max_height + 'px'
                    });
    
                    $(window).resize(resize);
    
                    prev.on('click', function(e) {
                        e.preventDefault();
                        move(current_step - 1);
                    });
    
                    next.on('click', function(e) {
                        e.preventDefault();
                        move(current_step + 1);
                    });
    
                    if (options.timer) {
                        el.on('mouseover', stop);
                        el.on('mouseleave', play);
                    }
    
                    resize();
                    if (options.timer) {
                        play();
                    }
                }
    
                function create_nav() {
                    slider_nav = $('<ul></ul>');
                    slider_nav.addClass('slider-nav');
                    create_nav_links();
                    el.append(slider_nav);
                }
    
                function create_nav_links() {
                    for (var i = 0; i < steps; i++) {
                        var li = $('<li></li>')
                        var nav_link = $('<a></a>');
                        nav_link.attr('href', '#');
    
                        nav_link.on('click', function(e) {
                            e.preventDefault();
    
                            var index = $(this).parent().index(),
                                index_plus_1 = index + 1;
    
                            if (index_plus_1 > current_step) {
                                move(index_plus_1);
                            } else {
                                move(index_plus_1);
                            }
                        });
    
                        li.append(nav_link);
                        slider_nav.append(li);
                    }
                }
    
                function update_nav() {
                    var links_count = slider_nav.find('li a').length;
                    if (links_count !== steps) {
                        slider_nav.empty();
                        create_nav_links();
                    }
                }
    
                function resize() {
    
                    if (options.timer) {
                        stop();
                        clearTimeout(resizeTimer);
                        resizeTimer = setTimeout(function() {
                            play();
                        }, 250);
                    }
    
                    if (options.items > 1) {
                        responsive_slider();
                    } else {
                        resize_slide();
                    }
    
                    position_slides_container();
    
                    actualize_buttons();
                }
    
                function responsive_slider() {
                    var slider_width = el.outerWidth(true);
    
                    if (slider_width < options.small_screen && options.items >= 2) {
                        change_items_per_step_to(2);
                    } else if (slider_width < options.tablet && options.items >= 3) {
                        change_items_per_step_to(3);
                    } else {
                        change_items_per_step_to(options.items);
                    }
    
                    resize_slide();
                    update_nav(items_per_step);
                }
    
                function change_items_per_step_to(new_items_per_step) {
                    items_per_step = new_items_per_step;
    
                    var new_steps = Math.ceil($slides_length / items_per_step);
    
                    if (new_steps != steps) {
                        var old_current_step_slides_count = current_step == steps ?
                            $slides_length :
                        current_step * items_per_step;
    
                        var new_current_step = old_current_step_slides_count == $slides_length ?
                            new_steps :
                        old_current_step_slides_count / items_per_step;
    
                        current_step = new_current_step;
                    }
                    steps = new_steps;
                }
    
                function resize_slide() {
                    var slider_width = el.width(); 
                    var slide_width = slider_width / items_per_step;
                    
                    $slides.css({
                        width: slide_width + 'px'
                    });
                }
    
                function position_slides_container() {
                    var margin = parseInt($slides.css('margin-left')) + parseInt($slides.css('margin-right')),
                        slide_width = (el.width() / items_per_step) + margin;
                    
                    var left = 0;
                    if (current_step == 1) {
                        left = 0;
                    } else if (current_step == steps) {
                        left = (($slides_length - (current_step * items_per_step)) + ((current_step - 1) * items_per_step)) * slide_width;
                    } else {
                        left = ((current_step - 1) * items_per_step) * slide_width;
                    }
                    $slides_container.css({
                        left: '-' + left + 'px'
                    });
                }
    
    
                function calc_slides_diff(from_step, to_step) {
    
                    if (from_step < to_step) {
                        var slides_to_move = to_step == steps ?
                            $slides_length - (current_step * items_per_step) :
                        (to_step * items_per_step) - (current_step * items_per_step);
    
                        return slides_to_move;
                    }
                    if (from_step > to_step) {
    
                        var slides_to_move = current_step == steps ?
                            $slides_length - (to_step * items_per_step) :
                        (current_step * items_per_step) - (to_step * items_per_step);
    
                        return slides_to_move;
                    }
    
                    return 0;
                }
    
                function move(to_step) {
                    var slides_to_move = calc_slides_diff(current_step, to_step);
                    var width = items_per_step > 1 ?
                        $slides.outerWidth(true) * slides_to_move:
                    $slides.outerWidth(true) * slides_to_move;       
    
    
                    if (current_step < to_step) {
                        $slides_container.animate({
                            left: '-=' + width + 'px'
                        }, options.animation_duration, options.easing);
                        current_step = to_step;
                    }
                    if (current_step > to_step) {
                        $slides_container.animate({
                            left: '+=' + width + 'px'
                        }, options.animation_duration, options.easing);
                        current_step = to_step;
                    }
    
                    actualize_buttons();
                }
    
                function actualize_buttons() {
    
                    if (current_step <= 1) {
                        prev.hide();
                    } else {
                        prev.show();
                    }
    
                    if (current_step >= steps) {
                        next.hide();
                    } else {
                        next.show();
                    }
    
                    if (options.show_nav) {
                        var current_nav = slider_nav.find('a').eq(current_step - 1);
                        slider_nav.find('a').removeClass('active');
                        current_nav.addClass('active');
                    }
                }
    
                function play() {
                    clearInterval(timer);
                    timer = setInterval(function() {
                        if (current_step == steps) {
                            move(1);
                        } else {
                            move(current_step + 1);
                        }
                    }, options.interval);
                }
    
                function stop() {
                    clearInterval(timer);
                }
    
                initialize();
            });
    
        };
    
        $.fn.flexboxslider.defaults = {
            max_height:250,
            items:4,
            timer: true,
            interval: 5000,
            show_nav: true,
            animation_duration: 500,
            easing: 'swing',
            small_screen:600,
            tablet:768
        };
    
    
    })(jQuery);
    
    if( $(window).width() <= 960){
        $('.slider').flexboxslider({
            max_height: 750,
            items:1,
            timer: false
        });
      }else if($(window).width() <= 1366){
        $('.slider').flexboxslider({
            max_height: 650,
            items:3,
            timer: false
        });
      }else {
        $('.slider').flexboxslider({
            max_height: 750,
            items:4,
            timer: false
        });
      }
  });