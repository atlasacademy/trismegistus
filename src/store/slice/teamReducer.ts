import {
  combineReducers,
  createReducer,
  nanoid,
  PayloadAction,
} from "@reduxjs/toolkit";
import { z } from "zod";

import { enrichActionCreatorFn } from "@/helpers/enrichActionCreator";
import {
  commandScriptActions,
  commandScriptReducer,
} from "@/store/slice/commandScriptSlice";
import {
  craftEssenceActions,
  craftEssenceReducer,
} from "@/store/slice/craftEssenceSlice";
import {
  mysticCodeActions,
  mysticCodeReducer,
} from "@/store/slice/mysticCodeSlice";
import { servantActions, servantReducer } from "@/store/slice/servantSlice";
import { TeamEntry } from "@/types";
import { InputTeam } from "@/types/userTeam";

export const teamReducer = combineReducers<InputTeam>({
  teamId: createReducer(nanoid, () => {}),
  mysticCode: mysticCodeReducer,
  servants: servantReducer,
  craftEssences: craftEssenceReducer,
  commandScript: commandScriptReducer,
});

const enrich = enrichActionCreatorFn<TeamEntry>();
export const teamActions = {
  updateMysticCode: enrich(mysticCodeActions.updateMysticCode),
  addServant: enrich(servantActions.add),
  setServant: enrich(servantActions.set),
  updateServant: enrich(servantActions.update),
  removeServant: enrich(servantActions.remove),
  addCraftEssence: enrich(craftEssenceActions.add),
  setCraftEssence: enrich(craftEssenceActions.set),
  updateCraftEssence: enrich(craftEssenceActions.update),
  removeCraftEssence: enrich(craftEssenceActions.remove),
  startNewTurn: enrich(commandScriptActions.startNewTurn),
  addBattleCommand: enrich(commandScriptActions.addBattleCommand),
  addCommand: enrich(commandScriptActions.addCommand),
};

export const {
  updateMysticCode,
  addServant,
  setServant,
  updateServant,
  removeServant,
  addCraftEssence,
  setCraftEssence,
  updateCraftEssence,
  removeCraftEssence,
  startNewTurn,
  addBattleCommand,
  addCommand,
} = teamActions;

/**
 * We specify the schema type because if we eventually change
 * {@link TeamEntry} typescript can catch the type error here
 */
const TeamAction: z.ZodType<{ type: string; meta: TeamEntry }> = z.object({
  type: z.enum(["", ...Object.values(teamActions).map(({ type }) => type)]),
  meta: z.object({ teamId: z.string() }),
});
export function teamActionMatcher(
  action: any
): action is PayloadAction<any, string, TeamEntry> {
  const { success } = TeamAction.safeParse(action);
  return success;
}
