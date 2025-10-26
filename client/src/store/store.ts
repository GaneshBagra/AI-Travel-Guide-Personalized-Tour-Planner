import { configureStore } from '@reduxjs/toolkit';
import itineraryReducer from './itinerarySlice';
import authReducer from './authSlice';
import formReducer from './formSlice';
import savedItinerariesReducer from './savedItinerariesSlice';

export const store = configureStore({
  reducer: {
    itinerary: itineraryReducer,
    auth: authReducer,
    form: formReducer,
    savedItineraries: savedItinerariesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
