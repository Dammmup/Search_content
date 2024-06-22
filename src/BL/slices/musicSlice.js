// src/store/musicSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const CLIENT_ID = 'b3819ae69ef647abb1d892c56315085e';
const CLIENT_SECRET = '085247e350df45de93e700d04cd34231';

// Получение Spotify токена
const getSpotifyToken = async () => {
  const response = await axios.post('https://accounts.spotify.com/api/token', null, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)
    },
    params: {
      grant_type: 'client_credentials'
    }
  });
  return response.data.access_token;
};

// Асинхронный thunk для поиска музыки
export const fetchMusic = createAsyncThunk(
  'music/fetchMusic',
  async (query, { rejectWithValue }) => {
    try {
      const token = await getSpotifyToken();
      const response = await axios.get('https://api.spotify.com/v1/search', {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        params: {
          q: query,
          type: 'track'
        }
      });
      return response.data.tracks.items;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error fetching data from Spotify');
    }
  }
);

const musicSlice = createSlice({
  name: 'music',
  initialState: {
    tracks: [],
    likedTracks: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    likeTrack: (state, action) => {
      const { id, name, artists,album } = action.payload;
      state.likedTracks.push({ id, name, artists,album });
    },
    unlikeTrack: (state, action) => {
      state.likedTracks = state.likedTracks.filter(track => track.id !== action.payload.id);
    }  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMusic.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchMusic.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tracks = action.payload;
      })
      .addCase(fetchMusic.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});
export const { likeTrack, unlikeTrack } = musicSlice.actions;

export default musicSlice.reducer;
