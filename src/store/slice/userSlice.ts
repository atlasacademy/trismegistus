import { Region } from "@atlasacademy/api-connector";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { TrismegistusState } from "@/store";
import { UserMysticCodeDefaults } from "@/types/userMysticCode";
import { UserServantDefaults } from "@/types/userServant";

export interface UserState {
  region: Region;
  servantDefaults: UserServantDefaults;
  mysticCodeDefaults: UserMysticCodeDefaults;
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
  mysticCodeDefaults: {
    mysticCodeLevel: 10,
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

export function selectMysticCodeDefaults(state: TrismegistusState) {
  return state.user.mysticCodeDefaults;
}

export const {
  reducer: userReducer,
  actions: { setRegion },
} = userSlice;
