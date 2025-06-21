import { createSlice } from '@reduxjs/toolkit';

interface currentQueryState {
  countries: string;
  genre: string;
  order: string;
  type: string;
  year: string;
  page: number;
}

const initialState: currentQueryState = {
  countries: '',
  genre: '',
  order: 'NUM_VOTE',
  type: '',
  year: '',
  page: 1,
};

const currentQuerySlice = createSlice({
  name: 'currentQuerySlice',
  initialState,
  reducers: {},
});

export default currentQuerySlice.reducer;
