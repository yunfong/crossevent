CrossEvent
----------
a jQuery plugin for compatible MouseEvent and TouchEvent


usage:

Listener element click or tap :

    $(element).tapclick(function(e){
        alert('tap or click me');
    })
    
    
binding element mouse or touch event:

    $(element)
      .mousedown(function(){
          console.log('mousedown or touchstart');
      })
      .mousemove(function(){
          console.log('mousemove or touchmove');
      })
      .mouseup(function(){
          console.log('mouseup or touchend');
      });

