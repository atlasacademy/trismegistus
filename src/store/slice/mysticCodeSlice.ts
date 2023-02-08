import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { InputMysticCode } from "@/types/userMysticCode";

export const {
  reducer: mysticCodeReducer,
  actions: mysticCodeActions,
  getInitialState: getMysticCodeInitialState,
} = createSlice({
  name: "mysticCode",
  initialState: (): InputMysticCode => ({}),
  reducers: {
    updateMysticCode(state, action: PayloadAction<InputMysticCode>) {
      const { payload: mysticCode } = action;
      Object.assign(state, mysticCode);
    },
  },
});
