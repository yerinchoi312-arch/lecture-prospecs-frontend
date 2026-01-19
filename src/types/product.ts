import type { Category } from "./category.ts";

export interface MetaResponse{
    total: number;
    page: number;
    lastPage: number;
}

export interface Product{
    id: number;
    name: string;
    price: number;
    description: string;
    summary:string;
    isNew: boolean;
    isBest: boolean;
    createdAt: string;
    updatedAt: string;

    gender:string;
    style:string;

    //상품 고시 정보
    material?: string;
    sizeInfo?:string;
    manufacturer?:string;
    originCountry?:string;
    careInstructions?:string;
    manufactureDate?:string;
    qualityAssurance?:string;
    asPhone?:string;

    //카테고리 정보
    categoryId:number;
    category:Category;

    //색상정보
    colors: ProductColor[];
}
export interface ProductColor{
    id: number;
    productCode: string;
    colorName: string;
    hexCode: string;
    colorInfo: string;
    images:ProductImage[];
    sizes:ProductSize[];
}
export interface  ProductImage{
    id: number;
    url: string;
}
export interface  ProductSize{
    id: number;
    size: string;
    stock: number;
}

//목록 조회 응답 타입
export interface ProductListResponse {
    meta:MetaResponse,
    data:Product[],
}
