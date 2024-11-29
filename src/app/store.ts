import { configureStore } from '@reduxjs/toolkit';
import { countersReducer } from '../modules/counters/counters.slice';
import { usersSlice } from '../modules/users/users.slice';
import { baseApi } from '../shared/api';
import { router } from './router';

export const extraArgument = {
    router,
};

export const store = configureStore({
    reducer: {
        counters: countersReducer,
        [usersSlice.name]: usersSlice.reducer,
        [baseApi.reducerPath]: baseApi.reducer,
    },

    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({ thunk: { extraArgument } }).concat(
            baseApi.middleware,
        ),
});
