import axios from 'axios';
import { storageService } from './async-storage.service.js';
import { utilService } from './util.service.js';
import { httpService } from './http.service.js';

const TOY_URL = '//localhost:3030/api/toy/';
const KEY = 'toyDB';

export const toyService = {
    query,
    getById,
    remove,
    save,
    getEmptyToy
}

// const gToys = _createToys()

function query() {
    return httpService.get('toy');
}

function getById(id) {
    return httpService.get(`toy/${id}`)
}

function remove(id) {
    return httpService.delete(`toy/${id}`)
}

function save(toy) {
    if (toy._id) return httpService.put(`toy/${toy._id}`, toy);
    else return httpService.post('toy', toy);
}

function getEmptyToy(name = '', price = 0, inStock = true) {
    return {
        _id: '',
        name,
        price,
        type: '',
        createdAt: 0,
        inStock
    }
}

// Create Test Data:
function _createToys() {
    var toys = JSON.parse(localStorage.getItem(KEY))
    if (!toys || !toys.length) {
        toys = [
            _createToy('toy1'),
            _createToy('toy2'),
            _createToy('toy3', false),
        ]
        localStorage.setItem(KEY, JSON.stringify(toys))
    }
    return toys;
}

function _createToy(name, inStock) {
    const toy = getEmptyToy(name, utilService.getRandomInt(80, 300), inStock)
    toy._id = utilService.makeId();
    toy.createdAt = Date.now();
    return toy;
}