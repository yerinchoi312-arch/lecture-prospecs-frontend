import { httpClient } from "./axios.ts";
import qs from "qs";
import type { Product, ProductListResponse } from "../types/product.ts";

export interface GetProductsParams{
    page?: number;
    limit?: number;
    categoryId?:number;
    styles?:string[]; //react 내부
    genders?:string[];
    sizes?:string[];
}

export const getProducts= async (data:GetProductsParams) => {
    const response = await httpClient.get<ProductListResponse>("/products",{
        params:data,
        paramsSerializer:params => qs.stringify(params,{arrayFormat:"repeat"}),
    });
    return response.data;
}

export const getProduct = async (id:number) =>{
    const response = await httpClient.get<Product>(`/products/${id}`);
    return response.data;
}