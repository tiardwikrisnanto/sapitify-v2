import { createSlice } from "@reduxjs/toolkit";

export const trackSlice = createSlice({
  name: "track",
  initialState: {
    tracks: [],
  },
  reducers: {
    setTracks: (state, action) => {
      state.tracks = action.payload;
    },
  },
});

export const { setTracks } = trackSlice.actions;

export const selectTracks = (state) => state.track.tracks;

export default trackSlice.reducer;
