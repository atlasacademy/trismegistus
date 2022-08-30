import { Servant } from "@atlasacademy/api-connector";
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";

import { client } from "@/api";

import { MainState } from ".";

const {
  getInitialState,
  addOne: addServant,
  getSelectors,
} = createEntityAdapter<Servant.Servant>({
  selectId: (servant) => servant.id,
});

export const fetchServant = createAsyncThunk(
  "fetchServant",
  async (id: number, { getState }) => {
    const state = getState() as MainState;
    const servant = getServant(state, id);
    if (servant != null) {
      return servant;
    }
    return client.getServant(id);
  }
);

const servantInfoSlice = createSlice({
  name: "servantInfo",
  initialState: getInitialState,
  reducers: {
    addServant,
  },
  extraReducers(builder) {
    builder.addCase(fetchServant.fulfilled, addServant);
  },
});

export const { selectById: getServant } = getSelectors(
  (state: MainState) => state.servant
);
export const { reducer: ServantReducer } = servantInfoSlice;
