import { configureStore } from "@reduxjs/toolkit";

import buyerReducer from "../src/redux/buyersReducer";

export const store = configureStore({
  reducer: {
    buyer: buyerReducer,
  },
});
