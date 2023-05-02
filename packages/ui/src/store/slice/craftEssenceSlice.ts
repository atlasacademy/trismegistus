import {
  createSlotsSelectors,
  createSlotsSlice,
} from "@/store/slice/slotSlice";
import { InputCraftEssence } from "@/types/userCraftEssence";

export const {
  reducer: craftEssenceReducer,
  actions: craftEssenceActions,
  getInitialState: getCraftEssencesInitialState,
} = createSlotsSlice("craftEssence", (): InputCraftEssence[] => []);

export const {
  createBySlotSelector: createUserCraftEssenceBySlotSelector,
  createSlotsSelector: createUserCraftEssenceSlotsSelector,
} = createSlotsSelectors((): InputCraftEssence => ({}));
