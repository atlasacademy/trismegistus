export interface ServantInfo {
  name: string;
  portraitUrl: string;
  skills: [Skill, Skill, Skill];
}

export interface Servant {
  info: ServantInfo;
  level: number;
  attack: number;
  attackFou: number;
  noblePhantasmLevel: number;
}

export interface Skill {
  name: string;
}
