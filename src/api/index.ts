import {
  ApiConnector,
  Language,
  MysticCode,
  Region,
  Servant,
} from "@atlasacademy/api-connector";

export interface GameDataProvider {
  getServant(id: number): Promise<Servant.Servant>;
  getServantList(): Promise<Servant.ServantBasic[]>;
  getMysticCode(id: number): Promise<MysticCode.MysticCode>;
  getMysticCodes(): Promise<MysticCode.MysticCodeBasic[]>;
}

const cacheDuration = 300 * 1000;
const apiConnector = new ApiConnector({
  host: "https://api.atlasacademy.io",
  region: Region.NA,
  language: Language.DEFAULT,
});

export const client: GameDataProvider = {
  getServant(id) {
    return apiConnector.servant(id, false, cacheDuration);
  },
  getServantList() {
    return apiConnector.servantList(cacheDuration);
  },
  getMysticCode(id) {
    return apiConnector.mysticCode(id, cacheDuration);
  },
  getMysticCodes() {
    return apiConnector.mysticCodeList(cacheDuration);
  },
};
