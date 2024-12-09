import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { userAtom } from "../utils/store";

export const useValidateUser = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    const validateUser = () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      const isTokenExpired = (expiryDate: string): boolean => {
        const currentTime = new Date().toISOString();
        return currentTime > expiryDate;
      };

      if (!user?.token || isTokenExpired(user?.expiration)) {
        setUser(undefined);
      }
      setIsLoading(false);
    };

    validateUser();
  }, [setUser, user]);

  return { isLoading };
};
