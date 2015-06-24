"use strict";

//-------------------------------

var _q = require('q');

//-------------------------------

exports.definition = {
	config: {
		columns: {
	      name: 'String',
	      subtask: "Array"
	    },
	    defaults: function() {
			return {
				name: '',
				subtask: new Array() //чтобы по дефолту у каждого был свой массив
			};
		},
		adapter: {
			type: "properties",
			collection_name: "task"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here

			
			fetch: function(options) {
				options = options ? _.clone(options) : {};
				options.reset = true;
				
				var suc = options.success;
				
				var d = _q.defer();
				
				function success() {
					d.resolve();
					if(!!suc) {
						suc();
					}
				}
				
				options.success = success;
				
				Backbone.Collection.prototype.fetch.call(this, options);
				
				return d.promise; 
			}
			
		});

		return Collection;
	}
};
