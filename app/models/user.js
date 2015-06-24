"use strict";

//-------------------------------

var _q = require('q');

//-------------------------------

exports.definition = {
	config: {
		columns: {
	       login: "String",
	       password: "String",
	       isLogin: "Boolean"
	    },
	    defaults: function() {
			return {
				login: "1",
				password: "2",
				isLogin: false
			};
		},
		adapter: {
			type: "properties",
			collection_name: "user"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
			login: function() {
				var that = this;
				var d = _q.defer();
				
				_.defer(function() {
					if(that.get('password') == "2") {
						that.set({isLogin: true});
						that.save();
						d.resolve({data: 'lalala'});
					} else {
						d.reject({error: 'Reason'});
					}
				});
				
				return d.promise;
			},
			isLogin: function() {
				return this.get('isLogin');
			},
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here

			// For Backbone v1.1.2, uncomment the following to override the
			// fetch method to account for a breaking change in Backbone.
			/*
			fetch: function(options) {
				options = options ? _.clone(options) : {};
				options.reset = true;
				return Backbone.Collection.prototype.fetch.call(this, options);
			}
			*/
		});

		return Collection;
	}
};
