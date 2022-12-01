import { UnaryFunction } from "ts-functional-pipe";

export function coalesce<A, R>(
  func: UnaryFunction<A, R>,
  fallback: R
): UnaryFunction<A | undefined, R> {
  return (arg: A | undefined) => (arg != null ? func(arg) : fallback);
}
export function mayBeNull<A, R>(
  func: UnaryFunction<A, R>
): UnaryFunction<A | undefined, R | undefined> {
  return (arg: A | undefined) => (arg != null ? func(arg) : undefined);
}
