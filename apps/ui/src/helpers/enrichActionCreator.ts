import { ActionCreatorWithPayload, createAction } from "@reduxjs/toolkit";
import { ActionCreatorWithPreparedPayload } from "@reduxjs/toolkit/src/createAction";

export type EnrichedActionCreator<
  P,
  T extends string,
  M
> = ActionCreatorWithPreparedPayload<[payload: P, meta: M], P, T, never, M>;

export function enrichActionCreatorFn<M>(): <P, T extends string>(
  actionCreator: ActionCreatorWithPayload<P, T>
) => EnrichedActionCreator<P, T, M> {
  return <P, T extends string>(
    actionCreator: ActionCreatorWithPayload<P, T>
  ) => {
    return createAction(actionCreator.type, (payload: P, meta: M) => {
      return { payload, meta };
    });
  };
}
