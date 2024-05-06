import { devtools, persist } from "zustand/middleware";
import { withSelector } from "./middleware";
import { MemoType } from "@interface/Memo";
import { YoutubeFrameType } from "@interface/YoutubeFrame";
import { StorageType } from "@interface/Common";
import { TodoListCategoryType, TodoListType, TodoType } from "@interface/Todo";
import toast from "react-hot-toast";
import { itemCreationConfigs } from "@lib/StorageStoreHelper";
import { decryptData, encryptData } from "@lib/cryptoUtil";
import { MainAdSenseType } from "@interface/Ads";
import { createWithEqualityFn } from "zustand/traditional";

type StorageState = {
  storeData: string
};

interface StorageAction {
  changeStoreData: (value: string) => void;
}

const storageState = (): StorageState => ({
  storeData: ''
});

export const useStorageState = createWithEqualityFn(
  persist(devtools<StorageState>(storageState, { name: "storageStore" }), {
    name: "yeosuro-storage",
  }),
);

export const useStorageActions = (): StorageAction => ({
  changeStoreData: (value) => {
    useStorageState.setState((state): StorageState => {
      return {
        ...state,
        storeData: value
      };
    });
  },
});

export const useStorageStore = withSelector(useStorageState);
