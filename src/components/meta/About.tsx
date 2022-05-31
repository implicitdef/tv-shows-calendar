import * as React from "react";

export default function About({ isDisplayed }: { isDisplayed: boolean }) {
  // TODO make it closeable
  const onClose = () => {};
  return isDisplayed ? (
    <div className="about">
      <p>
        This calendar helps you keep track of when your favorites TV shows are
        aired, season by season.
      </p>
      <p>Useful if you like to wait the end of a season to watch it.</p>
      <p>
        By default only a tiny subset of shows are shown. If you sign in, you
        will be able to add/remove shows from the calendar.
      </p>
      <button onClick={onClose} className="about__close">
        &times;
      </button>
    </div>
  ) : null;
}
