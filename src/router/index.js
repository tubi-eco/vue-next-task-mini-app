import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Event.vue'
const router = createRouter({
    history:createWebHistory(),
    routes:[
        {path:'/', name:'Home', component:Home},
        {path:'/event/:id', name:'event.detail', component: ()=>import('../views/EventDetail.vue')}
    ]
})

export default router