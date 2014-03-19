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
					'   <a href="order.html">' +
					'		<button id="' + buttonID + '" class="btn btn-default btn-block">' +
								categories[key] 
					'		</button>' +
					'	</a>' + 
					'</div>';
				
				first = false; 
			}
			else {
				var categoryHTML = '' + 
					'<div class="col-md-2 category">' +
					'   <a href="order.html">' +
					'		<button id="' + buttonID + '" class="btn btn-default btn-block">' +
								categories[key]
					'		</button>' +
					'	</a>' +
					'</div>';
			}

			categoryContainer.append($.parseHTML(categoryHTML));
			
			$('#' + buttonID).on('click', function (e) {
			    return function () {
					sessionStorage.setItem("category", key);
				};	
			});
		}
	}
	
	
	
});
