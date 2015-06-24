var _args = arguments[0] || {};

var _user = Alloy.Models.instance('user');

(function init() {
	$.login.value = _user.get('login');
	$.pass.value = _user.get('password');
})();


function onClick() {
	_user.set({
		login: $.login.value,
		password: $.pass.value
	});
	
	_user.login()
	.then(function(data) {
		//удачно залогинились
		if(_args.open) {
			_args.open();
		}
	})
	.catch(function(err) {
		alert('не логиниться что-то');
		throw err;
	})
	.finally(function() {
		console.log('Finally');
	})
	.done();
	
}

