import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { createInventory, deleteInventory, fetchInventory, updateInventory } from '../api/stocksApi';

export interface Inventory {
  _id: string;
  id: string;
  name: string;
  location: string;
  joinedDate: string;
  image: string;
  status: 'pending' | 'delivered' | 'refunded';
  createdAt: string;

  __v: number;
}

interface InventoryState {
  inventories: Inventory[];
  loading: boolean;
  error: string | null;
}

const initialCustomerState: InventoryState = {
  inventories: [],
  loading: false,
  error: null,
};

const stocksSlice = createSlice({
  name: 'stocks',
  initialState: initialCustomerState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createInventory.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(createInventory.fulfilled, (state, action) => {
      state.loading = false;
      if ((action.payload as any)._id) {
        state.inventories.push(action.payload as Inventory);
      }
    });

    builder.addCase(createInventory.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || action.error.message || 'Failed to create customer';
    });

    builder.addCase(
      fetchInventory.fulfilled,
      (state, action: PayloadAction<{ success: boolean; inventorys: Inventory[] }>) => {
        state.loading = false;
        state.inventories = action.payload.inventorys;
      }
    );

    builder.addCase(fetchInventory.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || action.error.message || 'Failed to load customer';
    });

    builder.addCase(updateInventory.fulfilled, (state, action: PayloadAction<Inventory>) => {
      state.loading = false;
      const index = state.inventories.findIndex((p) => p._id === action.payload._id);
      if (index !== -1) {
        state.inventories[index] = action.payload;
      }
    });

    builder.addCase(deleteInventory.fulfilled, (state, action: PayloadAction<{ id: string }>) => {
      if (Array.isArray(state.inventories)) {
        state.inventories = state.inventories.filter((inventory) => inventory._id !== action.payload.id);
      }
    });

    builder.addCase(deleteInventory.rejected, (state, action) => {
      state.error = (action.payload as string) || action.error.message || 'Failed to delete Customer';
    });
  },
});

export default stocksSlice.reducer;
