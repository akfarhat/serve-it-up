menuCategories = {"appetizer":"Appetizers","entree":"Entrees","side":"Sides","dessert":"Desserts","beverage":"Beverages"};

menuItems = [
	{
		"name": "Chicken Parmesan",
		"category": "entree",
		"price": 12.99,
		"description": "Breaded chicken breasts baked with provolone cheese and marinara sauce",
		"rating": 8.5,
		"numReviews": 115,
		"ingredients": ["chicken","cheese","tomato","salt","pepper"],
		"calories": 700,
		"fatGrams": 14,
		"proteinGrams": 3,
		"sodiumMilligrams": 25,
		"vegetarian": false,
		"gluten-free": false,
		"lactose-free": false,
		"nut-free": true
	},
	{
		"name": "Double Chicken Burger",
		"category": "entree",
		"price": 9.99,
		"description": "Burger with two pieces of fried chicken breast, served in a white bun",
		"rating": 6.5,
		"numReviews": 40,
		"ingredients": ["white bread","chicken","cheese","tomato","lettuce","salt","pepper"],
		"calories": 500,
		"fatGrams": 10,
		"proteinGrams": 3,
		"sodiumMilligrams": 20,
		"vegetarian": false,
		"gluten-free": false,
		"lactose-free": false,
		"nut-free": true
	},
	{
		"name": "Garden Salad",
		"category": "appetizer",
		"price": 4.99,
		"description": "Salad made from garden vegetables",
		"rating": 7.0,
		"numReviews": 100,
		"ingredients": ["lettuce","cucumber","tomato","salt","pepper","olive oil"],
		"calories": 200,
		"fatGrams": 2,
		"proteinGrams": 3,
		"sodiumMilligrams": 15,
		"vegetarian": true,
		"gluten-free": true,
		"lactose-free": true,
		"nut-free": true
	},
	{
		"name": "Lamb chops",
		"category": "entree",
		"price": 14.99,
		"description": "Seared chops of rosemary-marinated lamb, served with a butter sauce",
		"rating": 9.5,
		"numReviews": 200,
		"ingredients": ["lamb","lemon","rosemary","salt","pepper", "butter"],
		"calories": 600,
		"fatGrams": 14,
		"proteinGrams": 5,
		"sodiumMilligrams": 25,
		"vegetarian": false,
		"gluten-free": true,
		"lactose-free": false,
		"nut-free": true
	},
	{
		"name": "Salmon, Lemon & Herb",
		"category": "entree",
		"price": 10.99,
		"description": "Filets of salmon with garlic and a balsamic vinaigrette on a bed of potatoes",
		"rating": 4.5,
		"numReviews": 115,
		"ingredients": ["salmon","balsamic vinegar","garlic","salt","pepper", "potato", "butter"],
		"calories": 400,
		"fatGrams": 6,
		"proteinGrams": 8,
		"sodiumMilligrams": 10,
		"vegetarian": false,
		"gluten-free": true,
		"lactose-free": false,
		"nut-free": true
	},
	{
		"name": "Raspberry Rose Sensation",
		"category": "dessert",
		"price": 7.99,
		"description": "Ice cream on a graham crust with chocolate and raspberry cream",
		"rating": 10.0,
		"numReviews": 76,
		"ingredients": ["vanilla ice cream","graham cracker","dark chocolate","raspberry","cream"],
		"calories": 300,
		"fatGrams": 6,
		"proteinGrams": 8,
		"sodiumMilligrams": 10,
		"vegetarian": true,
		"gluten-free": true,
		"lactose-free": false,
		"nut-free": true
	},
	{
		"name": "French Fries",
		"category": "side",
		"price": 3.99,
		"description": "Classic home-made french fries, served with ketchup",
		"rating": 8.0,
		"numReviews": 400,
		"ingredients": ["potato","peanut oil","salt","pepper","ketchup"],
		"calories": 200,
		"fatGrams": 20,
		"proteinGrams": 3,
		"sodiumMilligrams": 40,
		"vegetarian": true,
		"gluten-free": true,
		"lactose-free": true,
		"nut-free": false
	}
];

function getMenu() {
	return menuItems;
}

function getCategories() {
	return menuCategories;
}

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
			items.push(menu[i]);
		}
	}
	
	return items;
}
	