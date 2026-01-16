import { AuthContextType } from "@/state/use-Auth";

import "./index.css";

export { default as manifest } from "./manifest";
export { default as routes } from "./routes";

declare global {
  interface Window {
    CARE_API_URL: string;
    AuthUserContext: React.Context<AuthContextType>;
    __CORE_ENV__: {
      decimal: {
        internalPrecision: number;
        accountingPrecision: number;
      };
    };
  }
}

export const CARE_API_URL = window.CARE_API_URL;
