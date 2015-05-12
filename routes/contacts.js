var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var mysql      = require('mysql');
    var connection = mysql.createConnection({
        host     : 'natsirt.nl',
        user     : 'hvk_scoutingijss',
        password : 'geenwachtwoord',
        database : 'hvk_scoutingijsselgroep'
    });

    connection.connect();

    connection.query('SELECT email, name, beschrijving, id FROM mails, afzender WHERE createdat < NOW() AND mails.afzender = afzender.id GROUP BY afzender.id;', function(err, rows, fields) {
        if (err) throw err;

        res.render('contacts', { rows: rows });
    });

    connection.end();
});

/* GET home page. */
router.get('/:id', function(req, res, next) {
    var mysql      = require('mysql');
    var connection = mysql.createConnection({
        host     : 'natsirt.nl',
        user     : 'hvk_scoutingijss',
        password : 'geenwachtwoord',
        database : 'hvk_scoutingijsselgroep'
    });

    connection.connect();
    console.log(req.params.id);
    connection.query('SELECT email, name, beschrijving, id FROM mails, afzender WHERE createdat < NOW() AND mails.afzender = afzender.id AND afzender.id = "'+req.params.id+'" GROUP BY afzender.id;', function(err, rows, fields) {
        if (err) throw err;

        res.render('contacts', { rows: rows });
    });

    connection.end();
});

module.exports = router;
