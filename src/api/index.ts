import {
  ApiConnector,
  Language,
  Region,
  Servant,
} from "@atlasacademy/api-connector";

export interface GameDataProvider {
  getServant(id: number): Promise<Servant.Servant>;
  getServantList(): Promise<Servant.ServantBasic[]>;
}

const cacheDuration = 300 * 1000;
const apiConnector = new ApiConnector({
  host: "https://api.atlasacademy.io",
  region: Region.NA,
  language: Language.DEFAULT,
});

export const client: GameDataProvider = {
  getServant(id: number) {
    return apiConnector.servant(id, false, cacheDuration);
  },
  getServantList() {
    return apiConnector.servantList(cacheDuration);
  },
};
