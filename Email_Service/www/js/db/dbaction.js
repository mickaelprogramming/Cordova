var confemail = null;

function populateDB(tx) {
	tx.executeSql('CREATE TABLE IF NOT EXISTS CONFMAIL (id unique, tag, destinataire, sujet)');
	tx.executeSql('INSERT OR IGNORE INTO CONFMAIL (id, tag, destinataire, sujet) VALUES (1, "%%", "Test@test.fr", "Ceci est un mail dont la référence est %%")');
	
	tx.executeSql('CREATE TABLE IF NOT EXISTS DATAREFERENCES (reference unique)');

}

function errorCB(err) {
/*	alert("err.UNKNOWN_ERR : " + err.UNKNOWN_ERR);
	alert("err.DATABASE_ERR : " + err.DATABASE_ERR);
	alert("err.VERSION_ERR : " + err.VERSION_ERR);
	alert("err.TOO_LARGE_ERR : " + err.TOO_LARGE_ERR);
	alert("err.QUOTA_ERR : " + err.QUOTA_ERR);
	alert("err.SYNTAX_ERR : " + err.SYNTAX_ERR);
	alert("err.CONSTRAINT_ERR : " + err.CONSTRAINT_ERR);
	alert("err.TIMEOUT_ERR : " + err.TIMEOUT_ERR);
	alert("err.code : " + err.code);*/
	alert("L'application à eu un problème et risque de ne pas fonctionner correctement : " + err.message + err.code);
}

function successCB() {
	alert("L'application s'est initalisée avec succès.")
}

function updateDBConf(tag, destinataire, sujet) {
	db.transaction(function(tx) {
		tx.executeSql('UPDATE CONFMAIL SET tag="' + tag + '", destinataire="' + destinataire + '", sujet="' + sujet + '" WHERE id=1',[],successDBConf);
	});
}

function successDBConf() {
	alert("Modifications enregistrées.");
}

function updateDBReference(reference) {
	db.transaction(function(tx) {
		tx.executeSql('INSERT INTO DATAREFERENCES VALUES("' + reference + '")');
	});
}

function deleteDBReference(reference) {
	db.transaction(function(tx) {
		tx.executeSql('DELETE FROM DATAREFERENCES WHERE reference = "' + reference + '"');
	});
}

/*
function initConfEmail() {
	var db = window.openDatabase("DBEmailService","1.0","Email Service DB", 200000);
	db.transaction(getConfMailById, errorCB, getConfMailBtydSuccessCB);
}

function getConfMailById(tx) {
	tx.executeSql('SELECT * FROM CONFMAIL', [], getConfMailBtydSuccessCB, errorCB);
}

function getConfMailBtydSuccessCB(tx, results) {
	$scope.sharedParams.setConfEmail(results.rows.item(0));

	alert(results.rows.item(0).tag);
}*/