// const express = require('express');
const toyService = require('./toy.service');
const logger = require('../../services/logger.service')

// const router = express.Router();
// module.exports = router;

module.exports = {
    getToys,
    getToy,
    deleteToy,
    updateToy
}

//LIST OF Toys  
// router.get('/', (req, res) => {
//     toyService.query()
//         .then(toys => res.json(toys));
// })
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
// router.get('/:toyId', (req, res) => {
//     const { toyId } = req.params;
//     toyService.getById(toyId)
//         .then(toy => res.json(toy));
// })
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
// router.post('/', (req, res) => {
//     // const { theUser } = req.session;
//     // if (!theUser) return res.status(401).send('User needs to login...');

//     // const { name, price, tpye, inStock } = req.body;

//     const toy = req.body;
//     toy.createdAt = Date.now();
//     // const toy = { ...req.body, createdAt: Date.now() };

//     toyService.save(toy)
//         .then(savedToy => res.json(savedToy));
// })
// UPDATE TOY
// router.put('/:toyId', (req, res) => {
//     // const { theUser } = req.session;
//     // if (!theUser) return res.status(401).send('User needs to login...');

//     // const owner = { _id: theUser._id, fullname: theUser.fullname };
//     // const { _id, name, price, type, createdAt, inStock } = req.body;

//     // const toy = { _id, name, price, type, createdAt, inStock };
//     // const toy = {...req.body, owner};
//     const toy = req.body;

//     // toyService.save(toy, theUser._id)
//     toyService.save(toy)
//         .then(savedToy => res.json(savedToy));
// })
async function updateToy(req, res) {
    try {
        const toy = req.body
        const savedToy = await toyService.save(toy)
        res.send(savedToy)
    } catch (err) {
        logger.error('Failed to update toy', err)
        res.status(500).send({ err: 'Failed to update toy' })
    }
}

// REMOVE A TOY
// router.delete('/:toyId', (req, res) => {
//     // const { theUser } = req.session;
//     // if (!theUser) return res.status(401).send('User needs to login...');

//     const { toyId } = req.params;
//     // toyService.remove(toyId, nickName)
//     toyService.remove(toyId)
//         .then(() => res.json('Deleted...'));
// })
async function deleteToy(req, res) {
    try {
        await toyService.remove(req.params.id)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        logger.error('Failed to delete toy', err)
        res.status(500).send({ err: 'Failed to delete toy' })
    }
}