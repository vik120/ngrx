import { CustomerInterfce } from '../modals/customer-interfce';


export const Customer_List =                'customer list Customer List Request';
export const Customer_List_SUCCESS =        'customer list CustomerAction Success';
export const Customer_List_FAILURE =        'customer list CustomerAction Failure';
export const Customer_Delete =              'customer list CustomerAction Delete';
export const Customer_Delete_SUCCESS =      'customer Delete Action Success';
export const Customer_Delete_FAILURE =      'customer Delete Action Failure';

// Get Customer List
export class CustomerListRequestAction {
  readonly type = Customer_List;
}

export class CustomerListSuccessAction {
    readonly type = Customer_List_SUCCESS;

    constructor(public payload?: {data: CustomerInterfce}) { }
}

export class CustomerListFailureAction {
    readonly type = Customer_List_FAILURE;

    constructor(public payload: any) { }
}

// Customer Delete Actions

export class CustomerListDeleteAction {
  readonly type = Customer_Delete;

  constructor(public payload?: {id: number}) { }
}

export class CustomerDeleteSuccessAction {
  readonly type = Customer_Delete_SUCCESS;

  constructor(public payload?: {data: CustomerInterfce}) { }
}

export class CustomerDeleteFailureAction {
  readonly type = Customer_Delete_FAILURE;

  constructor(public payload: any) { }
}