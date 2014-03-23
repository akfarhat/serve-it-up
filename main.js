$(document).ready(function() {
	var menu = getMenu();
	var categories = getCategories();
	var featuredItems = getFeaturedItems(5);
	
	var carouselContainer = $('#myCarousel .carousel-inner').empty();
	var carouselIndicatorContainer = $('#myCarousel .carousel-indicators').empty();
	
	for (var i=0; i < featuredItems.length; i++) {
	
		var carouselItemHTML = '' +
		'	<div class="item' + (i===0? ' active':'') + '">' +
        '  		<div class="container">' +
        '    		<div class="carousel-caption">' +
		'				<a href="order.html?selectedItem=' + encodeURIComponent(featuredItems[i].name) + '">'+
		'	  				<img src="' + pathToImage(featuredItems[i].name) + '">' +
        '      				<h3>' + featuredItems[i].name + '</h3>' +
		'				</a>' +
        '    		</div>' +
        '  		</div>' +
        '	</div>';
		
		var carouselIndicatorHTML = '' +
		'	<li data-target="#myCarousel" data-slide-to="' + i + '"' + 
				(i===0? ' class="active"':'') + '></li>';
		
		
		carouselContainer.append($.parseHTML(carouselItemHTML));
		carouselIndicatorContainer.append($.parseHTML(carouselIndicatorHTML));
	}
	
	var categoryContainer = $('#categoryContainer > .row').empty();
	var first = true;
	for (var key in categories) {
		if (categories.hasOwnProperty(key)) {
			var buttonID = key + "Button";
			if(first) {
				var categoryHTML = '' + 
					'<div class="col-md-2 col-md-offset-1 category">' +
					'   <a id="' + buttonID + '" href="order.html">' +
					'		<button class="btn btn-default btn-block">' +
								categories[key] 
					'		</button>' +
					'	</a>' + 
					'</div>';
				
				first = false; 
			}
			else {
				var categoryHTML = '' + 
					'<div class="col-md-2 category">' +
					'   <a id="' + buttonID + '" href="order.html">' +
					'		<button class="btn btn-default btn-block">' +
								categories[key]
					'		</button>' +
					'	</a>' +
					'</div>';
			}

			categoryContainer.append($.parseHTML(categoryHTML));
			
			$('#' + buttonID).on('click', function (k) {
			    return function (e) {
					sessionStorage.setItem("category", k);
				};	
			}(key));
		}
	}
	
	
	
});
