
jQuery.fn.center = function () {
    this.css("position","absolute");
    this.css("top", (($(window).height() - this.height()) / 2) + "px");
    this.css("left", (($(window).width() - this.width()) / 2) + "px");
    return this;
}

// $('img.photo',this).imagesLoaded(myFunction)
// execute a callback when all images have loaded.
// needed because .load() doesn't work on cached images

// mit license. paul irish. 2010.
// webkit fix from Oren Solomianik. thx!

// callback function is passed the last image to load
//   as an argument, and the collection as `this`


$.fn.imagesLoaded = function(callback){
  var elems = this.filter('img'),
      len   = elems.length,
      blank = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
      
  elems.bind('load.imgloaded',function(){
      if (--len <= 0 && this.src !== blank){ 
        elems.unbind('load.imgloaded');
        callback.call(elems,this); 
      }
  }).each(function(){
     // cached images don't fire load sometimes, so we reset src.
     if (this.complete || this.complete === undefined){
        var src = this.src;
        // webkit hack from http://groups.google.com/group/jquery-dev/browse_thread/thread/eee6ab7b2da50e1f
        // data uri bypasses webkit log warning (thx doug jones)
        this.src = blank;
        this.src = src;
     }  
  }); 

  return this;
};


$(document).ready(function() {
	setTimeout("$('.logo img').center();", 50);
	$('#logo-ring img').imagesLoaded(setTimeout("callReady();",100));
});

function callReady()
{
	$('.logo img').center();
	$('#logo-ring img').cssAnimate({transform:"scale(1,1)"},2000, 'swing').cssAnimate({transform:"rotate(10deg)"},300, 'fadeIn');
	$('body').delay(1900).animate({'backgroundColor':'#ffffff'}, 300).animate({'backgroundColor':'#333333'}, 300);
	$('#logo-skull-healed').delay(2100).fadeOut(1);
	$('#logo-skull').delay(2100).fadeIn(1);
}