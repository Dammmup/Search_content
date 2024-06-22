import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchFilms = createAsyncThunk(
  'films/fetchFilms',
  async (query, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://api.kinopoisk.dev/v1.4/movie/search?query=${query}`, {
        headers: {
          'X-API-KEY': 'TVNGA92-EXWMKR4-N35G404-MPWWSHX'
        }
      });
      return response.data.docs;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error fetching data');
    }
  }
);

const filmSlice = createSlice({
  name: 'films',
  initialState: {
    films: [],
    likedFilms: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    likeFilm: (state, action) => {
      state.likedFilms.push(action.payload);
    },
    unlikeFilm: (state, action) => {
      state.likedFilms = state.likedFilms.filter(film => film.id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilms.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchFilms.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.films = action.payload;
      })
      .addCase(fetchFilms.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { likeFilm, unlikeFilm } = filmSlice.actions;
export default filmSlice.reducer;
