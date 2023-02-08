import {
  ApiConnector,
  CraftEssence,
  Info,
  MysticCode,
  Servant,
} from "@atlasacademy/api-connector";
import { createSelector } from "@reduxjs/toolkit";
import { BaseQueryFn, createApi } from "@reduxjs/toolkit/query/react";
import { REHYDRATE } from "redux-persist/es/constants";

import type { TrismegistusState } from "@/store";
import { createPersistReducer } from "@/store/persist";
import { selectRegion } from "@/store/slice/userSlice";

const host = "https://api.atlasacademy.io";
const selectConnector = createSelector(
  [selectRegion],
  (region) => new ApiConnector({ host, region }),
  { memoizeOptions: { maxSize: 15 } }
);

const ONE_WEEK = 604800;

function gameDataBaseQuery(): BaseQueryFn<{
  (apiConnector: ApiConnector): Promise<any>;
}> {
  return async (connectorFn, { getState }) => {
    try {
      const state = getState() as TrismegistusState;
      const connector = selectConnector(state);
      const result = await connectorFn(connector);
      return { data: result };
    } catch (apiError) {
      return { error: apiError };
    }
  };
}

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: gameDataBaseQuery(),
  extractRehydrationInfo(action) {
    if (action.type === REHYDRATE) {
      return action?.payload;
    }
  },
  tagTypes: ["Data"],
  keepUnusedDataFor: ONE_WEEK,
  endpoints: (build) => ({
    servant: build.query<Servant.Servant, number | undefined>({
      query: (servantId) => (connector) => {
        return servantId
          ? connector.servant(servantId, false)
          : Promise.resolve();
      },
      providesTags: ["Data"],
    }),
    servantList: build.query<Servant.ServantBasic[], void>({
      query: () => (connector) => connector.servantList(),
      providesTags: ["Data"],
    }),
    mysticCode: build.query<MysticCode.MysticCode, number | undefined>({
      query: (mysticCodeId) => (connector) => {
        return mysticCodeId
          ? connector.mysticCode(mysticCodeId)
          : Promise.resolve();
      },
      providesTags: ["Data"],
    }),
    mysticCodeList: build.query<MysticCode.MysticCodeBasic[], void>({
      query: () => (connector) => connector.mysticCodeList(),
      providesTags: ["Data"],
    }),
    craftEssence: build.query<CraftEssence.CraftEssence, number | undefined>({
      query: (craftEssenceId) => (connector) => {
        return craftEssenceId
          ? connector.craftEssence(craftEssenceId, false)
          : Promise.resolve();
      },
    }),
    craftEssenceList: build.query<CraftEssence.CraftEssenceBasic[], void>({
      query: () => (connector) => connector.craftEssenceList(),
      providesTags: ["Data"],
    }),
    checkRegionInfo: build.query<Info.Info, void>({
      query: () => (connector) => connector.info(),
    }),
  }),
});

export const apiReducer = createPersistReducer("api", apiSlice.reducer);

export const {
  reducerPath: apiReducerPath,
  middleware: apiMiddleware,
  endpoints: apiEndpoints,
  useServantQuery,
  useServantListQuery,
  useMysticCodeQuery,
  useMysticCodeListQuery,
  useCraftEssenceQuery,
  useCraftEssenceListQuery,
} = apiSlice;
