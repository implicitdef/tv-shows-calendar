import React, { ReactNode } from "react";
import { TopBar } from "./meta/TopBar";
import GlobalErrorBanner from "./meta/GlobalErrorBanner";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="page container-fluid">
      <GlobalErrorBanner hasError={false} />
      <TopBar {...{ loggedInStatus: "loggedOut", email: null }} />
      {children}
    </div>
  );
}
