const controller = require("../controllers/auth_insc.controller");
module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
});

app.post("/utilisateur/seConnecter", controller.seconnecter);
app.post("/utilisateur/sinscrire", controller.sinscrire);
}