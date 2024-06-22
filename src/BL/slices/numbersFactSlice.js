import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Асинхронные thunk для получения фактов
export const fetchMathFact = createAsyncThunk(
  'numbersFact/fetchMathFact',
  async (number, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://numbersapi.com/${number}/math`);
      return { text: response.data, id: `math-${number}` }; // Добавляем id
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Ошибка получения математического факта');
    }
  }
);

export const fetchTriviaFact = createAsyncThunk(
  'numbersFact/fetchTriviaFact',
  async (number, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://numbersapi.com/${number}/trivia`);
      return { text: response.data, id: `trivia-${number}` }; // Добавляем id
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Ошибка получения тривиального факта');
    }
  }
);

export const fetchDateFact = createAsyncThunk(
  'numbersFact/fetchDateFact',
  async (date, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://numbersapi.com/${date}/date`);
      return { text: response.data, id: `date-${date}` }; // Добавляем id
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Ошибка получения факта по дате');
    }
  }
);

const numbersFactSlice = createSlice({
  name: 'numbersFact',
  initialState: {
    fact: '',
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    likedFacts: []
  },
  reducers: {
    likeFact: (state, action) => {
      state.likedFacts.push(action.payload);
    },
    unlikeFact: (state, action) => {
      state.likedFacts = state.likedFacts.filter(fact => fact.id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMathFact.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchMathFact.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.fact = action.payload;
      })
      .addCase(fetchMathFact.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchTriviaFact.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchTriviaFact.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.fact = action.payload;
      })
      .addCase(fetchTriviaFact.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchDateFact.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchDateFact.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.fact = action.payload;
      })
      .addCase(fetchDateFact.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});
export const { likeFact, unlikeFact } = numbersFactSlice.actions;

export default numbersFactSlice.reducer;
