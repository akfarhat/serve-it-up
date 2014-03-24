function getUrlVar(key){
	var result = new RegExp(key + "=([^&]*)", "i").exec(window.location.search); 
	if(result) {
		return decodeURIComponent(result[1].split("+").join("%20")); 
	}
	else {
		return "";
	}
}

function createModal(modalType)  {
  if(modalType === "submit") {

    $('#submitModal').modal('show');

    setTimeout(function() {
      $("#submitModal").modal('hide');
      }, 10000);
  }
  else if(modalType === "assistance") {
    $('#assistanceModal').modal('show');

    setTimeout(function() {
      $("#assistanceModal").modal('hide');
      }, 10000);
  } else if(modalType === "help")  {
    $('#helpModal').modal('show');
  }
}

function update() {
  $('#placeOrderButton').prop('disabled', true);
  $('#checkoutButton').prop('disabled', true);

	var menu = getMenu();
	var currentOrderContainer = $('#orderContainer ul').empty();
	var submittedItemsJSON = sessionStorage.getItem('submittedItems');
	var currentOrderJSON = sessionStorage.getItem('currentOrder');
	var total = 0;
	
	if(submittedItemsJSON) {
		var submittedItems = JSON.parse(submittedItemsJSON);
		
		for (var i = 0; i < submittedItems.length; i++) {
			var menuItem = getItem(submittedItems[i], menu);
			
			var submittedItemHTML = '' +
				'<li class="list-group-item submitted-item">' +
				'	<div class="row">' +
				'		<div class="col-md-7">' + menuItem.name + '</div>' +
				'		<div class="col-md-3">' + formatMoney(menuItem.price) + '</div>' +
				'	</div>' +
				'</li>';
			
			currentOrderContainer.append($.parseHTML(submittedItemHTML));
			total += menuItem.price;
		}
		
		if(submittedItems.length > 0) {
      $('#checkoutButton').prop('disabled', false);
			$('#checkoutButton').css('visibility','visible');
		}
	}
	
	if (currentOrderJSON) {
		var currentOrder = JSON.parse(currentOrderJSON);
    
    if(currentOrder.length > 0)
      $('#placeOrderButton').prop('disabled', false);
		
		for (var i = 0; i < currentOrder.length; i++) {
			var menuItem = getItem(currentOrder[i], menu);
			var removeButtonID = 'removeButton' + i;
			
			var orderItemHTML = '' +
				'<li class="list-group-item">' +
				    '<div class="row">' +
					 '<div class="col-md-7 item-name">' + menuItem.name + '</div>' +
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
	
	var menuListItems = [];
	
	if(getUrlVar('searchQuery')) {
		menuListItems = search(getUrlVar('searchQuery'));
		$('.current-category').html('Search Results for "' + getUrlVar('searchQuery') + '"');
	}
	else if(getUrlVar('selectedItem')) {
		menuListItems = [getItem(getUrlVar('selectedItem'), menuItems)];
		$('.current-category').html(getUrlVar('selectedItem'));
	} 
  else if(sessionStorage.getItem("category")) {
    var menu = getMenu();
    var category = sessionStorage.getItem("category");
     
    menuListItems = getCategoryItems(category, menu);
    $('.current-category').html(menuCategories[category]);   
	}
	
	var menuItemContainer = $('#menuItemContainer .list-group').empty();
	
	//sort menuListItems alphabetically by menu item name
	menuListItems.sort(function (a, b) {
		var aName = a.name.toLowerCase();
		var bName = b.name.toLowerCase();
		if (aName < bName) return -1;
		else if (aName > bName) return 1;
		else return 0;
	});
	
	//for each item in the category, add a list-group-item div containing the
	//menu item information to the menuItemContainer
	var n = menuListItems.length;
	
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
			'					<div class="col-md-5 pull-left item-name">' + menuListItems[i].name + '</div>' +
			'					<div class="col-md-5 click-expand">click to expand item information</div>' +
			'					<div class="col-md-2 pull-right item-price">' + formatMoney(menuListItems[i].price) + '</div>' +
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
			'				<img src="' + pathToImage(menuListItems[i].name) + '" class="menu-item-image">' +
			'			</div>' +
			'			<div class="col-md-9 menu-item-description-container">' +
			'				<span class="menu-item-description">' +
								menuListItems[i].description +
			'				</span>' +
			'			</div>' +
			'		</div>' +
			'		<div class="row">' +
			'			<div class="col-md-6">' +
			'				Rating: ' + menuListItems[i].rating + '/10 (' +
								menuListItems[i].numReviews + ' Reviews)' +
			'			</div>' +
			'			<div class="col-md-3 col-md-offset-3">' +
			'				<button type="button" class="btn btn-primary btn-block">' +
			'					Rate Item' +
			'				</button>' +
			'			</div>' +
			'		</div>' +
			'		<div class="row ingredients">' +
			'			<div class="col-md-12">' +
			'				Ingredients: ' + menuListItems[i].ingredients.join(", ") +
			'			</div>' +
			'		</div>' +
			'		<div class="row nutrition">' +
			'			<div class="col-md-3">' +
			'				Calories: ' + menuListItems[i].calories +
			'			</div>' +
			'			<div class="col-md-3">' +
			'				Fat: ' + menuListItems[i].fatGrams + ' g' +
			'			</div>' +
			'			<div class="col-md-3">' +
			'				Protein: ' + menuListItems[i].proteinGrams + ' g' +
			'			</div>' +
			'			<div class="col-md-3">' +
			'				Sodium: ' + menuListItems[i].sodiumMilligrams + ' mg' +
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
					
					currentOrder.push(menuListItems[index].name);
					currentOrderJSON = JSON.stringify(currentOrder);
					
					sessionStorage.setItem("currentOrder", currentOrderJSON);
					update();
				};	
		}(i));
	}
	
	$('#accordion').on('show.bs.collapse', function () {
		$('#accordion .in').collapse('hide');
	});
	
	/*$('#accordion').on('shown.bs.collapse', function () {
		$('#menuListContainer').animate({
			scrollTop: $('#accordion .in').parent().position().top
		}, 1000);
	});*/
	
	$('#placeOrderButton').on('click', function (e) {
		var currentOrderJSON = sessionStorage.getItem('currentOrder');
		var submittedItemsJSON = sessionStorage.getItem('submittedItems');
		
		if(currentOrderJSON && JSON.parse(currentOrderJSON).length > 0) {
			if(submittedItemsJSON && JSON.parse(submittedItemsJSON)) {
				var submittedItems = JSON.parse(submittedItemsJSON);
				var currentOrder = JSON.parse(currentOrderJSON);
				
				submittedItems = submittedItems.concat(currentOrder);
				submittedItemsJSON = JSON.stringify(submittedItems);
				
				sessionStorage.setItem('submittedItems', submittedItemsJSON);
			}
			else {
				sessionStorage.setItem('submittedItems', currentOrderJSON);
			}
			
			sessionStorage.removeItem('currentOrder');
			update();
		}
    
    createModal("submit");
	});
  
  $('#checkoutButton').on('click', function(e)  {
    window.location = "payment.html";
  });
  
  $('#assistBtn').on('click', function (e) {
    createModal("assistance");
  });
  $('#helpBtn').on('click', function (e) {
    createModal("help");
  });
});

