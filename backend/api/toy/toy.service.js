// const fs = require('fs');
// const toys = require('../../data/toy.json');
const dbService = require('../../services/db.service');
const logger = require('../../services/logger.service')


module.exports = {
    query,
    getById,
    remove,
    save
}

// function query() {
//     return Promise.resolve(toys);
// }
async function query(filterBy = {}) {
    console.log('fdfdf')
    // const criteria = _buildCriteria(filterBy)
    try {
        console.log('line 20')
        const collection = await dbService.getCollection('toy');
        console.log('collection: ',collection);
        const toys = await collection.find().toArray();
        // const toys = await collection.find(criteria).toArray();
        console.log(toys)
        console.log('toys')
        return toys;
    } catch (err) {
        logger.error('cannot find toys', err);
        throw err;
    }
}


// function getById(toyId) {
//     const toy = toys.find(toy => toy._id === toyId);
//     return Promise.resolve(toy);
// }
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

// function remove(toyId, nickname) {
//     // if (toyId.typeof === "number") toyId = JSON.parse(toyId);
//     const idx = toys.findIndex(toy => toy._id === toyId);
//     toys.splice(idx, 1);
//     return _saveToysToFile();
// }
async function remove(toyId, nickname) {
    if (toyId.typeof === "number") toyId = JSON.parse(toyId);
    try {
        const collection = await dbService.getCollection('toy');
        const idx = collection.findIndex(toy => toy._id === toyId);
        if (collection[idx].creator !== nickname) return Promise.reject('User not allowed to delete this toy')
        await collection.deleteOne({ '_id': ObjectId(toyId) });
    } catch (err) {
        logger.error(`cannot remove toy ${toyId}`, err);
        throw err;
    }
}

// function save(toy) {
//     if (toy._id) {
//         const idx = toys.findIndex(t => t._id === toy._id);
//         toys.splice(idx, 1, toy);
//     } else {
//         toy._id = _makeId();
//         toys.unshift(toy);
//     }
//     return _saveToysToFile()
//         .then(() => toy);
// }
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

// function _buildCriteria(filterBy) {
//     const criteria = {}
//     if (filterBy.name) {
//         const txtCriteria = { $regex: filterBy.name, $options: 'i' }
//         criteria.name =txtCriteria 
//     }
//     if (filterBy.type !== 'all') {
//         criteria.type = filterBy.type
//     }
//     if(filterBy.inStock ==='true'){
//         criteria.inStock = true