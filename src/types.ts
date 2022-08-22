import { Skill } from "@atlasacademy/api-connector/dist/Schema/Skill";

export interface ServantInfo {
  name: string;
  portraitUrl: string;
  skills: Skill[];
}

export interface MysticCode {
  name: string;
  portraitUrl: string;
  skills: Skill[];
}

export type Party = [number?, number?, number?, number?, number?, number?];

export type PartySlot = 0 | 1 | 2 | 3 | 4 | 5;
