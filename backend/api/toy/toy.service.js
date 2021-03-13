const dbService = require('../../services/db.service');
const logger = require('../../services/logger.service');
const ObjectId = require('mongodb').ObjectId;

module.exports = {
    query,
    getById,
    remove,
    save,
    add
}

async function query(filterBy = {}) {
    // const criteria = _buildCriteria(filterBy)
    try {
        const collection = await dbService.getCollection('toy');
        const toys = await collection.find().toArray();
        return toys;
    } catch (err) {
        logger.error('cannot find toys', err);
        throw err;
    }
}

async function getById(toyId) {
    try {
        const collection = await dbService.getCollection('toy');
        const toy = await collection.findOne({ '_id': ObjectId(toyId) });
        return toy;
    } catch (err) {
        logger.error(`while finding toy ${toyId}`, err);
        throw err;
    }
}

async function remove(toyId, nickname) {
    if (toyId.typeof === "number") toyId = JSON.parse(toyId);
    try {
        const collection = await dbService.getCollection('toy');
        await collection.deleteOne({ '_id': ObjectId(toyId) });
    } catch (err) {
        logger.error(`cannot remove toy ${toyId}`, err);
        throw err;
    }
}

async function save(toy) {
    try {
        // peek only updatable fields!
        const toyToSave = {
            _id: ObjectId(toy._id),
            name: toy.name,
            price: toy.price,
            type: toy.type,
            inStock: toy.inStock
        }
        const collection = await dbService.getCollection('toy');
        await collection.updateOne({ '_id': toyToSave._id }, { $set: toyToSave });
        return toyToSave;
    } catch (err) {
        logger.error(`cannot update =toy ${toy._id}`, err);
        throw err;
    }
}

async function add(toy) {
    try {
        const collection = await dbService.getCollection('toy');
        await collection.insertOne(toy);
        return toy;
    } catch (err) {
        logger.error('Can not add new toy');
        throw err;
    }
}

// HELPERS
function _saveToysToFile() {
    return new Promise((res, rej) => {
        fs.writeFile('data/toy.json', JSON.stringify(toys, null, 2), (err) => {
            if (err) rej(err);
            else res();
        })
    })
}
function _makeId(length = 5) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}
function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.txt) {
        const txtCriteria = { $regex: filterBy.txt, $options: 'i' }
        criteria.$or = [
            {
                username: txtCriteria
            },
            {
                fullname: txtCriteria
            }
        ]
    }
    if (filterBy.minBalance) {
        criteria.balance = { $gte: filterBy.minBalance }
    }
    return criteria
}