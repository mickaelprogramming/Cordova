function ConfigCtrl($scope) {
	$scope.tag = (conf.getTag()!=null)?conf.getTag():"";
	$scope.sujet = (conf.getSujet()!=null)?conf.getSujet():"";
	$scope.destinataire = (conf.getDestinataire()!=null)?conf.getDestinataire():"";

	$scope.updateConf = function() {
		updateDBConf($scope.tag, $scope.destinataire, $scope.sujet);

		conf.setTag($scope.tag);
		conf.setDestinataire($scope.destinataire);
		conf.setSujet($scope.sujet);
	}

/*	$scope.$watch('tag', function (newValue, oldValue) {
        conf.setTag(newValue);
    });

    $scope.$watch('destinataire', function (newValue, oldValue) {
        conf.setDestinataire(newValue);
    });

    $scope.$watch('sujet', function (newValue, oldValue) {
        conf.setSujet(newValue);
    });*/


/*	DbActionService.getCurrentConfEmail(function(tx) {
		tx.executeSql('SELECT * FROM CONFMAIL WHERE id=1',[],dbSuccess,dbError);
	});

	dbSuccess = function (tx, results) {
		alert(results.rows.item(0).tag);
		$scope.tag = results.rows.item(0).tag;
		alert("La récupération de la confMail s'est bien passée.");
	}

	dbError = function (err) {
		alert("Problème d'exécution SQL : " + err.code);
	}*/
}