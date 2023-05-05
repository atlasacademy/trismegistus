export function composeSelectors<G, GParam, T, TParams extends any[], R>(
  globalSelector: (state: G, param: GParam) => T,
  selector: (state: T, ...params: TParams) => R
) {
  return (state: G, param: GParam, ...params: TParams) => {
    const local = globalSelector(state, param);
    return selector(local, ...params);
  };
}
