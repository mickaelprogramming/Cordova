function EmailCtrl($scope) {

	$scope.panel = showHomePanel;

	$scope.references = dbreferences;

	$scope.commencer = function() {
		$scope.panel = 1;
		showHomePanel = 1;
	}

	$scope.retourHome = function () {
		$scope.panel = 1;
	}

	$scope.createEmail = function(reference) {
		$scope.panel = 2;
		$scope.nouvref = reference;
	}

	$scope.addAndCreateEmail = function() {
		if($scope.filtre != null && $scope.filtre != "") {
			updateDBReference($scope.filtre);
			$scope.panel = 2;
			$scope.references.push({"id":1, "reference": $scope.filtre});
			$scope.nouvref = $scope.filtre;
			$scope.filtre = "";
		} else {
			alert("Veuillez entrer une référence.");
		}
	}

	$scope.envoyer = function() {
		var destinataires = (conf.getDestinataire()!=null)?conf.getDestinataire():" ";
		var sujet = (conf.getSujet()!=null)?conf.getSujet().replace(conf.getTag(),$scope.nouvref):" ";
		var objet = $scope.objet;

		var mail = "mailto:" + destinataires 
		+ "?subject=" + encodeURIComponent(sujet)
		+ "&body=" + encodeURIComponent(objet);

		window.location.href = mail;
	}

	$scope.deleteItem = function(reference) {
		newreferences = new Array();
		for(var i = 0 ; i < $scope.references.length; i++) {
			if(reference != $scope.references[i].reference) {
				newreferences.push($scope.references[i]);
			} else {
				deleteDBReference(reference);
			}
		}
		$scope.references = newreferences;
		dbreferences = newreferences;
	}

	$scope.clearfiltre = function() {
		$scope.filtre = "";
	}
}