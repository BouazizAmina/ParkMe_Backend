const db = require("../models");
const parking = db.parking;
//-----------------------------------
//Fonction de connexion
//-----------------------------------
exports.getAllParkings = (req,res) =>{
    parking.findAll()
    .then(parks =>{
        return res.status(200).send({parks});
    })
    .catch(err => {
        res.status(500).send({ message: err.message })
    });
}

exports.getParkingById = (req,res) =>{
    parking.findOne({
        where:{
            id:req.body.id
        }
    })
    .then(park =>{
        return res.status(200).send({park});
    })
    .catch(err => {
        res.status(500).send({ message: err.message })
    });
}