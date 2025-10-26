import { createSlice, createAsyncThunk, } from '@reduxjs/toolkit';

interface Activity {
  time: string;
  title: string;
  duration: string;
  notes: string;
  placeName?: string;
  PublicImageURL?: string;
  weather?: any;
  image?: string | null;
 bestTimeToVisit?: string; 
}

interface Day {
  day: number;
  date: string;
  activities: Activity[];
  safety?: string;
  placeQueried?: string;
  weather?: any;
  image?: string | null;
}

interface ItineraryData {
  destination: string;
  summary: string;
  days: Day[];
  explanation: string[];
}

interface ItineraryState {
  data: ItineraryData | null;
  loading: boolean;
  error: string | null;
}

const initialState: ItineraryState = {
  data: null,
  loading: false,
  error: null,
};

export const generateItinerary = createAsyncThunk(
  'itinerary/generate',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:4000/api/v1/ai/generate-response', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const text = await response.text().catch(() => '');
        throw new Error(`Server returned ${response.status}: ${text}`);
      }

      const body = await response.json();
      if (!body) throw new Error('Invalid JSON response from server');

      if (body.done && body.data) {
        return body.data;
      } else if (body.data) {
        return body.data;
      } else {
        throw new Error('Unexpected response shape from server');
      }
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to generate itinerary');
    }
  }
);

const itinerarySlice = createSlice({
  name: 'itinerary',
  initialState,
  reducers: {
    clearItinerary: (state) => {
      state.data = null;
      state.error = null;
      state.loading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    setItineraryData: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateItinerary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateItinerary.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(generateItinerary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearItinerary, clearError, setItineraryData } = itinerarySlice.actions;
export default itinerarySlice.reducer;
