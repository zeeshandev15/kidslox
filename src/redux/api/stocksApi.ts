import { createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '@/lib/auth/axiosInstance';

export const createInventory = createAsyncThunk('stock/createInventorys', async (formData: any, thunkAPI) => {
  try {
    const { data } = await axiosInstance.post('/api/stock', formData);
    return data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const fetchInventory = createAsyncThunk('stock/fetchAll', async (_, thunkAPI) => {
  try {
    const { data: result } = await axiosInstance.get('/api/stock');
    return result;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const updateInventory = createAsyncThunk(
  'stock/update',
  async ({ id, data }: { id: string; data: any }, thunkAPI) => {
    try {
      const { data: result } = await axiosInstance.put(`/api/stock/${id}`, data);

      return result;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message || 'Failed to update Inventory');
    }
  }
);
export const deleteInventory = createAsyncThunk(`stock/deleteInventory`, async (id: string, thunkAPI) => {
  try {
    const { data: result } = await axiosInstance.delete(`/api/stock/${id}`);
    return result;
  } catch (err: any) {
    const errorMessage = err?.response?.data?.message || err.message || 'Something went Wrong';
    return thunkAPI.rejectWithValue(errorMessage);
  }
});
