import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import { carReducer } from "./slices/carSlice";
import { loadingReducer } from './slices/loadingSlice';
import { brandReducer } from './slices/brandSlice';
import { carModelReducer } from './slices/carModelSlice';
import { colorReducer } from './slices/colorSlice';
import { fuelTypeReducer } from './slices/fuelTypeSlice';
import { shiftTypeReducer } from './slices/shiftTypeSlice';



const rootReducer = combineReducers({
    car:carReducer,
    loading: loadingReducer,
    brand:brandReducer,
    carModel:carModelReducer,
    color:colorReducer,
    fuelType:fuelTypeReducer,
    shiftType : shiftTypeReducer,
});


export const store =configureStore({reducer:rootReducer});
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;