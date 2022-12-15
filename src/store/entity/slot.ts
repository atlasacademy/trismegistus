import { isDraft } from "immer";

import { TrismegistusState } from "@/store";
import { selectTeamById } from "@/store/slice/teamSlice";
import { MemberSlot, UserTeam } from "@/types";
import { indexToSlot, slotToIndex } from "@/types/utils";

export function setItem<T>(draft: T[], slot: MemberSlot, item: T) {
  if (!isDraft(draft)) return;
  const index = slotToIndex(slot);
  if (index == null) return;
  draft[index] = item;
}

export function addItem<T>(draft: T[], item: T) {
  if (!isDraft(draft)) return;
  if (draft.length >= 6) return;
  draft.push(item);
}

export function updateItem<T, K extends keyof T>(
  draft: T[],
  slot: MemberSlot,
  [key, value]: [K, T[K]]
) {
  if (!isDraft(draft)) return;
  const index = slotToIndex(slot);
  if (index == null) return;
  const draftItem = draft[index];
  if (draftItem == null) return;
  draft[index][key] = value;
}

export function removeItem<T>(draft: T[], slot: MemberSlot) {
  if (!isDraft(draft)) return;
  const index = slotToIndex(slot);
  if (index == null) return;
  draft.splice(index, 1);
}

export function createSlotListSelectors<T>(
  listSelector: (team: UserTeam) => T[],
  factory: () => T
) {
  return {
    selectBySlot(
      teamId: number,
      slot: MemberSlot
    ): (state: TrismegistusState) => T {
      return (state: TrismegistusState) => {
        const team = selectTeamById(state, teamId);
        if (team == null) return factory();
        const index = slotToIndex(slot);
        if (index == null) return factory();
        return listSelector(team)[index] ?? factory();
      };
    },
    selectSlots(teamId: number): (state: TrismegistusState) => MemberSlot[] {
      return (state: TrismegistusState) => {
        const team = selectTeamById(state, teamId);
        if (team == null) return [];
        const items = listSelector(team);
        const result: MemberSlot[] = [];
        for (let i = 0; i < Math.min(items.length, 6); i++) {
          const slot = indexToSlot(i);
          if (slot == null) continue;
          result.push(slot);
        }
        return result;
      };
    },
  };
}
