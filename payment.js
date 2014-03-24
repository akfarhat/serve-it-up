function updatePrice() {
  var itemJSON = sessionStorage.getItem("submittedItems");
  var total = 0;
  
  //if there are items in the order then get them
  if(itemJSON){
    var menu = getMenu();
    var items = JSON.parse(itemJSON);
    
    for (var i=0; i<items.length; i++) {
      total += getItem(items[i], menu).price;
    }
    
    total = total*1.13;
    var tip = parseFloat($('#tipAmountVal').val());
    var tipType = $('#tipTypeVal').val();
    
    if(tip > 0)  {
      if(tipType === "%") {
        total *= (1 + tip/100);
      }
      else if(tipType === "$")  {
        total += tip;
      }
    }
  }
    
  $('#totalPrice').html(formatMoney(total));
}

function createModal(modalType)  {
  if(modalType === "payment") {

    $('#paymentModal').modal('show');

    setTimeout(function() {
      $("#paymentModal").modal('hide');
      window.location = "index.html";
      }, 10000);
  }
  else if(modalType === "assistance") {
    $('#assistanceModal').modal('show');

    setTimeout(function() {
      $("#assistanceModal").modal('hide');
      }, 10000);
  } 
  else if(modalType === "help")  {
    $('#helpModal').modal('show');
  }
}

function initialize()  {
  $('#payNowButton').prop('disabled', true);
  $('#tipAmountVal').val(15);

  var menu = getMenu();
  var itemJSON = sessionStorage.getItem("submittedItems");
  
  //if there are items in the order then get them
  if(itemJSON){
    var items = JSON.parse(itemJSON);
    var submittedItems = [];
    
    if(items.length > 0)
      $('#payNowButton').prop('disabled', false);
    
    for(var i=0; i<items.length; i++)  {
      submittedItems.push(getItem(items[i], menu));
    }
    
    var itemContainer = $('#orderItemContainer .list-group').empty();
    
    //sort menuListItems alphabetically by menu item name
    submittedItems.sort(function (a, b) {
      var aName = a.name.toLowerCase();
      var bName = b.name.toLowerCase();
      if (aName < bName) return -1;
      else if (aName > bName) return 1;
      else return 0;
    });
    
    //for each item in the category, add a list-group-item div containing the
    //menu item information to the menuItemContainer
    var n = submittedItems.length;
    
    //if there are no items in the category
    if(n === 0) {
      var noItemsHTML = '' +
        '<div class="row list-group-item list-group-item-danger">' +
        '	<div class="col-md-12">' +
        '		<span class="glyphicon glyphicon-info-sign"></span> No items to pay for.' +
        '	</div>' +
        '</div>';
        
      itemContainer.append($.parseHTML(noItemsHTML));
    }
    
    var total = 0;
    
    for (var i=0; i<n; i++) {
      total += submittedItems[i].price;
      var itemHTML = '' +
        '<li class="list-group-item">' +
        '	<div class="row">' +
        '			<div class="col-md-12">' +
        '				<div class="row">' +
        '					<div class="col-md-10 pull-left item-name">' + submittedItems[i].name + '</div>' +
        '					<div class="col-md-2 pull-right item-price">' + formatMoney(submittedItems[i].price) + '</div>' +
        '				</div>' +
        '			</div>' +
        '	</div>' +
        '</li>';
        
      itemContainer.append($.parseHTML(itemHTML));
    }
    
    total = total*1.13;
      
    var tip = parseFloat($('#tipAmountVal').val());
    var tipType = $('#tipTypeVal').val();
    
    if(tip > 0)  {
      if(tipType === "%") {
        total *= (1 + tip/100);
      }
      else if(tipType === "$")  {
        total += tip;
      }
    }
    
    $('#totalPrice').html(formatMoney(total));
  }
}

$(document).ready(function() {
	
	initialize();
    
  $('#tipAmountVal').on('change', function()  {
    updatePrice();
  });
  $('#tipTypeVal').on('change', function()  {
    updatePrice();
  });
  $('#payNowButton').on('click', function()  {
    sessionStorage.clear();
    $('#orderItemContainer .list-group').empty();
    updatePrice();
    createModal("payment");
  });
  $('#assistBtn').on('click', function() {
    createModal("assistance");
  });
  $('#helpBtn').on('click', function() {
    createModal("help");
  });
});

