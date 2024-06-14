// src/store/rickAndMortySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Асинхронный thunk для поиска персонажей
export const fetchCharacters = createAsyncThunk(
  'rickAndMorty/fetchCharacters',
  async (name, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/character/?name=${name}`);
      return response.data.results;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Ошибка получения персонажей');
    }
  }
);

const rickAndMortySlice = createSlice({
  name: 'rickAndMorty',
  initialState: {
    characters: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.characters = action.payload;
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default rickAndMortySlice.reducer;
