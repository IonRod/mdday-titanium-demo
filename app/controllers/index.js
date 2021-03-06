
var _user = Alloy.Models.instance('user');

var _tasks = Alloy.createCollection('task');

(function init() {
	
	if(_user.isLogin()) {
		console.log('loggined');
		open();
	} else {
		console.log('not loggined');
		var login = Alloy.createController('login', {
			open: open
		});
		login.getView().open();
	}
	
	_tasks.on('add', updateUI);
	
	
	//useing callback to load collection
	//_tasks.fetch({
	//	success: updateUI
	//});
	
	//using promise to load collection
	
})();


function open() {
	$.win.open();	
}

//---------------------------
function onRelease(e) {
	_tasks.fetch() 
	.then(updateUI)
	.finally(function() {
		e.hide();
	});
}


function onClick(e) {
	console.log('Clicked');
	console.log(e);
}

function onAdd() {
	var model = Alloy.createModel('task', {
		name: $.text.value
	});
	model.save();
	_tasks.add(model);
}

//---------------------------

function updateUI() {
	$.section.setItems(makeViews());
}

function makeTemplate(item, idx) {
	var color = idx % 2 ? "#ffbbcc" : "#ccbbff";
	
	return {
		name: {
			text: item.get('name'),
		},
		background: {
			backgroundColor: color
		}
	};
}

function makeViews() {
	return _.map(_tasks.models, makeTemplate);
}
