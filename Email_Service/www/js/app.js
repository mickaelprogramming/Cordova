db = window.openDatabase("DBEmailService","1.0","Email Service DB", 200000);

var Conf = function(tag, destinataire, sujet) {
	this.tag = tag;
	this.destinataire = destinataire;
	this.sujet = sujet;
}

Conf.prototype = {
	getTag : function() {
		return this.tag;
	},

	getDestinataire : function () {
		return this.destinataire;
	},

	getSujet : function() {
		return this.sujet;
	},

	setTag : function(tag) {
		this.tag = tag;
	},	

	setDestinataire : function(destinataire) {
		this.destinataire = destinataire;
	},	

	setSujet : function(sujet) {
		this.sujet = sujet;
	}
}

conf = new Conf(null,null,null);
dbreferences = new Array();
showHomePanel = 0;

document.addEventListener('deviceready', onDeviceReady, false);
var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider) {
	$routeProvider
		.when('/home', {templateUrl: 'partials/home.html'})
		.when('/config', {templateUrl: 'partials/config.html'})
		.otherwise({ redirectTo: '/home' })
})

/*app.factory('DbActionService', function($window, $q, $rootScope) {
	var db = window.openDatabase("DBEmailService","1.0","Email Service DB", 200000);

	return {
		getCurrentConfEmail : function(queryDB) {
			db.transaction(function(tx){
				$rootScope.$apply(function(){
					queryDB(tx);
				})			
			});
			return true;
		}
	}
});


app.service('sharedParams', [function () {
	var confemail = null;
	return {
		getCurrentConfEmail: function() {
			if(confemail != null) {
				return confemail;
			} else {
				this.initConfEmail();
				return confemail;
			}
			
		},

		setConfEmail: function(value) {
			confemail = value;
		},

		initConfEmail : function() {
			var db = window.openDatabase("DBEmailService","1.0","Email Service DB", 200000);
			db.transaction(function(tx) {
				tx.executeSql('SELECT * FROM CONFMAIL WHERE id=1'
							  , []
							  , function(tx, results) {
									alert(results.rows.item(0).tag);
									confemail = results.rows.item(0);
									alert("La récupération de la confMail s'est bien passée.");
							    }
							  , function(err) {
									alert("Problème d'exécution SQL : " + err.code);
						  	    }
							  )
			});
		}
	}
}]);*/

function onDeviceReady() {
	db.transaction(populateDB, errorCB, successCB);

	//Récupère le service créé par app
	/*var $inj = angular.injector(['app']);
	sharedParams = $inj.get('sharedParams');*/

	//Récpère la conf de la base
	db.transaction(function(tx) {
		tx.executeSql('SELECT * FROM CONFMAIL WHERE id=1',[],dbConfSuccess,dbConfError);
	});

	dbConfSuccess = function (tx, results) {
		conf.setTag(results.rows.item(0).tag);
		conf.setDestinataire(results.rows.item(0).destinataire);
		conf.setSujet(results.rows.item(0).sujet);
	}

	dbConfError = function (err) {
		alert("Problème d'exécution SQL : " + err.code);
	}

	//récupère les références en base
	db.transaction(function(tx) {
		tx.executeSql('SELECT * FROM DATAREFERENCES',[],dbRefSuccess,dbRefError);
	});

	dbRefSuccess = function (tx, results) {
		var len = results.rows.length;
		for (var i=0; i<len; i++){
			dbreferences.push({"reference": results.rows.item(i).reference})
		}
	}

	dbRefError = function (err) {
		alert("Problème d'exécution SQL : " + err.code);
	}
}

