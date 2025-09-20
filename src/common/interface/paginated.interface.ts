

export interface PaginationMetaData{
    currentPage: number;

    itemsPerPage: number;

    totalPages: number;

    hasPreviousPage:boolean;

    hasNextPage:boolean;

    itemCount: number;
}


export interface PaginatedResponse<T>{
    items:T[];
    meta: PaginationMetaData;
}