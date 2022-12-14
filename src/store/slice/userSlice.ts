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
    skill1: 10,
    skill2: 10,
    skill3: 10,
    append1: 0,
    append2: 0,
    append3: 0,
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
