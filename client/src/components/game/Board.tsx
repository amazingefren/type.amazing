import React, { useState } from "react";
import { getGameWords } from "hooks";
import { m, AnimateSharedLayout } from "framer-motion";

type EntityType = {
  char: string;
  correct: boolean | "normal";
  modal: string | null;
  active: boolean;
};

const spring = {
  type: "spring",
  stiffness: 500,
  damping: 30,
};

const BoardEntity: React.FC<EntityType> = ({
  char,
  correct,
  modal,
  active,
}) => {
  const color =
    correct === "normal"
      ? "var(--syntax-normal)"
      : correct
      ? "var(--syntax-good)"
      : "var(--syntax-bad)";
  return (
    <li
      style={{ color }}
      className="game__board-entity"
      unselectable="on"
      onSelect={(_) => false}
      onMouseDown={(_) => false}
    >
      {active && (
        <m.div
          layoutId="hi"
          className="game__board-entity-cursor"
          initial={false}
          transition={{ spring }}
        >
          {" "}
        </m.div>
      )}
      {char}
      {!correct && (
        <div style={{ position: "absolute", top: "-100%", left: 0 }}>
          {modal}
        </div>
      )}
    </li>
  );
};

const Board: React.FC<{}> = () => {
  const { chars } = getGameWords();
  const [input, setInput] = useState<string[]>([]);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const setInputFocus = () => {
    if (inputRef && inputRef.current) inputRef.current.focus();
  };

  const handleInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (chars) {
      const payload = Array.from(e.target.value.split(""));
      if (payload.length >= chars?.length) {
        if (payload.at(-1) === chars.at(-1) || payload.length > chars.length) {
          console.log("completed");
          return setInput(Array.from(""));
        }
      }
      setInput(Array.from(e.target.value.split("")));
    }
  };

  return (
    <div onClick={setInputFocus} className="game__board">
      {chars ? (
        <>
          <input
            className="game__board-input"
            autoComplete="false"
            type="text"
            autoCapitalize="false"
            ref={inputRef}
            style={{ position: "absolute", opacity: 0 }}
            value={input.join("")}
            onChange={handleInput}
          />
          <AnimateSharedLayout>
            <ul style={{ display: "inline" }}>
              {chars.map((char, i) => (
                <BoardEntity
                  char={char}
                  key={char + i}
                  correct={input.length > i ? input[i] === char : "normal"}
                  active={input.length === i}
                  modal={input[i]}
                />
              ))}
            </ul>
          </AnimateSharedLayout>
        </>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};

export default Board;
