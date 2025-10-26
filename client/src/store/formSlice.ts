import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface FormData {
  destination: string;
  start_date: string;
  end_date: string;
  intrests: string;
  travellers: string;
  budget: string;
}

interface FormState {
  formData: FormData | null;
}

const initialState: FormState = {
  formData: null,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<FormData>) => {
      state.formData = action.payload;
    },
    clearFormData: (state) => {
      state.formData = null;
    },
  },
});

export const { setFormData, clearFormData } = formSlice.actions;
export default formSlice.reducer;
