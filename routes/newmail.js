var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('newmail');

});

router.post('/', function(req, res, next){
     var mysql      = require('mysql');
     var connection = mysql.createConnection({
     host     : 'natsirt.nl',
     user     : 'hvk_scoutingijss',
     password : 'geenwachtwoord',
     database : 'hvk_scoutingijsselgroep'
     });

     connection.connect();
        var post = {recipient: req.body.recipient , message: req.body.message , subject: req.body.subject, createdat: new Date()}
        var query = connection.query('INSERT INTO outgoing SET ?', post, function(err, result) {
            if(err) throw err;

        });
    if(req.body.recipient == "welpen@scouting-ijsselgroep.nl"){
        var post = {afzender: 1, bericht: req.body.message , subject: req.body.subject, createdat: new Date()}
        var query = connection.query('INSERT INTO outgoing SET ?', post, function(err, result) {
            if(err) throw err;

        });
    }

    res.render('succes');
     connection.end();
});

module.exports = router;
