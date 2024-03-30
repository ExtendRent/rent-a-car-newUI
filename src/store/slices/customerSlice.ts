import { AddCustomerModel } from '../../models/Requests/Customer/AddCustomerModel';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CustomerService from "../../services/customerService";
import { UpdateCustomerModel } from '../../models/Requests/Customer/UpdateCustomerModel';
import customerService from '../../services/customerService';


export const fetchCustomers = createAsyncThunk(
  "customers/fetchCustomer",
  async (_, thunkAPI) => {
    try {
      const allCustomers = await customerService.getAll();
      return allCustomers.data.response;
    } catch (error) {
      console.error("Error fetching customers:", error);
      throw new Error("İşlem sırasında bir hata oluştu");
    }
  }
);

export const getByIdCustomer = createAsyncThunk(
  "customers/getByIdCustomers",
  async ({ id }: { id: number; }, thunkAPI) => {
    try {
      const getByIded = await customerService.getById(id);
      return getByIded.data;

    } catch (error) {
      console.error("Error adding getByIded:", error);
      throw new Error("İşlem sırasında bir hata oluştu");
    }
  }
);

export const getCustomerCountByStatus = createAsyncThunk(
  "customers/getCustomerCountByStatus",
  async ({ status }: { status: string; }, thunkAPI) => {
    try {
      const getByCounted = await customerService.getCustomerCountByStatus(status);
      return getByCounted.data;

    } catch (error) {
      console.error("Error adding getByCounted:", error);
      throw new Error("İşlem sırasında bir hata oluştu");
    }
  }
);

export const getCustomerCountIsDeleted = createAsyncThunk(
  "customers/getCustomerCountIsDeleted",
  async ({ deleted }: { deleted: boolean; }, thunkAPI) => {
    try {
      const getCountIsDelete = await customerService.getCustomerCountIsDeleted(deleted);
      return getCountIsDelete.data;

    } catch (error) {
      console.error("Error adding getCountIsDeleted:", error);
      throw new Error("İşlem sırasında bir hata oluştu");
    }
  }
);

export const getRentalsByCustomer = createAsyncThunk(
  "customers/getRentalsByCustomers",
  async ({ customerId }: { customerId: number; }, thunkAPI) => {
    try {
      const getById = await customerService.getRentalsByCustomerId(customerId);
      return getById.data.response;

    } catch (error) {
      console.error("Error adding getByBrandIded:", error);
      throw new Error("İşlem sırasında bir hata oluştu");
    }
  }
);


export const addCustomer = createAsyncThunk(
  "customers/addCustomer",
  async (addCustomerData: AddCustomerModel
    , thunkAPI) => {
    try {
      const addedCustomer = await customerService.add(addCustomerData);
      return addedCustomer.data;
    } catch (error: any) {
       
      if (error && error.response && (error.response.data.response.errorCode === 3000||error.response.data.response.errorCode ===2014|| error.response.data.response.errorCode ===2016 || error.response.data.response.errorCode ===2015 ||error.response.data.response.errorCode ===2021 ||error.response.data.response.errorCode ===2002 )) {
        
        throw error.response.data.response.details[0];
        
      }
      
    }
  }
);


export const updateCustomer = createAsyncThunk(
  "customers/updateCustomer",
  async (updatedCustomerData: UpdateCustomerModel, thunkAPI) => {
    try {
      const updatedCustomer = await customerService.update(updatedCustomerData);
      if (updatedCustomer.data) {
        return updatedCustomer.data.response
      }
      else {
        console.warn("Service response does not contain data.")
        return null;
      }
    } catch (error) {
      console.error("Error updating customer", error);
      throw new Error("İşlem sırasında bir hata oluştu");
    }
  }
)

export const deleteCustomer = createAsyncThunk(
  "customers/deleteCustomer",
  async ({ customerId }: { customerId: number; }, thunkAPI) => {
    try {
      await customerService.delete(customerId);
      return {
        deletedCustomerId: customerId
      };
    } catch (error) {
      console.error("Error deleting customer:", error);
      throw new Error("İşlem sırasında bir hata oluştu");
    }
  }
);

const customerSlice = createSlice({
  name: "customer",
  initialState: { customers: [] as any[], error: null as string | null ,customerStatus:0,customerCountIsDeleted: 0 },
  reducers: {},
  extraReducers: (builder) => {

    /*---------------*/

    builder.addCase(addCustomer.pending, (state) => { });
    builder.addCase(addCustomer.fulfilled, (state, action) => {
      state.error=null;
      state.customers.push(action.payload);
    });
    builder.addCase(addCustomer.rejected, (state,action) => { 
      state.error = action.error.message || "Bir hata oluştu.";
    });


    /*---------------*/

    builder.addCase(getByIdCustomer.pending, (state) => { });
    builder.addCase(getByIdCustomer.fulfilled, (state, action) => {
      state.error=null;
      state.customers = [action.payload];
      
    });
    builder.addCase(getByIdCustomer.rejected, (state,action) => {
      state.error = action.error.message || "Bir hata oluştu.";
    });

    /*---------------*/

    builder.addCase(getCustomerCountByStatus.pending, (state) => { });
    builder.addCase(getCustomerCountByStatus.fulfilled, (state, action) => {
      state.error=null;
        state.customerStatus = action.payload.response;
    });
    builder.addCase(getCustomerCountByStatus.rejected, (state,action) => {
      state.error = action.error.message || "Bir hata oluştu.";
    });

     /*---------------*/

     builder.addCase(getCustomerCountIsDeleted.pending, (state) => { });
     builder.addCase(getCustomerCountIsDeleted.fulfilled, (state, action) => {
        state.error=null;
         state.customerCountIsDeleted = action.payload.response;
     });
     builder.addCase(getCustomerCountIsDeleted.rejected, (state,action) => {
      state.error = action.error.message || "Bir hata oluştu.";
     });

      /*---------------*/

    builder.addCase(fetchCustomers.pending, (state) => { });
    builder.addCase(fetchCustomers.fulfilled, (state, action) => {
      state.error=null;
      state.customers = action.payload;
    });
    builder.addCase(fetchCustomers.rejected, (state,action) => {
      state.error = action.error.message || "Bir hata oluştu.";
     });

    /*-----------------*/

    builder.addCase(getRentalsByCustomer.pending, (state) => { });
    builder.addCase(getRentalsByCustomer.fulfilled, (state, action) => {
      state.error=null;
      state.customers = action.payload;
    });
    builder.addCase(getRentalsByCustomer.rejected, (state,action) => {
      state.error = action.error.message || "Bir hata oluştu.";
    });

    /*-----------------*/

    builder.addCase(updateCustomer.pending, (state) => { });
    builder.addCase(updateCustomer.fulfilled, (state, action) => {
      state.error=null;
      state.customers = [];
    });
    builder.addCase(updateCustomer.rejected, (state,action) => {
      state.error = action.error.message || "Bir hata oluştu.";
     });

    /*---------------*/

    builder.addCase(deleteCustomer.pending, (state) => { });
    builder.addCase(deleteCustomer.fulfilled, (state, action) => {
      state.error=null;
      const deletedCustomerId = action.payload.deletedCustomerId;
      state.customers = state.customers.filter(customer => customer.id !== deletedCustomerId);
    });
    builder.addCase(deleteCustomer.rejected, (state,action) => {
      state.error = action.error.message || "Bir hata oluştu.";
     });

  },
});

export const customerReducer = customerSlice.reducer;
export const { } = customerSlice.actions;
