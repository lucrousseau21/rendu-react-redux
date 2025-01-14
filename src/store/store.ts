import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import productSlice from "./productSlice";

// Configuration du store Redux
export const store = configureStore({
  reducer: {
    cartSlice,
    productSlice,
  },
  // Ajout des middleware par défaut (utile pour des middlewares additionnels)
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

// Types pour le typage de l'état global et des dispatchs
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;