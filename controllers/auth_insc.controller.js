const db = require("../models");
const user = db.user;
const sequelize = require("sequelize")
//-----------------------------------
//Fonction de connexion
//-----------------------------------
exports.seconnecter = (req,res) =>{
    return user.findOne({
        where : {
            [sequelize.Op.or]: [{numTel: req.body.identifier}, {email: req.body.identifier}]
        }
    }).then(user =>{
        if(!user){
            return res.status(404).send({ message: "Il n'existe pas un compte avec ces informations" });
        }
        else if(user.motPasse !== req.body.motPasse){
            return res.status(404).send({ message: "Le mot de passe et erroné" });
        }
        else{
            return res.status(200).send({message :"Connexion avec succès"});
        }
     
    })
    .catch(err => {
        res.status(500).send({ message: err.message })
    });
};
//---------------------------------------
//Fonction d'inscription
//---------------------------------------
exports.sinscrire = (req,res) =>{
    user.findOne({
        where:{
            numTel : req.body.numTel
        }
    })
    .then(el=>{
        if(el) return res.status(404).send({ message: "Il existe un compte avec ce numéro de téléphone" });
        else{
            if(req.body.email){
                user.findOne({
                    where:{
                        email : req.body.email
                    }
                }) 
                .then(elem=>{
                    if(elem) return res.status(404).send({ message: "Il existe un compte avec cet email" });
                    else{
                        user.create({
                            nom : req.body.nom,
                            prenom: req.body.prenom,
                            email: req.body.email,
                            motPasse: req.body.mdp,
                            numTel: req.body.numTel
                            
                        })
                        .then(e =>{
                            return res.status(200).send({message :"Compte crée avec succès!"});
                        })
                        .catch(err => {
                            res.status(500).send({ message: err.message })
                        }) 
                    }
                })
                .catch(err => {
                    res.status(500).send({ message: err.message })
                })
            }
            else{
                user.create({
                    nom : req.body.nom,
                    prenom: req.body.prenom,
                    email: req.body.email,
                    motPasse: req.body.mdp,
                    numTel: req.body.numTel
                    
                })
                .then(user =>{
                    return res.status(200).send({message :"Compte crée avec succès!"});
                })
                .catch(err => {
                    res.status(500).send({ message: err.message })
                });  
            }
             
        }
    })
    .catch(err => {
        res.status(500).send({ message: err.message })
    });  
}