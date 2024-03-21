import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ShowRentalModel } from "../../models/Requests/Rental/ShowRental";
import ShowRentalService from "../../services/showRentalService";
import { AddRentalModel } from "../../models/Requests/Rental/AddRentalModel";


  export const addShowRental = createAsyncThunk(
    'showRental/addShowRental',
    async (rentalData: ShowRentalModel) => {
      try {
        const service: ShowRentalService = new ShowRentalService();
        const response = await service.add(rentalData);
        return response.data;
      } catch (error : any) {
        if (error && error.response && error.response.data.response.errorCode === 5000) {
          throw error.response.data.response.details[0];
      }
      }
    }
  );

  export const addRental = createAsyncThunk(
    'rental/addRental',
    async (rentalData: AddRentalModel) => {
      try {
        const service: ShowRentalService = new ShowRentalService();
        const response = await service.addRental(rentalData);
        return response.data;
      } catch (error) {
        console.error('Error adding show rental:', error);
        throw error;
      }
    }
  );

const showRentalSlice = createSlice({
    name: "showRental",
    initialState: { showRental: [] as any[], error: null as string | null, rentalResponses: [] },
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(addShowRental.pending, (state) => {});
      builder.addCase(addShowRental.fulfilled, (state, action) => {
        state.error = null;
        state.showRental.push(action.payload);
      });
      builder.addCase(addShowRental.rejected, (state,action) => {
        state.error = action.error.message || "Bir hata oluştu.";
      });


      builder.addCase(addRental.pending, (state) => {});
      builder.addCase(addRental.fulfilled, (state, action) => {
        state.error = null;
        state.showRental.push(action.payload);
      });
      builder.addCase(addRental.rejected, (state,action) => {
        state.error = action.error.message || "Bir hata oluştu.";
      });
    },
  });
  
  export const showRentalReducer = showRentalSlice.reducer;
  export const {} = showRentalSlice.actions;




  