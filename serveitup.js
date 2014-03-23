
function formatMoney(money) {
	if((typeof money == "string" || money instanceof String)) {
		if(money.charAt(0) == '$') {
			return money;
		}
		else {
			return null;
		}
	}
	else if (typeof money == "number"){
		return '$' + money.toFixed(2);
	}
}

function pathToImage(name) {
	return encodeURIComponent('imgs/' + name + '.jpg');
}

function update() {
	var menu = getMenu();
	var currentOrderContainer = $('#orderContainer ul').empty();
	var currentOrderJSON = sessionStorage.getItem("currentOrder");
	var total = 0;
	
	if (currentOrderJSON) {
		var currentOrder = JSON.parse(currentOrderJSON);
		
		for (var i = 0; i < currentOrder.length; i++) {
			var menuItem = getItem(currentOrder[i], menu);
			var removeButtonID = 'removeButton' + i;
			
			var orderItemHTML = '' +
				'<li class="list-group-item">' +
				    '<div class="row">' +
					 '<div class="col-md-7">' + menuItem.name + '</div>' +
					  '<div class="col-md-3">' + formatMoney(menuItem.price) + '</div>' +
					  '<div class="col-md-2">' +
					    '<button type="button" id="' + removeButtonID + '" class="btn">' +
						  '<span class="glyphicon glyphicon-remove"></span>' +
						'</button>' +
					  '</div>' +
					'</div>' +
				  '</li>';
			
			var orderItem = $.parseHTML(orderItemHTML);
			currentOrderContainer.append(orderItem);
			total += menuItem.price;
			
			$('#' + removeButtonID).on('click', function (index) {
			    return function (e) {
					var currentOrderJSON = sessionStorage.getItem("currentOrder");
					var currentOrder = [];
					
					//if there are already items in the order then get them
					if(currentOrderJSON){
						currentOrder = JSON.parse(currentOrderJSON);
						currentOrder.splice(index, 1);
						currentOrderJSON = JSON.stringify(currentOrder);
				
						sessionStorage.setItem("currentOrder", currentOrderJSON);
						update();
					}
				};	
			}(i));
		}
	}
	
	$('#totalPrice').html(formatMoney(total));
}

$(document).ready(function() {
	update();
	
	var menu = getMenu();
	var category = sessionStorage.getItem("category");
	
	$('.current-category').html(menuCategories[category]);
	
	var categoryItems = getCategoryItems(category, menu);
	var menuItemContainer = $('#menuItemContainer .list-group').empty();
	
	//sort categoryItems alphabetically by menu item name
	categoryItems.sort(function (a, b) {
		var aName = a.name.toLowerCase();
		var bName = b.name.toLowerCase();
		if (aName < bName) return -1;
		else if (aName > bName) return 1;
		else return 0;
	});
	
	//for each item in the category, add a list-group-item div containing the
	//menu item information to the menuItemContainer
	var n = categoryItems.length;
	
	//if there are no items in the category
	if(n === 0) {
		var noItemsHTML = '' +
			'<div class="row list-group-item list-group-item-danger">' +
			'	<div class="col-md-12">' +
			'		<span class="glyphicon glyphicon-info-sign"></span> No items available in this category.' +
			'	</div>' +
			'</div>';
			
		menuItemContainer.append($.parseHTML(noItemsHTML));
	}
	
	for (var i=0; i < n; i++) { 
		var addButtonID = "addButton" + i;
	
		var menuItemHTML = '' +
			'<li class="list-group-item">' +
			'	<div class="row">' +
			'		<a href="#collapse' + i + '" data-toggle="collapse">' +
			'			<div class="col-md-11">' +
			'				<div class="row">' +
			'					<div class="col-md-5 pull-left item-name">' + categoryItems[i].name + '</div>' +
			'					<div class="col-md-5">Click to expand item information</div>' +
			'					<div class="col-md-2 pull-right item-price">' + formatMoney(categoryItems[i].price) + '</div>' +
			'				</div>' +
			'			</div>' +
			'		</a>' +
			'		<div class="col-md-1">' +
			'			<button type="button" id="' + addButtonID + '" class="btn btn-lg pull-right menu-item-add">' +
			'				<span class="glyphicon glyphicon-plus"></span>' +
			'			</button>' +
			'		</div>' +
			'	</div>' +
			'	<div id="collapse' + i + '" class="panel-collapse collapse">' +
			'		<div class="row">' +
			'			<div class="col-md-3">' +
			'				<img src="' + pathToImage(categoryItems[i].name) + '" class="menu-item-image">' +
			'			</div>' +
			'			<div class="col-md-9">' +
			'				<span class="menu-item-description">' +
								categoryItems[i].description
			'				</span>' +
			'			</div>' +
			'		</div>' +
			'	</div>' +
			'</li>';
			
		menuItemContainer.append($.parseHTML(menuItemHTML));
		
		$('#' + addButtonID).on('click', function (index) {
			    return function (e) {
					var currentOrderJSON = sessionStorage.getItem("currentOrder");
					var currentOrder = [];
					
					//if there are already items in the order then get them
					if(currentOrderJSON){
						currentOrder = JSON.parse(currentOrderJSON);
					}
					
					currentOrder.push(categoryItems[index].name);
					currentOrderJSON = JSON.stringify(currentOrder);
					
					sessionStorage.setItem("currentOrder", currentOrderJSON);
					update();
				};	
		}(i));
	}
	
	$('#accordion').on('show.bs.collapse', function () {
		$('#accordion .in').collapse('hide');
	});
});

