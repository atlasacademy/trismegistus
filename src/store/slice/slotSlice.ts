import {
  createSelector,
  createSlice,
  Draft,
  PayloadAction,
} from "@reduxjs/toolkit";

import { Member } from "@/types";
import { MemberSlot, MemberSlotMapping } from "@/types/enums";

export interface MemberEntry<T> extends Member {
  item: T;
}

export function createSlotsSlice<N extends string, T>(
  sliceName: N,
  initialState: () => T[]
) {
  return createSlice({
    name: sliceName,
    initialState,
    reducers: {
      set(state, action: PayloadAction<MemberEntry<T>>) {
        const {
          payload: { slot, item },
        } = action;
        const index = MemberSlotMapping.indexes[slot];
        if (index == null) return;
        state[index] = item as Draft<T>;
      },
      add(state, action: PayloadAction<T>) {
        const { payload: item } = action;
        if (state.length >= 6) return;
        state.push(item as Draft<T>);
      },
      update(state, action: PayloadAction<MemberEntry<T>>) {
        const {
          payload: { slot, item },
        } = action;

        const index = MemberSlotMapping.indexes[slot];
        if (index == null) return;
        const draftItem = state[index];
        if (draftItem == null) return;
        Object.assign(draftItem, item);
      },
      remove(state, action: PayloadAction<MemberSlot>) {
        const { payload: slot } = action;
        const index = MemberSlotMapping.indexes[slot];
        if (index == null) return;
        state.splice(index, 1);
      },
    },
  });
}

export function createSlotsSelectors<T>(factory: () => T) {
  return {
    createBySlotSelector(): (state: T[], slot: MemberSlot) => T {
      return (state, slot) => {
        const index = MemberSlotMapping.indexes[slot];
        if (index == null) return factory();
        return state[index] ?? factory();
      };
    },
    createSlotsSelector(): (state: T[]) => MemberSlot[] {
      return createSelector([(state: T[]) => state.length], (amount) => {
        const result: MemberSlot[] = [];
        for (let index = 0; index < Math.min(amount, 6); index++) {
          const slot = MemberSlotMapping.options[index];
          if (slot == null) continue;
          result.push(slot);
        }
        return result;
      });
    },
  };
}
