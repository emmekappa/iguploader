import React from "react";
import { CredentialsStore } from "./instagram";

export const CredentialsStoreContext = React.createContext<CredentialsStore>(
  new CredentialsStore()
);

export default CredentialsStoreContext;
