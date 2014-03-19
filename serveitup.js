
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

$(document).ready(function() {
	var menu = getMenu();
	var category = sessionStorage.getItem("category");
	var categoryItems = getCategoryItems(category, menu);
	var menuItemContainer = $('#menuItemContainer > .list-group').empty();
	
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
	for (var i=0; i < n; i++) {
		var menuItem = '' +
			'<div class="row list-group-item">' +
			'	<div class="col-md-10">' +
			'		<div class="row">' +
			'			<div class="col-md-6 pull-left item-name">' + categoryItems[i].name + '</div>' +
			'			<div class="col-md-4">Click to expand item information</div>' +
			'			<div class="col-md-2 pull-right item-price">' + formatMoney(categoryItems[i].price) + '</div>' +
			'		</div>' +
			'	</div>' +
			'	<div class="col-md-2">' +
			'		<button type="button" class="btn btn-lg pull-right menu-item-add">' +
			'			<span class="glyphicon glyphicon-plus"></span>' +
			'		</button>' +
			'	</div>' +
			'</div>';
			
		menuItemContainer.append($.parseHTML(menuItem));
	}
});

