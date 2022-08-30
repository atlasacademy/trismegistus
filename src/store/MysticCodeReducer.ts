import { MysticCode } from "@atlasacademy/api-connector";
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";

import { client } from "@/api";

import { MainState } from ".";

const {
  getInitialState,
  addOne: addMysticCode,
  getSelectors,
} = createEntityAdapter<MysticCode.MysticCode>({
  selectId: (mysticCode) => mysticCode.id,
});

export const fetchMysticCode = createAsyncThunk(
  "fetchMysticCode",
  async (id: number, { getState }) => {
    const state = getState() as MainState;
    const mysticCode = getMysticCode(state, id);
    if (mysticCode != null) {
      return mysticCode;
    }
    return client.getMysticCode(id);
  }
);

const mysticCodeSlice = createSlice({
  name: "mysticCode",
  initialState: getInitialState,
  reducers: { addMysticCode },
  extraReducers(builder) {
    builder.addCase(fetchMysticCode.fulfilled, addMysticCode);
  },
});

export const { selectById: getMysticCode } = getSelectors(
  (state: MainState) => state.mysticCode
);

export const { reducer: MysticCodeReducer } = mysticCodeSlice;
