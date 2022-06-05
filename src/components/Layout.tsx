import React, { ReactNode, useEffect } from "react";
import { TopBar } from "./meta/TopBar";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="page container-fluid">
      <TopBar />
      {children}
    </div>
  );
}
