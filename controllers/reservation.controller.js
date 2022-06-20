const { Sequelize } = require("sequelize");
const db = require("../models");
const Reservation = db.reservation;
const Parking = db.parking;


exports.reserver =(req,res)=>{
    Parking.findOne({
        where:{
            id : req.body.parkId,
        }
    })
    .then(parc=>{
        if(parc.placeOcc<parc.taille){
            Parking.update({
               placeOcc : parc.placeOcc + 1 
            },
            {
                where:{
                    id:parc.id
                }
            })
            .then(park=>{
                Reservation.create({
                    idPark : parc.id,
                    idUser : req.body.userId,
                    tempsDebut: Sequelize.literal('CURRENT_TIMESTAMP'),
                })
                .then(parking=>{
                    return res.status(200).send({ message: "Reservation créee avec succès" });
                })
                .catch(err => {
                    res.status(500).send({ message: err.message })
                });
            })
            .catch(err => {
                res.status(500).send({ message: err.message })
            });
        }
        else{
            return res.status(400).send({ message: "On s'excuse, ce parking est rempli" }); 
        }
    })
    .catch(err => {
        res.status(500).send({ message: err.message })
    });
}