import { configureStore } from '@reduxjs/toolkit';
import itineraryReducer from './itinerarySlice';
import authReducer from './authSlice';
import formReducer from './formSlice';
import savedItinerariesReducer from './savedItinerariesSlice';
import suggestedTripsReducer from './suggestedTripsSlice';

export const store = configureStore({
  reducer: {
    itinerary: itineraryReducer,
    auth: authReducer,
    form: formReducer,
    savedItineraries: savedItinerariesReducer,
    suggestedTrips: suggestedTripsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
