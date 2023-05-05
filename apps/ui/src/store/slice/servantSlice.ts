import { createSlotsSlice } from "@/store/slice/slotSlice";
import { InputServant } from "@/types/userServant";

export const {
  reducer: servantReducer,
  actions: servantActions,
  getInitialState: getServantsInitialState,
} = createSlotsSlice("servant", (): InputServant[] => []);
