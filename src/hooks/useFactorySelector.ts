import { useMemo } from "react";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export function useFactorySelector<
  Deps extends unknown[],
  State,
  Result,
  Params extends unknown[]
>(
  factory: (...args: Deps) => (state: State, ...params: Params) => Result,
  deps: Deps,
  ...params: Params
): Result {
  const useTypedSelector: TypedUseSelectorHook<State> = useSelector;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const selector = useMemo(() => factory(...deps), [factory, ...deps]);
  return useTypedSelector((state) => selector(state, ...params));
}
