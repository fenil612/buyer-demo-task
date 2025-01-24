import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch buyers
export const fetchBuyers = createAsyncThunk("buyers/fetchBuyers", async () => {
  try {
    const response = await axios.get("http://localhost:3000/buyers");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
});

// Async thunk to fetch users
export const getBuyerById = createAsyncThunk(
  "buyers/getBuyerById",
  async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/buyers/${id}`);

      console.log("response.data", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }
);

// Async thunk to add a user
export const addBuyer = createAsyncThunk(
  "buyer/addBuyer",
  async (buyerData) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/buyers",
        buyerData
      );
      return response.data;
    } catch (error) {
      console.error("Error adding user:", error);
      throw error;
    }
  }
);

// Async thunk to update buyer
export const updateBuyer = createAsyncThunk(
  "buyer/updateBuyer",
  async (buyerData) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/buyers/${buyerData.id}`,
        buyerData
      );
      return response.data;
    } catch (error) {
      console.error("Error updating buyer:", error);
      throw error;
    }
  }
);

// buyer Slice
export const buyerSlice = createSlice({
  name: "buyer",
  initialState: {
    data: [],
    status: "idle", // 'idle', 'loading', 'succeeded', 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Fetch
    builder
      .addCase(fetchBuyers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchBuyers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchBuyers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    // Fetch by ID
    builder
      .addCase(getBuyerById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getBuyerById.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(" getUserById action.payload==>", action.payload);
        state.data = [action.payload];
      })
      .addCase(getBuyerById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    // Add
    builder
      .addCase(addBuyer.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addBuyer.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data.push(action.payload); // Add the new user to the data array
      })
      .addCase(addBuyer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(updateBuyer.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateBuyer.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Update the buyer in the data array
        const index = state.data.findIndex(
          (buyer) => buyer.id === action.payload.id
        );
        if (index !== -1) {
          state.data[index] = action.payload; // Replace with the updated buyer
        }
      })
      .addCase(updateBuyer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
// export const {  } = buyerSlice.actions;

export default buyerSlice.reducer;
