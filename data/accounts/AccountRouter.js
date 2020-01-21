const express = require('express');

const router = express.Router();

const knex = require('../dbConfig');

router.use(express.json());

router.get('/', (req, res) => {
    knex.select('*')
        .from('accounts')
        .then(accounts => {
            res.status(200).json(accounts)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ errorMessage: 'Error getting accounts' })
        })
})

router.get('/:id', (req, res) => {
    knex.select('*')
        .from('accounts')
        .where({ id: req.params.id })
        .then(accounts => {
            res.status(200).json(accounts)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ errorMessage: 'Error getting the specific account' })
        })
})

router.post('/', (req, res) => {
    const postData = req.body;

    knex('accounts')
        .insert(postData, 'id')
        .then(ids => {
            const id = ids[0];
            res.status(200).json(id);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ errorMessage: 'Error posting' })
        })
})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    knex('accounts')
        .where({ id })
        .update(changes)
        .then(count => {
            if (count > 0) {
                res.status(200).json({ message: `${count} record(s) updated` })
            } else {
                res.status(404).json({ message: 'Account not found' })
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ errorMessage: 'Error updating' })
        })
})

router.delete('/:id', (req, res) => {
    knex('accounts')
        .where({ id: req.params.id })
        .del()
        .then(count => {
            if (count > 0) {
                res.status(200).json({ message: `${count} record(s) deleted` })
            } else {
                res.status(404).json({ message: 'Account not found' })
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ errorMessage: 'Error deleting' })
        })
})

module.exports = router;