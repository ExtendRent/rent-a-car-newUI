
import { GetByDateCarModel } from '../../models/Responses/Car/GetByDateCarModel';
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { GetAllFilteredResponse } from '../../models/Responses/Car/GetAllFilteredResponse';
import { AddCarModel } from '../../models/Requests/Car/AddCarModel';
import { UpdateCarModel } from '../../models/Requests/Car/UpdateCarModel';
import { GetByDateCarResponse } from '../../models/Responses/Car/GetByDateCarResponse';
import carService from '../../services/carService';

export const fetchCars = createAsyncThunk(
    "cars/fetchCars",
    async (args, thunkAPI) => {
        try {
            const state: any = thunkAPI.getState();

            if (state.car.cars.lenght) {
                return state.car.cars;
            }

            const allCars = await carService.getAll();
            return allCars.data.response;
        } catch (error) {
            console.error("Error fetching cars:", error);
            throw error; // Hata durumunu iletmek önemlidir
        }
    });
export const getByDateCars = createAsyncThunk(
    "cars/getByDateCars",
    async (searchDate: GetByDateCarModel, thunkAPI) => {
        try {
            const filtredCars = await carService.getByDate(searchDate);
            return filtredCars.data.response;
        } catch (error) {
            console.error("Error fetching cars:", error);
            throw error; // Hata durumunu iletmek önemlidir
        }
    });
export const getByAllFilteredCars = createAsyncThunk(
    "cars/getByAllFilteredCars",
    async (allFiltred: GetAllFilteredResponse, thunkAPI) => {
        try {
            const filtredCars = await carService.getByAllFiltered(allFiltred);
            console.log(allFiltred);
            
            return filtredCars.data.response;
        } catch (error: any) {
            if (error && error.response && (error.response.data.response.errorCode === 1017 || error.response.data.response.errorCode === 1018 || error.response.data.response.errorCode === 1 )) {
              
                throw error.response.data.response.details[0];
              
            }
            
          }
    });

export const getCarCountByStatus = createAsyncThunk(
    "cars/getCarCountByStatus",
    async ({ statusId }: { statusId: number; }, thunkAPI) => {
        try {
            const getByCounted = await carService.getCarCountByStatus(statusId);
            return getByCounted.data;

        } catch (error) {
            console.error("Error adding getByCounted:", error);
            throw error;
        }
    });

export const getCarCountIsDeleted = createAsyncThunk(
    "cars/getCountIsDeleted",
    async ({ deleted }: { deleted: boolean; }, thunkAPI) => {
        try {
            const getCountIsDelete = await carService.getCarCountIsDeleted(deleted);
            return getCountIsDelete.data;

        } catch (error) {
            console.error("Error adding getCountIsDeleted:", error);
            throw error;
        }
    }
);

export const addCar = createAsyncThunk(
    "cars/addCars",
    async (newCarData: AddCarModel, thunkAPI) => {
        try {
            const addedCar = await carService.add(newCarData);

            return addedCar.data;

        } catch (error) {
            console.error("Error adding car:", error);
            throw error;
        }
    }
);
export const updateCar = createAsyncThunk(
    "cars/updateCars",
    async (updatedCarData: UpdateCarModel, thunkAPI) => {
        try {

            const updatedCar = await carService.update(updatedCarData);
            if (updatedCar.data) {
                return updatedCar.data.response;
            }
            else {
                console.warn("Server response does not contain data.");
                return null;
            }
        } catch (error) {
            console.error("Error updating car:", error);
            throw error;
        }
    });

export const deleteCar = createAsyncThunk(
    "cars/deleteCar",
    async ({ carId }: { carId: number; }, thunkAPI) => {
        try {
            await carService.delete(carId);
            return {
                deletedCarId: carId
            };
        } catch (error) {
            console.error("Error deleting car:", error);
            throw error;
        }
    });

export const getByCarId = createAsyncThunk(
    "cars/getByCarId",
    async ({ carId }: { carId: number; }, thunkAPI) => {
        try {
            const getByCarIded = await carService.getByCarId(carId);

            return getByCarIded.data;


        } catch (error) {
            console.error("Error fetching getByCarIded:", error);
            throw error;
        }
    }
);

const carSlice = createSlice(
    {
        name: "car",
        initialState: { cars: [] as any[] , carStatus:0, carCountIsDeleted:0 ,error: null as string | null},
        reducers: {},
        extraReducers: builder => {
            builder
                .addCase(fetchCars.pending, (state) => { })
                .addCase(fetchCars.fulfilled, (state, action) => {
                    state.error=null;
                    state.cars = action.payload;
                })
                .addCase(fetchCars.rejected, (state) => { })
                .addCase(getByDateCars.pending, (state) => { })
                .addCase(getByDateCars.fulfilled, (state, action) => {
                    state.error=null;
                    state.cars = action.payload;
                })
                .addCase(getByDateCars.rejected, (state) => { })
                .addCase(getByAllFilteredCars.pending, (state) => { })
                .addCase(getByAllFilteredCars.fulfilled, (state, action) => {
                    state.error=null;
                    state.cars = Array.isArray(action.payload) ? action.payload : [];
                })
                .addCase(getByAllFilteredCars.rejected, (state,action) => { 
                    state.cars = [];
                    state.error = action.error.message || "Bir hata oluştu.";
                })
                .addCase(addCar.pending, (state) => { })
                .addCase(addCar.fulfilled, (state, action) => {
                    if (Array.isArray(action.payload)) {
                        state.cars = action.payload;
                    } else {
                        console.error('Invalid payload type for addCar.fulfilled');
                    }
                })
                .addCase(addCar.rejected, (state) => { })
                .addCase(updateCar.pending, (state) => { })
                .addCase(updateCar.fulfilled, (state) => {
                    state.cars = [];
                })
                .addCase(updateCar.rejected, (state) => { })
                .addCase(deleteCar.pending, (state) => { })
                .addCase(deleteCar.fulfilled, (state, action) => {
                    state.error=null;
                    const deletedCarId = action.payload.deletedCarId;
                    state.cars = state.cars.filter(car => car.id !== deletedCarId);
                })
                .addCase(deleteCar.rejected, (state) => { })
                .addCase(getByCarId.pending, (state) => { })
                .addCase(getByCarId.fulfilled, (state, action) => {
                    if (Array.isArray(action.payload)) {
                        state.cars = action.payload;
                    } else {
                        console.error('Invalid payload type for getByCarId.fulfilled');
                    }
                })
                .addCase(getByCarId.rejected, (state) => { })
                .addCase(getCarCountByStatus.pending, (state) => { })
                .addCase(getCarCountByStatus.fulfilled, (state, action) => {
                    state.error=null;
                    state.carStatus = action.payload.response;
                })
                .addCase(getCarCountByStatus.rejected, (state) => { })
                .addCase(getCarCountIsDeleted.pending, (state) => { })
                .addCase(getCarCountIsDeleted.fulfilled, (state, action) => {
                    state.carCountIsDeleted = action.payload.response;
                })
                .addCase(getCarCountIsDeleted.rejected, (state) => { })
        }
    }
)
export const carReducer = carSlice.reducer;
export const { } = carSlice.actions;