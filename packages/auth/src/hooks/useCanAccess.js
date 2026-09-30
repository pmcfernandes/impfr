import { useAuth } from "../providers/index.js";

export function useCanAccess(action, resource) {
  const { user } = useAuth();

  return user?.permissions?.includes(`${resource}.${action}`) ?? false;
}
