// 对于axios函数库进行二次封装
// 面试易问：你工作时是否会对axios进行二次封装？并且封装的目的是什么？
// 目的1：利用axios自带的请求和响应拦截器的功能
// 目的2：请求拦截器，一般可以在请求头中携带公共参数：token
// 目的3：响应拦截器，可以简化返回服务器的数据，处理http的网络错误

import axios from 'axios'
import { ElMessage } from 'element-plus';
// 利用axios的create创建一个实例：可以设置基础路径、超时的时间设置

const request = axios.create({
    baseURL: '/api', // 请求的基础路径设置
    timeout: 30000 // 超时时间,超出5秒则请求失败
});

// 请求拦截器
request.interceptors.request.use(
    (config) => {
        // config:请求拦截器回调注入的对象，（配置对象），配置对象的身上最重要的一件事是headers属性
        // 可以通过请求头携带公共参数-token
        return config
    })
// 响应拦截器
request.interceptors.response.use((response)=>{
    // 响应拦截器成功的回调，一般会进行简化数据
    return response.data;

},(error)=>{
    // 处理http网络错误
    
    let status = error.response.status;
    switch(status){
        case 401:
            // 错误信息提示
            ElMessage({
                type:'error',
                message:"参数有误"
            })
            break;
        case 404:
            ElMessage({
                type:'error',
                message:"请求路径出现问题"
            })
            break;
        case 500:
            ElMessage({
                type:'error',
                message:"服务器死了"
            })
            break;
        default:
            break;
    }
    
    return Promise.reject(new Error(error.message))
})


// 对外暴露axios

export default request;
