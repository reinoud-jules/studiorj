/* ===================================== */
/* >>>>>>>> STRING & NUMBER methods
/* ===================================== */



/* If Less Then Equal. Specify the cutoff point.
	Example: 
		var limit_me = 80;
		limit_me.ilte(55);
		console.log(iltl); // logs 80.
		limit_me.ilte(125);
		console.log(iltl); // logs 125, becuase it was below 125
		
*/

Number.prototype.ilte = function(cutoff) {
    if(this.valueOf() < cutoff) {
		return cutoff;
	} else {
		return this.valueOf();
	}
};

/* If Greater Then Equal. Specify the cutoff point.
	Example: 
		var limit_me = 80;
		limit_me.igte(55);
		console.log(iltl); // logs 55.
		limit_me.igte(125);
		console.log(iltl); // logs 80
		
*/

Number.prototype.igte = function(cutoff) {
     if(this.valueOf() > cutoff) {
		return cutoff;
	} else {
		return this.valueOf();
	}
};



/* ===================================== */
/* >>>>>>>> Aspect Box Fit
/* >>>>>>>> V 1.0
/* >>>>>>>> Dec 4 2015
/* >>>>>>>> Made with pleasure by
/* >>>>>>>> Studio Reinoud en Jules
/* >>>>>>>> www.reinoud-jules.nl
/* ===================================== */
/* ===================================== */
/* Usage:
	
	$("section#listing article").aspectBoxFit();
	
	This will find all images inside each article and scale it to exactly fit the selected element
	which, in this case, is every article in section#listing. It will add absolute positioning to 
	the image, relative positioning to it's parent. 
	
	
	opts {
		alignment: 'left' : 'center' : 'right' // defaults to 'center'
	}

/* ===================================== */


(function ( $ ) {
 
    $.fn.aspectBoxFit = function(opts) {
		
		opts = create_opts(opts, this);
		
		
		this.css({
			position: 'relative',
			overflow: 'hidden'
		});
		
		var imgs = this.find("img");
		var box_h = this.outerHeight();
		var box_w = this.outerWidth();
		
		for(var i = 0; i < imgs.length; i++) {
			var img = imgs[i];
			var img_asp;
			var img_natural = new Image();
			img_natural.id = i;
			$(img).attr("data-aspectboxfit-id", i);
						
			img_natural.onload = function() {
				img_asp = this.width / this.height;
				
				var tar_w;
				var tar_h;
				var tar_top;
				var tar_left;
				
				if(box_w / box_h < img_asp) {
					tar_w = box_w;
					tar_h = box_w / img_asp;
					if(tar_h < box_h) {
						tar_h = box_h;
						tar_w = box_h * img_asp;
					}
					tar_top = 0;
					tar_left = -((tar_w - box_w) / 2);
				} else {
					tar_w = box_w;
					tar_h = box_w / img_asp;
					tar_top = -((tar_h - box_h) / 2);
					tar_left = 0;
				}
				
				switch(opts.alignment) {
					case 'left' :
					tar_left = 0;
					break;
					case 'right' :
					tar_left = box_w - tar_w;
					break;
					default :
					break;
				}
				
				$(imgs[this.id]).css({
					position: 'absolute',
					top: tar_top,
					left: tar_left,
					height: tar_h,
					width: tar_w
				});
			}
			
			img_natural.src = img.src;
			
		}
        
        return true;
    };
    
    function create_opts(opts, $box) {
	    var alignments = ['left', 'center', 'right'];
	    
	    if(opts === undefined) {
		    opts = {};
	    }
	    
	    if(opts.alignment === undefined) {
		    if(alignments.indexOf($box.attr('data-aspectboxfit-align')) != -1) {
			    opts.alignment = $box.attr('data-aspectboxfit-align');
		    } else {
			    opts.alignment = 'center';
		    }
	    }
	    
	    console.log(opts);
	    return opts;
    }
 
}( jQuery ));