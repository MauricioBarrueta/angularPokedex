export interface Pagination {
    count: number
    next: string
    previous: any
    results: PaginationRes[]
}
  
export interface PaginationRes {
    name: string
    url: string
}  