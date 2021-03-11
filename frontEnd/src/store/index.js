import { toyService } from '../services/toy.service.js';

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        toys: [],
        isLoading: false,
        // filterBy: {
        //     name: 'pu',
        //     inStock: true
        // }
    },
    getters: {
        toys(state) {
            // return state.toys.filter(toy => toy.name.includes(state.filterBy.name.toLowerCase()))
            return state.toys
        }
    },
    mutations: {
        setIsLoading(state, { isLoading }) {
            state.isLoading = isLoading;
        },
        setProducts(state, { products }) {
            state.toys = products;
        },
        save(state, { savedToy }) {
            const idx = state.toys.findIndex(t => t._id === savedToy._id);
            if (idx < 0) state.toys.unshift(savedToy);
            else state.toys.splice(idx, 1, savedToy);
        },
        remove(state, { id }) {
            const idx = state.toys.findIndex(toy => toy._id === id);
            state.toys.splice(idx, 1);
        }
    },
    actions: {
        loadProducts({ commit }) {
            commit({ type: 'setIsLoading', isLoading: true });
            toyService.query()
                .then(products => {
                    commit({ type: 'setProducts', products });
                })
                .catch(err => {
                    throw new Error('Cannot load products');
                })
                .finally(() => {
                    commit({ type: 'setIsLoading', isLoading: false });
                })
        },
        updateToys(context, { toy }) {
            return toyService.save(toy)
                .then(savedToy => context.commit({ type: 'save', savedToy }))
                .catch(() => { throw new Error('Cannot update Toys') });
        },
        toyStockToogle(context, { toy }) {
            toy = JSON.parse(JSON.stringify(toy));
            toy.inStock = !toy.inStock;
            context.dispatch({ type: 'updateToys', toy });
        },
        removeToy(context, { id }) {
            toyService.remove(id)
                .then(() => context.commit({ type: 'remove', id }))
                .catch(() => { throw new Error('Cannot remove Toy') });
        }
    },
    modules: {

    }
})