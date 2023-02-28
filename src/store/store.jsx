import { configureStore } from "@reduxjs/toolkit";

import boardItemSlice from "./boardSlice";

const store = configureStore({
  reducer: {
    board: boardItemSlice.reducer,
  },
});

export default store;
