export interface BattleAction<T extends string> {
  type: T;
  slot: PartySlot;
}

export interface SkillBattleAction extends BattleAction<"skill"> {
  skillNum: number;
}

export interface NPBattleAction extends BattleAction<"np"> {}

export type Party = {
  servants: [number?, number?, number?, number?, number?, number?];
  mysticCode?: number;
  actions?: BattleAction<string>[];
};

export type PartySlot = 0 | 1 | 2 | 3 | 4 | 5;
