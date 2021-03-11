const fs = require('fs');
const toys = require('../../data/toy.json');

module.exports = {
    query,
    getById,
    remove,
    save
}

function query() {
    return Promise.resolve(toys);
}

function getById(toyId) {
    const toy = toys.find(toy => toy._id === toyId);
    return Promise.resolve(toy);
}

function remove(toyId, nickname) {
    // if (toyId.typeof === "number") toyId = JSON.parse(toyId);
    const idx = toys.findIndex(toy => toy._id === toyId);
    // if (toys[idx].creator !== nickname) return Promise.reject('User not allowed to delete this toy')
    toys.splice(idx, 1);
    return _saveToysToFile();
}

function save(toy) {
    if (toy._id) {
        const idx = toys.findIndex(t => t._id === toy._id);
        toys.splice(idx, 1, toy);
    } else {
        toy._id = _makeId();
        toys.unshift(toy);
    }
    return _saveToysToFile()
        .then(() => toy);
}

function _saveToysToFile() {
    return new Promise((res, rej) => {
        fs.writeFile('data/toy.json', JSON.stringify(toys, null, 2), (err) => {
            if (err) rej(err);
            else res();
        })
    })
}

// HELPERS
function _makeId(length = 5) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}