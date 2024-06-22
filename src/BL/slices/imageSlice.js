// src/store/imageSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const UNSPLASH_CLIENT_ID = '3CQ-Y7JZ_hSuDcAC4OsLJm5hbIJ4u5WFlcLQ9f3rYok';

export const fetchImages = createAsyncThunk(
  'images/fetchImages',
  async (query, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://api.unsplash.com/search/photos', {
        params: {
          query,
          client_id: UNSPLASH_CLIENT_ID,
        },
      });
      return response.data.results;
    } catch (error) {
      console.error('Error fetching images:', error);
      return rejectWithValue(error.response?.data || 'Ошибка при загрузке данных с Unsplash');
    }
  }
);

const imageSlice = createSlice({
  name: 'images',
  initialState: {
    images: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    likedImages: [],
  },
  reducers: {
    likeImage: (state, action) => {
      const { id, alt_description, urls } = action.payload;
      state.likedImages.push({ id, alt_description, urls });
    },
    unlikeImage: (state, action) => {
      state.likedImages = state.likedImages.filter(image => image.id !== action.payload.id);
    }
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

export const { likeImage, unlikeImage } = imageSlice.actions;

export default imageSlice.reducer;
