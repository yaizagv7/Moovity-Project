import moment from 'moment'
import Vue from 'vue'
import VueRouter from 'vue-router'
import mapComponent from '../components/Map'
import landComponent from '../components/Land'

moment.locale('ru');

Vue.use(VueRouter);

const routes = [
    {
        name: 'root',
        path: '/',
        redirect: to => {
            return { name: 'map' };
        }
    },
    {
        name: 'node',
        path: '/:type(node|way)/:node',
        component: mapComponent
    },
    {
        name: 'position',
        path: '/map/:zoom/:lat/:lon',
        component: mapComponent
    },
    {
        name: 'map',
        path: '/map/:action?',
        component: mapComponent
    },
    {
        name: 'land',
        path: '/land',
        component: landComponent
    }
];

const router = new VueRouter({
    mode: 'history',
    routes: routes
});

export default router