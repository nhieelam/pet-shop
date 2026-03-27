import {useCallback} from "react";
import {useAuth} from "../../../../context/authContext";
import * as customerService from "../../../../services/customerService";
import * as userService from "../../../../services/userService";
import type {UserResponse, UserUpdateRequest} from "../../../../types/userTypes.ts";

export function useProfile() {
  const {customer, setCustomer, loading, logout: authLogout} = useAuth();

  const refetch = useCallback(async () => {
    const customer = await customerService.getInfo();
    setCustomer(customer.data);
    return customer;
  }, [setCustomer]);

  const updateProfile = useCallback(
      async (userId: string, request: UserUpdateRequest): Promise<UserResponse> => {
        const res = await userService.updateUser(userId, request);
        refetch();
        return res;
      },
      [refetch],
  );

  const logout = useCallback(() => {
    authLogout();
  }, [authLogout]);

  return {
    customer,
    loading,
    refetch,
    updateProfile,
    logout,
  };
}
