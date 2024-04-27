// Selecting the basket element
var basket = $('#basket');

// Function to handle both mousemove and touchmove events
function handleMove(e) {
    // Prevent default behavior to avoid scrolling on touch devices
    e.preventDefault();
    
    // Check if the event is a touch event
    var isTouch = e.type === 'touchmove';

    // Get the X coordinate of the event
    var x = isTouch ? e.touches[0].clientX : e.pageX;

    // Update the position of the basket
    basket.css('left', x);
}

// Bind both mousemove and touchmove events to the document
$(document).on('mousemove touchmove', handleMove);

// Bind touchstart event to prevent default behavior
$(document).on('touchstart', function(e) {
    e.preventDefault();
});

// Bind touchend event to stop tracking touchmove when touch ends
$(document).on('touchend', function() {
    // Remove touchmove event handler when touch ends
    $(document).off('touchmove', handleMove);
});

function egg_down(egg) {
    egg_current_position = parseInt(egg.css('top'));
    egg.css('top', egg_current_position + speed);
}

function check_egg_hits_floor(egg) {
    if (collision(egg, floor)) {
        show_bulls_eye(egg);
        decrement_life();
        return true;
    }
    return false;
}

function set_egg_to_initial_position(egg) {
    egg.css('top', egg_initial_position);
}

function show_bulls_eye(egg) {
    bullseye_num = egg.attr('data-bullseye');
    $('#bullseye' + bullseye_num).show();
    hide_bulls_eye(bullseye_num);
}

function hide_bulls_eye(bullseye_num) {
    setTimeout(function () {
        $('#bullseye' + bullseye_num).hide();
    }, 800);
}

function decrement_life() {
    life--;
	if(life<0){
		life=0
	}
    life_span.text(life);
}

function check_egg_hits_basket(egg) {
    if (collision(egg, basket)) {
        egg_top = parseInt(egg.css('top'));
        if (egg_top < basket_top) {
            update_score();
            return true;
        }
    }
    return false;
}

function update_score() {
    score++;
    if (score % 10 === 0 && speed <= max_speed) {
        speed++;
    }
    score_span.text(score);
    score_1.text(score);
}

function stop_the_game() {
    cancelAnimationFrame(anim_id);
    restart.slideDown();
}

restart.click(function () {
    location.reload();
});