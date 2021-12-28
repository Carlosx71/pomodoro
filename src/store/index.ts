import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducers from 'store/ducks';

const persistConfig = {
  key: 'root',
  storage,
  // blacklist: ['pomodoro'],
  // whitelist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
  devTools: process.env.NODE_ENV !== 'production',
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export { store, persistor };

// import { createStore } from 'redux';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

// import rootReducers from './modules/rootReducers';

// const persistConfig = {
//   key: 'root',
//   storage,
//   // blacklist: ['pomodoro'],
//   // whitelist: [],
// };

// const persistedReducer = persistReducer(persistConfig, rootReducers);

// const store = createStore(persistedReducer);
// const persistor = persistStore(store);

// export { store, persistor };
