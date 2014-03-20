$(document).ready(function() {
	var menu = getMenu();
	var categories = getCategories();
	
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
