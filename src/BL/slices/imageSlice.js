// src/store/imageSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const UNSPLASH_CLIENT_ID = '3CQ-Y7JZ_hSuDcAC4OsLJm5hbIJ4u5WFlcLQ9f3rYok';

// Асинхронный thunk для поиска изображений
export const fetchImages = createAsyncThunk(
  'images/fetchImages',
  async (query, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://api.unsplash.com/search/photos`, {
        params: {
          query: query,
          client_id: UNSPLASH_CLIENT_ID,
        },
      });
      return response.data.results;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error fetching data from Unsplash');
    }
  }
);

const imageSlice = createSlice({
  name: 'images',
  initialState: {
    images: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    // Дополнительные редюсеры могут быть добавлены здесь
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchImages.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchImages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.images = action.payload;
      })
      .addCase(fetchImages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default imageSlice.reducer;
