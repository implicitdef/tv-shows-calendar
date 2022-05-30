import * as React from "react";
import { Show } from "../../structs";

export default function SearchBox() {
  // TODO get these props from somewhere
  const shows: Show[] = [];
  const input = "";
  const open = false;
  const onInput = (input: string) => {};
  const onSubmit = (show: Show) => {};
  const onOpen = () => {};
  // TODO make it interactive
  return (
    <div className="search-box">
      <input
        type="text"
        className="search-box__input"
        onChange={(e) => onInput(e.target.value)}
        value={input}
        onFocus={onOpen}
        placeholder="Add a TV show"
      />
      <div className="search-box__results">
        <ul className="search-box__results-inner">
          {open &&
            shows.slice(0, 10).map((show) => (
              <li
                key={show.id}
                onClick={() => {
                  onSubmit(show);
                }}
              >
                {show.name}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
