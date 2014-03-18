
function getItem(itemName, menu) {
	var n = menu.length;
	for (var i=0; i < n; i++) {
		if (menu[i].name === itemName) {
			return menu[i];
		}
	}
	return null;
}

function getCategoryItems(categoryName, menu) {
	var n = menu.length;
	var items = [];
	
	for (var i=0; i < n; i++) {
		if (menu[i].category === categoryName) {
			items.append(menu[i]);
		}
	}
	
	return items;
}

