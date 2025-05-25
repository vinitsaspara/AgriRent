// redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice.js";
import equipmentSlice from "./slices/equipmentSlice.js";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // uses localStorage
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";

// Create persist config
const persistConfig = {
  key: 'user', // key for localStorage
  storage,
};

// Wrap your reducer with persistReducer
const userPersistedReducer = persistReducer(persistConfig, userSlice);

const store = configureStore({
  reducer: {
    user: userPersistedReducer,
    equipment : equipmentSlice
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
