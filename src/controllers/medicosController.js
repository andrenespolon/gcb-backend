const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

var Medicos = require('../models/medicosModels');

/*
rota:       /gcb/api/v1/
metodo:     get (dados: na url)
retorno:    documento
*/
router.get('/:pesquisa', async (req, res) => {
    const pesquisa = req.params.pesquisa;
    const conditions = {
        $or: [ 
            {nome: {$regex: pesquisa, $options: 'i'}}, 
            {sobrenome: {$regex: pesquisa, $options: 'i'}},
            {crm: {$regex: pesquisa, $options: 'i'}}
        ]        
    };

    await Medicos.find(conditions, 'nome sobrenome cidade estado crm espec', {sort: {nome: 1}}, (err, result) => {
        if (err || !result) {
            return res.status(400).send({
                message: 'Erro ao retornar os dados.',
                data: err.toString()
            });
        }
        return res.status(200).send({            
            message: 'Foram encontrados ' + result.length + ' médicos.',
            data: result
        });
    });
});

/*
rota:       /gcb/api/v1/cadastro
metodo:     post (dados: no corpo da requição)
retorno:    documento
*/
router.post('/cadastro', async (req, res) => {
    await Medicos.create(req.body, (err, result) => {
        if (err || !result) {
            return res.status(400).send({
                message: 'Erro ao cadastrar.',
                data: err
            });
        }
        return res.status(201).send({            
            message: 'Médico cadastrado com sucesso.',
            data: result
        });
    });
});

/*
rota:       /gcb/api/v1/medico/:crm
metodo:     get (filtro: na url)
retorno:    documento
*/
router.get('/medico/:crm', async (req, res) => {
    const crm = req.params.crm;
    const conditions = {
        crm: crm       
    };

    await Medicos.findOne(conditions, 'nome sobrenome ddd telefone cidade estado crm espec', (err, result) => {
        if (err || !result) {
            return res.status(400).send({
                message: 'Erro ao retornar os dados.',
                data: err.toString()
            });
        }
        return res.status(200).send({            
            message: 'Médico encontrado.',
            data: result
        });
    });
});

/*
rota:       /gcb/api/v1/medico/:crm
metodo:     put (filtro: na url / dados: no corpo da requição)
retorno:    documento
*/
router.put('/medico/:crm', async (req, res) => {
    const conditions = {
        crm: req.params.crm
    };

    const options = {
        new: true
    };

    await Medicos.findOneAndUpdate(conditions, req.body, options, (err, result) => {
        if (err || !result) {
            return res.status(400).send({
                message: 'Erro ao atualizar.',
                data: err
            });
        }
        return res.status(201).send({            
            message: 'Médico atualizado com sucesso.',
            data: result
        });
    });
});

/*
rota:       /gcb/api/v1/medico/:crm
metodo:     delete (filtro: na url)
retorno:    documento
*/
router.delete('/medico/:crm', async (req, res) => {
    const conditions = {
        crm: req.params.crm
    };

    await Medicos.findOneAndRemove(conditions, (err, result) => {
        if (err || !result) {
            return res.status(400).send({
                message: 'Erro ao excluir.',
                data: err
            });
        }
        return res.status(200).send({            
            message: 'Médico excluído com sucesso.',
            data: result
        });
    });
});

module.exports = router;