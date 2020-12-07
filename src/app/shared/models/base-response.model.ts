export class BaseResponseModel {
  content: any;
  number: number;
  numberOfElements: number;
  pageable: {
    offset: number;
    pageNumber: number;
    pageSize: number;
  };
  totalElements: number;
  totalPages: number;
}
