import axios from 'axios';
import { storageService } from './async-storage.service.js';
import { utilService } from './util.service.js';

const TOY_URL = '//localhost:3030/api/toy/';
const KEY = 'toyDB';

export const toyService = {
    query,
    getById,
    remove,
    save,
    getEmptyToy
}

const gToys = _createToys()

function query() {
    return axios.get(TOY_URL).then(({ data }) => data);
    // return storageService.query(KEY)
    //     .then(toys => {
    //         if (!toys || !toys.length) toys = gToys;
    //         return toys
    //     })
}

function getById(id) {
    return axios.get(TOY_URL + id).then(res => res.data);
    // return storageService.get(KEY, id)
}

function remove(id) {
    return axios.delete(TOY_URL + id)
        .then(res => res.data)
        .catch(err => { throw new Error(err) });
    // return storageService.remove(KEY, id)
}

function save(toy) {
    if (toy._id) return axios.put(TOY_URL + toy._id, toy).then(res => res.data);
    else return axios.post(TOY_URL, toy).then(res => res.data);

    // const savedToy = (toy._id) ? storageService.put(KEY, toy) : storageService.post(KEY, toy)
    // return savedToy;
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