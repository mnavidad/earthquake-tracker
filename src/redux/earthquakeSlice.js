import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  earthquakes: [],
  alertLevel: 'red',
};

const earthquakeSlice = createSlice({
  name: 'earthquake',
  initialState,
  reducers: {
    setEarthquakes(state, action) {
      state.earthquakes = action.payload;
    },
    setAlertLevel(state, action) {
      state.alertLevel = action.payload;
    },
  },
});

export const { setEarthquakes, setAlertLevel } = earthquakeSlice.actions;
export default earthquakeSlice.reducer;
