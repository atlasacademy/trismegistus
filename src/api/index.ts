import {
  ApiConnector,
  MysticCode,
  Region,
  Servant,
} from "@atlasacademy/api-connector";
import { createApi } from "@reduxjs/toolkit/query/react";

const cacheDuration = -1;

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
  servant(id?: number) {
    return id != null
      ? apiConnector.get(region)!.servant(id, false, cacheDuration)
      : Promise.resolve(undefined);
  },
  servantList() {
    return apiConnector.get(region)!.servantList(cacheDuration);
  },
  mysticCode(id?: number) {
    return id != null
      ? apiConnector.get(region)!.mysticCode(id, cacheDuration)
      : Promise.resolve(undefined);
  },
  mysticCodeList() {
    return apiConnector.get(region)!.mysticCodeList(cacheDuration);
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

export const gameProviderApi = createApi({
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
  endpoints(build) {
    return {
      servant: build.query<Servant.Servant, number | undefined>({
        query: (id) => ({ query: "servant", param: id }),
      }),
      servantList: build.query<Servant.ServantBasic[], void>({
        query: () => ({ query: "servantList", param: undefined }),
      }),
      mysticCode: build.query<MysticCode.MysticCode, number | undefined>({
        query: (id: number) => ({ query: "mysticCode", param: id }),
      }),
      mysticCodeList: build.query<MysticCode.MysticCodeBasic[], void>({
        query: () => ({ query: "mysticCodeList", param: undefined }),
      }),
    };
  },
});

export const {
  useLazyServantQuery,
  useServantQuery,
  useLazyServantListQuery,
  useServantListQuery,
  useLazyMysticCodeQuery,
  useMysticCodeQuery,
  useLazyMysticCodeListQuery,
  useMysticCodeListQuery,
} = gameProviderApi;
