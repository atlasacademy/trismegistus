import {
  ApiConnector,
  Info,
  MysticCode,
  Region,
  Servant,
} from "@atlasacademy/api-connector";
import { createApi } from "@reduxjs/toolkit/query/react";

import { createPersistReducer } from "@/store/persist";

function createApiConnectorMap() {
  const connectorMap = new Map<Region, ApiConnector>();
  const host = "https://api.atlasacademy.io";
  for (const item in Region) {
    const region = item as Region;
    connectorMap.set(region, new ApiConnector({ host, region }));
  }
  return connectorMap;
}

const apiConnector = createApiConnectorMap();
export const gameDataProvider = (region: Region) => ({
  servant(servantId?: number) {
    return servantId != null
      ? apiConnector.get(region)!.servant(servantId, false)
      : Promise.resolve(undefined);
  },
  servantList() {
    return apiConnector.get(region)!.servantList();
  },
  mysticCode(mysticCodeId?: number) {
    return mysticCodeId != null
      ? apiConnector.get(region)!.mysticCode(mysticCodeId)
      : Promise.resolve(undefined);
  },
  mysticCodeList() {
    return apiConnector.get(region)!.mysticCodeList();
  },
  info() {
    return apiConnector.get(region)!.info();
  },
});

type GameDataProvider = ReturnType<typeof gameDataProvider>;

type GameDataBaseQueryOptions = {
  [K in keyof GameDataProvider]: {
    query: K;
    param: Parameters<GameDataProvider[K]>[0];
    region?: Region;
  };
}[keyof GameDataProvider];

const gameProviderApi = createApi({
  reducerPath: "api",
  baseQuery: async ({
    query,
    param,
    region = Region.NA,
  }: GameDataBaseQueryOptions) => {
    try {
      const result = await gameDataProvider(region)[query](param as any);
      return { data: result };
    } catch (apiError) {
      return { error: apiError };
    }
  },
  tagTypes: ["Data"],
  endpoints: (build) => ({
    servant: build.query<Servant.Servant, number | undefined>({
      query: (id) => ({ query: "servant", param: id }),
      providesTags: ["Data"],
    }),
    servantList: build.query<Servant.ServantBasic[], void>({
      query: () => ({ query: "servantList", param: undefined }),
      providesTags: ["Data"],
    }),
    mysticCode: build.query<MysticCode.MysticCode, number | undefined>({
      query: (id: number) => ({ query: "mysticCode", param: id }),
      providesTags: ["Data"],
    }),
    mysticCodeList: build.query<MysticCode.MysticCodeBasic[], void>({
      query: () => ({ query: "mysticCodeList", param: undefined }),
      providesTags: ["Data"],
    }),
    checkRegionInfo: build.query<Info.Info, void>({
      query: () => ({ query: "info", param: undefined }),
    }),
  }),
});

export const apiReducer = createPersistReducer("api", gameProviderApi.reducer);

export const {
  reducerPath: apiReducerPath,
  middleware: apiMiddleware,
  useLazyServantQuery,
  useServantQuery,
  useLazyServantListQuery,
  useServantListQuery,
  useLazyMysticCodeQuery,
  useMysticCodeQuery,
  useLazyMysticCodeListQuery,
  useMysticCodeListQuery,
  useCheckRegionInfoQuery,
} = gameProviderApi;
