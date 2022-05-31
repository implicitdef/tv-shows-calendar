import * as React from "react";

export default function GlobalErrorBanner({ hasError }: { hasError: boolean }) {
  return hasError ? (
    <div className="global-error-banner">
      Oops, it looks like something didn't work as it should. Please refresh
      this page to see if things get better.
    </div>
  ) : null;
}
