import { $host } from ".";
import { SubmitCredentials, SubmitResponse } from "../types/userTypes";

import { buildQueryParams } from "../utils/func";



export const checkNewReq = async ()=>{
  const {data} = await $host.put(`api/user/checkNewReq`)
  return data
}

export const submit = async (item:SubmitCredentials): Promise<SubmitResponse>=>{
  const queryParams = buildQueryParams(item)
  const {data} = await $host.get(`api/user/submit?${queryParams}`)
  return data
}
