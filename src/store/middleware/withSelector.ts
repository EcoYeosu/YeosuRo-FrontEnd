import { shallow } from "zustand/shallow";
import { type UseBoundStore, type StoreApi } from "zustand";
import { useCallback } from "react";
import { useStoreWithEqualityFn } from "zustand/traditional";

export const withSelector = <StateType extends object>(
  store: UseBoundStore<StoreApi<StateType>>,
) => {
  return function <K extends keyof StateType>(keys: K[]) {
    const selectors = useCallback(
      (state: StateType) => {
        const obj = {} as any;
        keys.forEach((key) => {
          obj[key] = state[key];
        });
        return obj as Pick<StateType, K>;
      },
      [keys],
    );

    return useStoreWithEqualityFn(store, selectors, shallow);
  };
};
