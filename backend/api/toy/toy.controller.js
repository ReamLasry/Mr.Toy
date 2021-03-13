// const express = require('express');
const toyService = require('./toy.service');
const logger = require('../../services/logger.service')

// const router = express.Router();
// module.exports = router;

module.exports = {
    getToys,
    getToy,
    deleteToy,
    updateToy,
    addToy
}

//LIST OF Toys  
async function getToys(req, res) {
    try {
        // const filterBy = {
        //     txt: req.query?.txt || '',
        //     minBalance: +req.query?.minBalance || 0
        // }
        console.log('i am here ine 26');
        const toys = await toyService.query()
        res.send(toys)
    } catch (err) {
        logger.error('Failed to get toys', err)
        res.status(500).send({ err: 'Failed to get toy' })
    }
}

// GET SINGLE TOY
async function getToy(req, res) {
    try {
        const toy = await toyService.getById(req.params.id)
        res.send(toy)
    } catch (err) {
        logger.error('Failed to get toy', err)
        res.status(500).send({ err: 'Failed to get toy' })
    }
}

// ADD NEW TOY
async function addToy(req, res) {
    try {
        const { name, price, type, inStock } = req.body;
        const newToy = { name, price, type, inStock };
        console.log('i am newToy: ', newToy);
        const savedToy = await toyService.add(newToy)
        res.json(savedToy)
    }
    catch (err) {
        logger.error('Cannot add toy ', err)
        res.status(500).send({
            err: 'Failed to add toy'
        })
    }
}

// UPDATE TOY
async function updateToy(req, res) {
    try {
        const savedToy = await toyService.save(toy)
        res.send(savedToy)
    } catch (err) {
        logger.error('Failed to update toy', err)
        res.status(500).send({ err: 'Failed to update toy' })
    }
}

// REMOVE A TOY

async function deleteToy(req, res) {
    try {
        await toyService.remove(req.params.id)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        logger.error('Failed to delete toy', err)
        res.status(500).send({ err: 'Failed to delete toy' })
    }
}