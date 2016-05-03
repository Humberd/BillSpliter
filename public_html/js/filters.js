var app = angular.module("bsApp");
app.filter("shortPerson", function () {
	return function (id, pool) {
		for (p in pool) {
			if (pool[p].id == id) {
				return pool[p].name[0].toUpperCase();
			}
		}
		return id;
	};
});
