import { useEffect, useState } from "react";
import { useStorageState } from "@/store/useStorageStore";

export const useHydration = () => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Note: This is just in case you want to take into account manual rehydration.
    // You can remove the following line if you don't need it.
    const unsubHydrate = useStorageState.persist.onHydrate(() =>
      setIsHydrated(false),
    );

    const unsubFinishHydration = useStorageState.persist.onFinishHydration(() =>
      setIsHydrated(true),
    );

    setIsHydrated(useStorageState.persist.hasHydrated());

    return () => {
      unsubHydrate();
      unsubFinishHydration();
    };
  }, []);

  return { isHydrated };
};
