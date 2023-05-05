import { Reducer } from "redux";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";

/**
 * This function is used as a hack to get the store type working.
 * For some reason, applying {@link persistReducer} on an api
 * reducer will make its type resolve to `never`, thus making it
 * inaccessible from the store type.
 *
 * @param key the key that will be used by the storage implementation.
 * @param reducer the reducer to be persisted.
 */
export function createPersistReducer<R extends Reducer<any, any>>(
  key: string,
  reducer: R
): R {
  return persistReducer({ key, storage }, reducer) as R;
}
