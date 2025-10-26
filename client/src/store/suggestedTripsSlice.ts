import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api/v1';

export interface SuggestedTrip {
  destination: string;
  highlights: string[];
  bestTime: string;
  duration: string;
  description: string;
  category: string;
  imageUrl: string | null;
}

interface SuggestedTripsState {
  trips: SuggestedTrip[];
  loading: boolean;
  error: string | null;
}

export const fetchSuggestedTrips = createAsyncThunk(
  'suggestedTrips/fetch',
  async (_, { rejectWithValue }) => {
    try {
      
      const response = await fetch(`${API_BASE_URL}/ai/suggested-trips`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.error('Invalid response type:', contentType);
        return rejectWithValue('Server returned an invalid response');
      }

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || 'Failed to fetch suggested trips');
      }

      return data.data.suggestions;
    } catch (error: any) {
      console.error('Fetch suggested trips error:', error);
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

const initialState: SuggestedTripsState = {
  trips: [],
  loading: false,
  error: null,
};

const suggestedTripsSlice = createSlice({
  name: 'suggestedTrips',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuggestedTrips.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSuggestedTrips.fulfilled, (state, action) => {
        state.loading = false;
        state.trips = action.payload;
      })
      .addCase(fetchSuggestedTrips.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = suggestedTripsSlice.actions;
export default suggestedTripsSlice.reducer;
