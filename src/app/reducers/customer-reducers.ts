import { CustomerInterfce } from '../modals/customer-interfce';
import { Action } from '../actions/index';
import { Customer_List_FAILURE, Customer_List_SUCCESS, Customer_List, Customer_Delete, Customer_Delete_SUCCESS, Customer_Delete_FAILURE } from '../actions/customer-action';
import { filter } from 'rxjs/operators';
import { storeUtility } from './../utils/store-utility';
import { createSelector } from '@ngrx/store';

// State
export interface CustomerReducerState {
    loading: boolean;
    loaded: boolean;
    error: boolean;
    entities: { [id: number]: CustomerInterfce };
    ids: number[]
}

// Initial value of state 
const initialState: CustomerReducerState = {
    loading: false,
    loaded: false,
    entities: {},
    error: false,
    ids: []
}


// Actions
export function UserReducer(state = initialState, action: Action): CustomerReducerState {
    switch (action.type) {
        case Customer_List: {
            return {
                ...state,
                loading: true
            }
        }
        case Customer_List_SUCCESS: {
            const obj = storeUtility.normalize(action.payload.data)
            const ids = (action.payload.data).map(user => user.id)
            return {
                ...state,
                loading: false,
                loaded: true,
                error: false,
                //     users: state.users.concat(action.payload.data) // avoid overwrite of data
                ids: storeUtility.filterDuplicateId([...state.ids, ...ids]),
                entities: { ...state.entities, ...obj }
            }
        }
        case Customer_List_FAILURE: {
            return {
                ...state,
                error: true,
                loading: false
            }
        }

        // Delete Customers
        case Customer_Delete: {
            //            const users = state.users.filter((item) => item.id != action.payload.id)
            const newIds = state.ids.filter((key) => key != action.payload.id)
            return {
                ...state,
                loading: false,
                loaded: false,
                // put only ids which are not same with deleted id
                ids: state.ids.filter((key) => key != action.payload.id),
                // Remove the entity data as per id and put return enitites in state.entity
                entities: storeUtility.removeKey(state.entities, action.payload.id),
                // users: users
            }
        }

        case Customer_Delete_SUCCESS: {
            return {
                ...state,
                loaded: true,
                loading: false,
            }
        }

        case Customer_Delete_FAILURE:
            return {
                ...state,
                error: true,
                loading: false
            };

        default: {
            return state
        }
    }
}


// Selectors
// For accessing the state variable we use selectors

export const getLoading = (state: CustomerReducerState) => state.loading;
export const getLoaded = (state: CustomerReducerState) => state.loaded;
export const getCustomerEntity = (state: CustomerReducerState) => state.entities;
export const getCustomerId = (state: CustomerReducerState) => state.ids
export const getError = (state: CustomerReducerState) => state.error;
export const getCustomers = createSelector(
                                            getCustomerEntity,
                                            (entities) => storeUtility.unNormalize(entities) 
                                        )