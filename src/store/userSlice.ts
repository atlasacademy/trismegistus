import { Region } from "@atlasacademy/api-connector";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { TrismegistusState } from "@/store/index";

export interface UserState {
  region?: Region;
}

export const getInitialState = (): UserState => ({ region: Region.NA });

const userSlice = createSlice({
  name: "user",
  initialState: getInitialState,
  reducers: {
    setRegion(state, { payload }: PayloadAction<Region>) {
      state.region = payload;
    },
  },
});

export function selectRegion(state: TrismegistusState) {
  return state.user.region;
}

export const {
  reducer: userReducer,
  actions: { setRegion },
} = userSlice;
