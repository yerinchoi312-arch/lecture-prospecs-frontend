import { httpClient } from "./axios.ts";
import qs from "qs";

export interface GetProductsParams{
    page?: number;
    limit?: number;
    categoryId?:number;
    styles?:string[]; //react 내부
    genders?:string[];
    sizes?:string[];
}
export const getProducts= async (data:GetProductsParams) => {
    const response = await httpClient.get("/products",{
        params:data,
        paramsSerializer:params => qs.stringify(params,{arrayFormat:"repeat"}),
    });
    return response.data;
}