// 定义用户相关的仓库
import { defineStore } from "pinia";
// 引入获取验证码的请求方法
import { reqUserCode,reqUselogin } from "@/api/hospital";
import type { LoginData,UserLoginResponseData ,} from "@/api/hospital/type";
import type { UserState } from "./interface";
import {GET_TOKEN,SET_TOKEN} from '@/utils/user'
const userStore = defineStore("User", {
    state: ():UserState => {
        return {
            visiable: false,
            code: '', //存储验证码
            userInfo:JSON.parse(GET_TOKEN() as string) || {}
        }

    },
    actions: {
        async getyzm(phone: string) {
            let result = await reqUserCode(phone)
            if (result.code === 200) {
                this.code = result.data
                return 'ok'
            }else{
                return Promise.reject(new Error('失败'))
            }

        },
        // 用户手机号码登录
       async userLogin(loginData:LoginData){
        
          let result:UserLoginResponseData= await reqUselogin(loginData)
          if(result.code===200){
            this.userInfo=result.data
            SET_TOKEN(JSON.stringify(this.userInfo))
            return 'ok'
          }else{
            return Promise.reject(new Error('失败'))
        }
          
        },
        getters: {
        }
    }
})
export default userStore;