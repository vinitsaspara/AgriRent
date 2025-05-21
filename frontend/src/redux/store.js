// redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice.js";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // uses localStorage
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";

// Create persist config
const persistConfig = {
  key: 'user', // key for localStorage
  storage,
};

// Wrap your reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, userSlice);

const store = configureStore({
  reducer: {
    user: persistedReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
