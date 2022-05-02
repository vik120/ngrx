import * as fromCustomer from "./customer-reducers";
import { ActionReducerMap, createSelector } from "@ngrx/store";


// Master Reducer state
export interface RootReducerState {
    // Pass mulitple reducers
    customers: fromCustomer.CustomerReducerState
}


// Master Reducer
export const rootReducer: ActionReducerMap<RootReducerState> = {
    // Add mulitple reducers    
    customers: fromCustomer.UserReducer
}


// Master reducers selector
export const getCustomerState = (state: RootReducerState) => state.customers

// For getting the values from inner reducers, use createSelectors

export const getCustomerLoaded = createSelector(getCustomerState, fromCustomer.getLoaded);
export const getCustomerLoading = createSelector(getCustomerState, fromCustomer.getLoading);
export const getCustomers = createSelector(getCustomerState, fromCustomer.getCustomers);
export const getCustomerError = createSelector(getCustomerState, fromCustomer.getError);