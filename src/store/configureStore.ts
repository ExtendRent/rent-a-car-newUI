import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import { carReducer } from "./slices/carSlice";
import { loadingReducer } from './slices/loadingSlice';
import { brandReducer } from './slices/brandSlice';
import { carModelReducer } from './slices/carModelSlice';
import { colorReducer } from './slices/colorSlice';
import { fuelTypeReducer } from './slices/fuelTypeSlice';
import { shiftTypeReducer } from './slices/shiftTypeSlice';
import { signInReducer } from './slices/signInSlice';
import { drivingLicenseTypeReducer } from './slices/drivingLicenseTypeSlice';
import { rentalReducer } from './slices/rentalSlice';
import { adminReducer } from './slices/adminSlice';
import { employeeReducer } from './slices/employeeSlice';
import { userReducer } from './slices/userSlice';
import { customerReducer } from './slices/customerSlice';
import { showRentalReducer } from './slices/showRentalSlice';
import { paymentTypeReducer } from './slices/paymentTypeSlice';
import { carBodyTypeReducer } from './slices/carBodyTypeSlice';
import { vehicleStatusReducer } from './slices/vehicleStatusSlice';
import { carSegmentReducer } from './slices/carSegmentSlice';
import { discountCodeReducer } from './slices/discountCodeSlice';
import { rentalStatusReducer } from './slices/rentalStatusSlice';
import { paymentDetailsReducer } from './slices/paymentDetailsSlice';
import { imageReducer } from './slices/imageSlice';



const rootReducer = combineReducers({
    car:carReducer,
    loading: loadingReducer,
    brand:brandReducer,
    carModel:carModelReducer,
    color:colorReducer,
    fuelType:fuelTypeReducer,
    shiftType : shiftTypeReducer,
    signIn:signInReducer,
    drivingLicenseType: drivingLicenseTypeReducer,
    rental: rentalReducer,
    admin: adminReducer,
    employee: employeeReducer,
    user: userReducer,
    customer:customerReducer,
    showRental:showRentalReducer,
    paymentType: paymentTypeReducer,
    carBodyType:carBodyTypeReducer,
    vehicleStatus: vehicleStatusReducer,
    carSegment: carSegmentReducer,
    discountCode: discountCodeReducer,
    rentalStatus: rentalStatusReducer,
    paymentDetails : paymentDetailsReducer,
    imageLoad:imageReducer,
});


export const store =configureStore({reducer:rootReducer});
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;