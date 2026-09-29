import { useCanAccess } from "../../hooks/useCanAccess.js";

export function CanAccess({ action, children, resource }) {
  const canAccess = useCanAccess(action, resource);

  return canAccess ? children : null;
}
