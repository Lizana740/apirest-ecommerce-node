export interface PaginatorDto<E>{
    page:number,
    elements:E[],
    next:number,
}