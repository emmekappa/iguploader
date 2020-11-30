import React from "react";
import { InstagramIpcInvoker } from "./instagramIpcInvoker";

export const InstagramIpcInvokerContext = React.createContext<InstagramIpcInvoker>(
  new InstagramIpcInvoker()
);

export default InstagramIpcInvokerContext;
