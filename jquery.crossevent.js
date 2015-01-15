(function($){
	var eventMap = {
		touchstart:'mousedown',
		touchmove:'mousemove',
		touchend:'mouseup'
	};
		
	function __touchHandler(event) {

        var touches = event.changedTouches,
            first = touches[0],
            type = eventMap[event.type];
		
		if(!type){
			return;
		}
		
        var mouseEvent = document.createEvent("MouseEvent");
        mouseEvent.initMouseEvent(type, true, true, window, 1,
            first.screenX, first.screenY,
            first.clientX, first.clientY, false,
            false, false, false, 0, null);


        mouseEvent.isTouch = true;
        if (touches.length < 2) {
            event.preventDefault();
            event.stopPropagation();
            first.target.dispatchEvent(mouseEvent);
        }
    }

	$(document).on('touchstart touchmove touchend',__touchHandler);
	
	$.fn.tapclick = function (onclick) {
		if(!onclick){
			if(isTouch){
				this.trigger('mousedown');
			}else{
				this.trigger('click');
			}
			return this;
		}

		if(isTouch){
			this.on('mousedown',onclick);
		}else{
			this.on('click',onclick);
		}
		return this;
	};
})(jQuery);