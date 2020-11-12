const express = require('express');
const assert = require('assert');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(function(req,res,next){
	res.setHeader('Access-Control-Allow-Origin','*');
	res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE');
	res.setHeader('Access-Control-Allow-Headers','*');
	next();

});

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectId;
const url = "mongodb://localhost:27017";

MongoClient.connect(url, {useNewUrlParser:true},(err,client) => {
	let db =client.db("SUPERBRASS");

	//Rechechre multi critères sur les instruments
	app.get("/instruments/:type/:nom/:marque/:prixmin/:prixmax",(req,res) => {
		let type = req.params.type;
		let nom = req.params.nom;
		let marque = req.params.marque;
		let prixMin = req.params.prixmin;
		let prixMax = req.params.prixmax;
		let objRecherche = {};


		if(type != "*"){objRecherche["type"] = type;}
		if(nom != "*"){objRecherche["nom"] = nom;}
		if(marque != "*"){objRecherche["marque"] = marque;}

		if(prixMin != "*" && prixMax!="*"){
			objRecherche["prix"] = {$lte:parseInt(prixMax,10),$gte:parseInt(prixMin,10)};
		}else{
			if(prixMin != "*"){objRecherche["prix"] = {$gte:parseInt(prixMin,10)};}
			if(prixMax != "*"){objRecherche["prix"] = {$lte:parseInt(prixMax,10)};}
		}

		try{
			db.collection("instruments").find(objRecherche).toArray((err,documents) => {
				res.end(JSON.stringify(documents));
			});
		}catch(e){
			console.log("Erreur sur /instruments/"+categorie+" : "+e);
			res.end(JSON.stringify([]));
		}
	});


	//Service qui gére l'autentification
	app.post("/utilisateurs/connexion",(req,res) => {
		console.log("/utilisateurs/connexion avec "+JSON.stringify(req.body));
		try{
			
			db.collection("utilisateurs")
			.find(req.body)
			.toArray((err,documents) => {
			
			if(documents.length == 1)
				res.end(JSON.stringify({"resultat":1,"message":"Autentification réussie"}));
			else res.end(JSON.stringify({"resultat":0,"message":"Email ou mot de passe incorrect"}));	
			});
			}catch(e){
				res.end(JSON.stringify({"resultat":0,"message": e}));
			}
	}
	);

	//Service pour ajouter un article dans la collection Panier
	app.post("/panier",(req,res,next) => {
			db.collection("paniers")
			.insertOne(req.body, function(err, result){
				res.end(JSON.stringify({"message":"Ajout dans la panier réussie"}));
				console.log("Ajouté au panier");
			});
	}
	);


	//Service pour afficher le panier d'un client
	app.get("/paniers/:email",(req,res) => {
		let email = req.params.email;
		console.log("/paniers/"+email);
		try{
			db.collection("paniers").find({email:email,valide:0}).toArray((err,documents) => {
				res.end(JSON.stringify(documents));
			});
		}catch(e){
			console.log("Erreur sur /paniers/"+email+" : "+e);
			res.end(JSON.stringify([]));
		}
	});

	//Liste des catégories des instruments
	app.get("/types",(req,res) => {
		console.log("types");
		let categories = [];
		try{
			db.collection("instruments").find().toArray((err, documents) => {
				for(let doc of documents){
					if (!categories.includes(doc.type)) categories.push(doc.type);
				}
				console.log("Renvoi de"+JSON.stringify(categories));
				res.end(JSON.stringify(categories));
			});	
		}catch(e){
			console.log("Erreur sur /categories : "+e);
			res.end(JSON.stringify([]));
		}
	});


	//Service pour ajouter un utilisateur
	app.post("/utilisateur/inscription",(req,res,next) => {
			db.collection("utilisateurs")
			.insertOne(req.body, function(err, result){
				res.end(JSON.stringify({"message":"Ajout dans la panier réussie"}));
				console.log("Ajouté au panier"+console.log(req.body));
			});
	}
	);


	//Service pour valider un panier
	/*app.put("/panier/validation",(req,res,next) => {
			db.collection("paniers")
			.update(req.body,{valide : 1 })
			.then(() => res.status(200).json({message:'Panié validé'}))
			.catch(error => res.status(400).json({ error }));
	}
	);
*/


});
app.listen(5000);
