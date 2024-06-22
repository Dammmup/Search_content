// src/BL/slices/rickAndMortySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Асинхронный thunk для поиска персонажей
export const fetchCharacters = createAsyncThunk(
  'rickAndMorty/fetchCharacters',
  async (name, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/character/?name=${name}`);
      console.log("API Response:", response.data.results); // Лог для проверки данных
      return response.data.results;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Ошибка получения персонажей');
    }
  }
);

// src/BL/slices/rickAndMortySlice.js
const rickAndMortySlice = createSlice({
  name: 'rickAndMorty',
  initialState: {
    characters: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    likedCharacters: []
  },
  reducers: {
    likeCharacter: (state, action) => {
      state.likedCharacters.push(action.payload);
      console.log('Character liked:', action.payload); // Лог для проверки
    },
    unlikeCharacter: (state, action) => {
      state.likedCharacters = state.likedCharacters.filter(character => character.id !== action.payload.id);
      console.log('Character unliked:', action.payload); // Лог для проверки
    },
  },
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


export const { likeCharacter, unlikeCharacter } = rickAndMortySlice.actions;

export default rickAndMortySlice.reducer;
