import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export enum ModalTypes {
  CONFIRM = "CONFIRM",
  NOTIFY = "NOTIFY",
}

export type ModalConfig = {
  handleCloseEvent: () => void;
  handleConfirmEvent: () => void;
  modalType: ModalTypes;
  title: string;
};

export interface ModalState {
  isOpen: boolean;
  modalConfig: ModalConfig;
}

const initialState: ModalState = {
  isOpen: false,
  modalConfig: {
    handleCloseEvent: () => ({}),
    handleConfirmEvent: () => ({}),
    modalType: ModalTypes.CONFIRM,
    title: "Please can I have your attention?",
  },
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    configureModal: (state, action: PayloadAction<ModalConfig>) => {
      state.modalConfig = action.payload;
    },
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const selectModalState = (state: RootState) => state.modal;

export const { configureModal, openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
