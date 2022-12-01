import { Region } from "@atlasacademy/api-connector";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { TrismegistusState } from "@/store";
import { UserServantDefaults } from "@/types";

export interface UserState {
  region: Region;
  servantDefaults: UserServantDefaults;
}

export const getInitialState = (): UserState => ({
  region: Region.NA,
  servantDefaults: {
    fou: 1000,
    noblePhantasmLevel: 1,
    skills: [10, 10, 10],
    appends: [0, 0, 0],
  },
});

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

export function selectServantDefaults(state: TrismegistusState) {
  return state.user.servantDefaults;
}

export const {
  reducer: userReducer,
  actions: { setRegion },
} = userSlice;
