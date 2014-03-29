function log (message) {
	$.ajax({
        type : "POST",
        url : "/",
        data : message,
        dataType : "text"
    });
}

$('document').ready(function () {
	$('body').on('click', function (e) {
		if($(e.target).is('body, .modal')) {
			return;
		}
		var id = $(e.target).closest('a, .btn').attr('id') || 
				 $(e.target).closest('a, .btn').attr('class') || 
				 $(e.target).closest('a, .btn').attr('href');
		var currentDate = '[' + new Date().toUTCString() + '] ';
		log(currentDate + id + ' clicked at position x:' + e.pageX + ' y: ' + e.pageY);
	});
	/*
	$('#categoryContainer a').on('click', function (e) {
		var id = 'Category: ' + this.innerHTML();
		var currentDate = '[' + new Date().toUTCString() + '] ';
		log(currentDate + id + ' clicked at position x:' + e.pageX + ' y: ' + e.pageY);
	});
	
	$('#searchInput').on('click', function (e) {
		var id = 'Search field';
		var currentDate = '[' + new Date().toUTCString() + '] ';
		log(currentDate + id + ' clicked at position x:' + e.pageX + ' y: ' + e.pageY);
	});
	
	$('#assistBtn').on('click', function (e) {
		var id = 'Assistance button';
		var currentDate = '[' + new Date().toUTCString() + '] ';
		log(currentDate + id + ' clicked at position x:' + e.pageX + ' y: ' + e.pageY);
	});
	
	$('#helpBtn, #helpBtn .glyphicon').on('click', function (e) {
		var id = 'Help button';
		var currentDate = '[' + new Date().toUTCString() + '] ';
		log(currentDate + id + ' clicked at position x:' + e.pageX + ' y: ' + e.pageY);
	});
	
	$('.carousel-caption').on('click', function (e) {
		var id = 'Featured item';
		var currentDate = '[' + new Date().toUTCString() + '] ';
		log(currentDate + id + ' clicked at position x:' + e.pageX + ' y: ' + e.pageY);
	});
	
	$('.breadcrumb a').on('click', function (e) {
		var id = e.target.html() + ' breadcrumb';
		var currentDate = '[' + new Date().toUTCString() + '] ';
		log(currentDate + id + ' clicked at position x:' + e.pageX + ' y: ' + e.pageY);
	});
	
	$('#menuItemContainer .list-group-item .btn, #menuItemContainer .list-group-item .btn .glyphicon').on('click', function (e) {
		if($(e.target).is('.btn')) {
			var id = 'Add button ' + e.target.id;
		}
		else {
			var id = 'Duplicate: Add button ' + $(e.target).parent().attr('id');
		}
		var currentDate = '[' + new Date().toUTCString() + '] ';
		log(currentDate + id + ' clicked at position x:' + e.pageX + ' y: ' + e.pageY);
	});
	
	$('#currentOrderContainer .btn, #currentOrderContainer .glyphicon').on('click', function (e) {
		if($(e.target).is('.btn')) {
			var id = 'Remove button ' + e.target.id;
		}
		else {
			var id = 'Duplicate: Remove button ' + $(e.target).parent().attr('id');
		}
			
		var currentDate = '[' + new Date().toUTCString() + '] ';
		log(currentDate + id + ' clicked at position x:' + e.pageX + ' y: ' + e.pageY);
	});
	
	$('#placeOrderButton').on('click', function (e) {
		var id = 'Place Order button';
			
		var currentDate = '[' + new Date().toUTCString() + '] ';
		log(currentDate + id + ' clicked at position x:' + e.pageX + ' y: ' + e.pageY);
	});
	
	$('#checkoutButton').on('click', function (e) {
		var id = 'Checkout button';
			
		var currentDate = '[' + new Date().toUTCString() + '] ';
		log(currentDate + id + ' clicked at position x:' + e.pageX + ' y: ' + e.pageY);
	});
	*/
});