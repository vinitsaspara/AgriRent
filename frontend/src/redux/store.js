// redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice.js";
import equipmentSlice from "./slices/equipmentSlice.js";
import assignmentSlice from "./slices/assignmentSlice.js"
import paymentSlice from "./slices/paymentSlice.js"
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // uses localStorage
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";

// Create separate persist configs for each slice
const userPersistConfig = {
  key: 'user', // key for user data in localStorage
  storage,
};

const equipmentPersistConfig = {
  key: 'equipment', // key for equipment data in localStorage
  storage,
};
const assignmentPersistConfig = {
  key: 'assignment', // key for equipment data in localStorage
  storage,
};
const paymentPersistConfig = {
  key: 'payment', // key for equipment data in localStorage
  storage,
};

// Wrap each reducer with its own persistReducer
const userPersistedReducer = persistReducer(userPersistConfig, userSlice);
const equipmentPersistedReducer = persistReducer(equipmentPersistConfig, equipmentSlice);
const assignmentPersistedReducer = persistReducer(assignmentPersistConfig, assignmentSlice);
const paymentPersistedReducer = persistReducer(paymentPersistConfig, paymentSlice);

const store = configureStore({
  reducer: {
    user: userPersistedReducer,
    equipment: equipmentPersistedReducer,
    assignment: assignmentPersistedReducer,
    payment: paymentPersistedReducer
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