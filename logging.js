function log (message) {
	$.ajax({
        type : "POST",
        url : "/",
        data : message,
        dataType : "text"
    });
}

$('document').ready(function () {
	var selectors = '.btn, #searchInput, #categoryContainer a';
	$(selectors).on('click', function (e) {
		var id = e.target.id;
		var currentDate = '[' + new Date().toUTCString() + '] ';
		log(currentDate + id + ' clicked at position x:' + e.pageX + ' y: ' + e.pageY);
	});
	
	$('.carousel-caption a').on('click', function (e) {
		var id = 'Featured item';
		var currentDate = '[' + new Date().toUTCString() + '] ';
		log(currentDate + id + ' clicked at position x:' + e.pageX + ' y: ' + e.pageY);
	});
	
	$('.breadcrumb a').on('click', function (e) {
		var id = e.target.html() + ' breadcrumb';
		var currentDate = '[' + new Date().toUTCString() + '] ';
		log(currentDate + id + ' clicked at position x:' + e.pageX + ' y: ' + e.pageY);
	});
});