import {createRouter,createWebHistory} from 'vue-router'
// createRouter方法，用于创建路由实例，可以管理多个路由

export default createRouter({
    // 路由的模式设计
    history:createWebHistory(),
    // 管理路由
    routes:[
        {
        path:'/home',
        component:()=>import('@/pages/home/index.vue')
        },
        {
            path:"/hospital",
            component:()=>import('@/pages/hospital/index.vue'),
            children:[
                {
                    path:"register",
                    component:()=>import('@/pages/hospital/register/index.vue')
                },
                {
                    path:"detail",
                    component:()=>import('@/pages/hospital/detail/index.vue')
                },
                {
                    path:"close",
                    component:()=>import('@/pages/hospital/close/index.vue')
                
                },
                {
                    path:"notice",
                    component:()=>import('@/pages/hospital/notice/index.vue')
                },
                {
                    path:"search",
                    component:()=>import('@/pages/hospital/search/index.vue')
                }
                
                
                
            ]
        },
        {
            path:"/",
            component:()=>import('@/pages/home/index.vue')
        }
],
    // 滚动行为:控制滚动条位置
    scrollBehavior () {
        return {
            left:0,
            top:0
        }
    }
})