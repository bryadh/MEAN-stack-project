const express = require('express');
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


	//Liste des produits
	app.get("/instruments",(req,res) => {
		console.log("/instruments");
		try{
			db.collection("instruments").find().toArray((err,documents) => {
				res.end(JSON.stringify(documents));
			});
		}catch(e){
			console.log("Erreur sur /instruments : "+e);
			res.end(JSON.stringify([]));
	}
	});


	//Avec l'@ http://localhost:5000/instruments/type/anti-oxydant
	app.get("/instruments/type/:type",(req,res) => {
		let type = req.params.type;
		console.log("/instruments/"+type);
		try{
			db.collection("instruments").find({type:type}).toArray((err,documents) => {
				res.end(JSON.stringify(documents));
			});
		}catch(e){
			console.log("Erreur sur /instruments/"+type+" : "+e);
			res.end(JSON.stringify([]));
		}
	});



	// Avec l'@ http://localhost:5000/instruments/anti-oxydant
	app.get("/instruments/:categorie",(req,res) => {
		let categorie = req.params.categorie;
		console.log("/instruments/"+categorie);
		try{
			db.collection("instruments").find({type:categorie}).toArray((err,documents) => {
				res.end(JSON.stringify(documents));
			});
		}catch(e){
			console.log("Erreur sur /instruments/"+categorie+" : "+e);
			res.end(JSON.stringify([]));
		}
	});


	//Recherche Multi critéres avec l'@ 
	/*app.get("/instruments/:type/:nom/:marque/:prixmin/:prixmax",(req,res) => {
		let type = req.params.type;
		let nom = req.params.nom;
		let marque = req.params.marque;
		let prixMin = req.params.prixmin;
		let prixMax = req.params.prixmax;
		let objRecherche = {};

		if(type != "*"){objRecherche["type"] = type;}
		if(nom != "*"){objRecherche["nom"] = nom;}
		if(marque != "*"){objRecherche["marque"] = marque;}
		//if(prixMin != "*"){objRecherche["prixMin"] = parseInt(prixMin,10);}
		//if(prixMin != "*"){objRecherche["prixMax"] = parseInt(prixMax,10);}

		try{
			db.collection("instruments").find({objRecherche}).toArray((err,documents) => {
				res.end(JSON.stringify(documents));
			});
		}catch(e){
			console.log("Erreur sur /instruments/"+categorie+" : "+e);
			res.end(JSON.stringify([]));
		}
	});*/

	//Test
	app.get("/instruments/:type/:nom/:marque",(req,res) => {
		let type = req.params.type;
		let nom = req.params.nom;
		let marque = req.params.marque;
		/*let prixMin = req.params.prixmin;
		let prixMax = req.params.prixmax;*/
		let objRecherche = {};

		if(type != "*"){objRecherche["type"] = type;}
		if(nom != "*"){objRecherche["nom"] = nom;}
		if(marque != "*"){objRecherche["marque"] = marque;}
		//if(prixMin != "*"){objRecherche["prixMin"] = parseInt(prixMin,10);}
		//if(prixMin != "*"){objRecherche["prixMax"] = parseInt(prixMax,10);}

		try{
			db.collection("instruments").find(objRecherche).toArray((err,documents) => {
				res.end(JSON.stringify(documents));
			});
		}catch(e){
			console.log("Erreur sur /instruments/"+categorie+" : "+e);
			res.end(JSON.stringify([]));
		}
	});







	
	//Liste des categories de produits
	// Avec l'@ http://localhost:5000/types
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
	
	/*
	//connexion
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
	);*/

});
app.listen(5000);




