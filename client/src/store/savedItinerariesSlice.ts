import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';

interface SavedItinerary {
  _id: string;
  destination: string;
  start_date: string;
  end_date: string;
  intrests: string;
  travellers?: string;
  budget?: string;
  createdAt: string;
}

interface SavedItinerariesState {
  itineraries: SavedItinerary[];
  loading: boolean;
  error: string | null;
  saveSuccess: boolean;
}

const initialState: SavedItinerariesState = {
  itineraries: [],
  loading: false,
  error: null,
  saveSuccess: false,
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api/v1';
const API_URL = `${API_BASE_URL}/ai`;

// Fetch saved itineraries
export const fetchSavedItineraries = createAsyncThunk(
  'savedItineraries/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/list-all-itinary`, {
        method: 'POST',
        credentials: 'include',
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch itineraries');
      }
      
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Save itinerary
export const saveItinerary = createAsyncThunk(
  'savedItineraries/save',
  async (formData: { destination: string; start_date: string; end_date: string; intrests: string; travellers?: string; budget?: string }, { rejectWithValue }) => {
    try {
      const form = new FormData();
      form.append('destination', formData.destination);
      form.append('start_date', formData.start_date);
      form.append('end_date', formData.end_date);
      form.append('intrests', formData.intrests);
      if (formData.travellers) form.append('travellers', formData.travellers);
      if (formData.budget) form.append('budget', formData.budget);

      const response = await fetch(`${API_URL}/save-itinary`, {
        method: 'POST',
        credentials: 'include',
        body: form,
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to save itinerary');
      }
      
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const savedItinerariesSlice = createSlice({
  name: 'savedItineraries',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSaveSuccess: (state) => {
      state.saveSuccess = false;
    },
  },
  extraReducers: (builder) => {
    // Fetch itineraries
    builder
      .addCase(fetchSavedItineraries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSavedItineraries.fulfilled, (state, action: PayloadAction<SavedItinerary[]>) => {
        state.loading = false;
        state.itineraries = action.payload;
      })
      .addCase(fetchSavedItineraries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Save itinerary
    builder
      .addCase(saveItinerary.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.saveSuccess = false;
      })
      .addCase(saveItinerary.fulfilled, (state) => {
        state.loading = false;
        state.saveSuccess = true;
      })
      .addCase(saveItinerary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.saveSuccess = false;
      });
  },
});

export const { clearError, clearSaveSuccess } = savedItinerariesSlice.actions;
export default savedItinerariesSlice.reducer;
