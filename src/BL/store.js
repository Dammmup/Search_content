import { configureStore } from "@reduxjs/toolkit";

import catalogSlice from "./slices/catalogSlice";
import basketSlice from "./slices/basketSlice";

export const store = configureStore({
  reducer: {
    catalogSlice,
    // userSlice,
    basketSlice,
  },
});
