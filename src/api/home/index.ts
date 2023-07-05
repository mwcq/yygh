// 统一管理首页模块的接口

// 引入二次封装的axios

import request from '@/utils/request'
import type { HospitalResponseData,HospitalLevelAndRegionResponseData,HospitalInfo} from './type'
// 通过枚举管理首页模块的接口地址
enum API{
    // 获取已有的医院的数据的接口地址
    HOSPITAL_URL='/hosp/hospital/',
    // 获取医院的等级和地区的接口
    HOSPITALLEVELANDREGION_URL='/cmn/dict/findByDictCode/',
    // 搜索医院的接口
    HOSPITALSEARCH_URL='/hosp/hospital/findByHosname/'
}
// 获取医院的数据
export const reqHospital=(page:number,limit:number,hostype='',districtCode='')=>request.get<any,HospitalResponseData>(API.HOSPITAL_URL+`${page}/${limit}?hostype=${hostype}&districtCode=${districtCode}`)
// 获取医院的等级和地区的数据
export const regHospitalLevelAndRegion=(dictCode:string)=>request.get<any,HospitalLevelAndRegionResponseData>(API.HOSPITALLEVELANDREGION_URL+dictCode)
// 根据医院名称获取医院的数据
export const reqHospitalSearch=(hosname:string)=>request.get<any,HospitalInfo>(API.HOSPITALSEARCH_URL+hosname)
