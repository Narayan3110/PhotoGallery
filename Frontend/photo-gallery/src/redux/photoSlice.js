import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  photos: [],
  error: null,
  loading: false,
};

// Photo slice
const photoSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {
    setPhotos(state, action) {
      state.photos = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setLoading(state) {
      state.loading = true;
    },
    setLoaded(state) {
      state.loading = false;
    },
    deletePhotoFromState(state, action) {
      state.photos = state.photos.filter((photo) => photo.publicId !== action.payload);
    },
  },
});

export const { setPhotos, setError, setLoading, setLoaded, deletePhotoFromState } = photoSlice.actions;

export default photoSlice.reducer;
