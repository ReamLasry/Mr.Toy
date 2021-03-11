import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/home.vue';
import about from '../views/about.vue';
import toys from '../views/toy-app.vue';
import toyEdit from '../views/toy-edit.vue';
import toyDetails from "@/views/toyDetails.vue";
import dashboard from "@/views/dashboard.vue";


Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/toys',
        name: 'Toys',
        component: toys
    },
    {
        path: '/toy/edit/:toyId?',
        name: 'Toy-edit',
        component: toyEdit
    },
    {
        path: '/toy/details/:toyId?/',
        name: 'Toy-details',
        component: toyDetails
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: dashboard
    },
    {
        path: '/about',
        name: 'About',
        component: about
    }
]

const router = new VueRouter({
    routes
})

export default router