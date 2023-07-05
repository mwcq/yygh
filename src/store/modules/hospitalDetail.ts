import { defineStore } from "pinia";
// pinia仓库有两种：组合式API、选择式API写法
import { reqHospitalDetail, reqHospitalDepartment } from "@/api/hospital";
import type { Detailstate } from "./interface";
// 引入详情数据的ts类型
import type { HospitalDetail } from '@/api/hospital/type'
import type { HosPitalDetail,DepartmentResponseData,DepartmentArr} from "@/api/hospital/type";
const useDetailStore = defineStore('Detail', {
    state: (): Detailstate => {
        return {
            // 医院详情的数据
            hospitalInfo: ({} as HosPitalDetail),
            // 存储医院科室的数组
            departmentArr:[]
        }
    },
    actions: {
        // 获取医院详情的方法
        async getHospital(hoscode: string) {
            let result: HospitalDetail = await reqHospitalDetail(hoscode)
            if (result.code === 200) {
                this.hospitalInfo = result.data
            }
            // 获取医院科室的方法

        },
        async getDepartment(hoscode: string) {
            let result:DepartmentResponseData=await reqHospitalDepartment(hoscode)
            console.log(result);
            if (result.code === 200) {
                this.departmentArr = result.data
            }
        },
    },
    getters: {

    }

})
// 获取仓库的方法对外暴露
export default useDetailStore