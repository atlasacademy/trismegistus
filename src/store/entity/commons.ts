import { EntityId, EntityState } from "@reduxjs/toolkit";

export function selectById<T>(
  state: EntityState<T>,
  id: EntityId
): T | undefined {
  return state.entities[id];
}

export function selectIds<T>(state: EntityState<T>): EntityId[] {
  return state.ids;
}

export function selectAll<T>(state: EntityState<T>): T[] {
  return state.ids.map((id) => state.entities[id] as T);
}

export function selectTotal<T>(state: EntityState<T>): number {
  return state.ids.length;
}
