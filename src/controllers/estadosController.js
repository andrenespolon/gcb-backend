const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

var Estados = require('../models/estadosModels');

// recupera dos estados
router.get('/uf', async (req, res) => {

    await Estados.find({}, 'state', (err, result) => {
        if (err) {
            return res.status(400).send({
                message: 'Erro ao retornar os dados.',
                data: err.toString()
            });
        }
        if (!result) {
            return res.status(404).send({
                message: 'Estado não localizados.',
                data: result // volta 'null' caso não tenha nada;
            });
        }
        return res.status(200).send(result);
    });
});


// recupera as cidades pelo estado (ex: estados/cid?uf=SP)
router.get('/cid', async (req, res) => {
    
    const estado = req.query.uf;

    const conditions = {
        state: estado
    };

    await Estados.findOne(conditions, 'cities', (err, result) => {
        if (err) {
            return res.status(400).send({
                message: 'Erro ao retornar os dados.',
                data: err.toString()
            });
        }
        if (!result) {
            return res.status(404).send({
                message: 'Estado não localizados.',
                data: result // volta 'null' caso não tenha nada;
            });
        }
        return res.status(200).send(result);
    });
});

/*
router.post('/cadastro', async (req, res) => {
    await Estados.create(req.body, (err, result) => {
        if (err || !result) {
            return res.status(400).send({
                message: 'Erro ao cadastrar.',
                data: err
            });
        }
        return res.status(201).send({            
            message: 'Estados cadastrados com sucesso.',
            data: result
        });
    });
});
*/
module.exports = router;