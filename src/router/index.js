import Vue from 'vue'
import Router from 'vue-router'
const DashboardLayout = () => import ('../components/dashboardLayout.vue')

function loadView(view) {
    return () => import (`../components/dashboardContents/${view}.vue`)
}

const routes = [
    {
    path: '/',
    component: DashboardLayout,
    children: [
    {
        name: 'HewanController',
        path: '',
        component: loadView('hewanController')
    },
    {
        name: 'CustomerController',
        path: '/customer',
        component: loadView('customerController')
    },
    {
        name: 'JenisHewanController',
        path: '/jenishewan',
        component: loadView('jenishewanController')
    },
    {
        name: 'PegawaiController',
        path: '/pegawai',
        component: loadView('pegawaiController')
    },
    {
        name: 'SupplierController',
        path: '/supplier',
        component: loadView('supplierController')
    },
    {
        name: 'UkuranHewanController',
        path: '/ukuranhewan',
        component: loadView('ukuranhewanController')
    },
    ]
},
]
Vue.use(Router)
const router = new Router({ mode: 'history', routes: routes })
export default router