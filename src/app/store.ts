import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import modalReducer from "../features/modal/modalSlice";
import planetReducer from "../features/planet/planetSlice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    planet: planetReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // when storing functions in the store state we need this:
      serializableCheck: {
        // Ignore these action types and paths in the state
        ignoredActions: ["modal/configureModal"],
        ignoredPaths: [
          "modal.modalConfig.handleCloseEvent",
          "modal.modalConfig.handleConfirmEvent",
        ],
      },
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
