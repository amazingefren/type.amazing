import React, { useState } from "react";
import { getGameWords } from "hooks";

type EntityType = {
  char: string;
  correct: boolean | "normal";
  modal: string | null;
  active: boolean;
  filler?: boolean | null;
};

const BoardEntity: React.FC<EntityType> = ({
  char,
  correct,
  modal,
  active,
  filler,
}) => {
  const color =
    correct === "normal"
      ? "var(--syntax-normal)"
      : correct
      ? "var(--syntax-good)"
      : "var(--syntax-bad)";

  const eClass = active
    ? "game__board-word-entity game__board-word-entity-active"
    : filler
    ? "game__board-word-entity game__board-word-entity-active-block"
    : "game__board-word-entity";

  return (
    <span
      style={{ color }}
      className={char == " " ? eClass : eClass}
      unselectable="on"
      onSelect={(_) => false}
      onMouseDown={(_) => false}
    >
      {char}
      {!correct && (
        <div style={{ position: "absolute", top: "-100%", left: 0 }}>
          {modal}
        </div>
      )}
    </span>
  );
};

const Board: React.FC<{}> = () => {
  const { chars, words } = getGameWords();
  const [input, setInput] = useState<string[][]>([[]]);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const setInputFocus = () => {
    if (inputRef && inputRef.current) inputRef.current.focus();
  };

  const handleInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (words) {
      // Split Input into Words
      const inputWord = Array.from(e.target.value.split(" "));
      const currentIndex = inputWord.length - 1;

      // Checks
      if (
        // Check Space
        (e.target.value.at(-1) === " " &&
          // No early space
          inputWord[currentIndex - 1].length !==
            words[currentIndex - 1].length) ||
        // No Extra Word
        inputWord.length > words.length ||
        // No more than 1 letter longer
        inputWord[currentIndex].length > words[currentIndex].length + 1 ||
        // No delete completed word
        inputWord.length < input.length
      ) {
        return;
      } else if (
        // Check Completed
        inputWord.length === words.length &&
        (inputWord[currentIndex].at(-1) === words[currentIndex].at(-1) ||
          inputWord[currentIndex].length > words[currentIndex].length)
      ) {
        // Reset Field
        return setInput([[]]);
      }

      // Split Words into Characters
      let final: string[][] = [[]];
      inputWord.map((word, i) => (final[i] = Array.from(word)));

      // Set State
      console.debug(final);
      setInput(final);
    }
  };

  return (
    <div onClick={setInputFocus} className="game__board">
      {chars && words ? (
        <>
          <input
            className="game__board-input"
            autoComplete="false"
            type="text"
            autoCapitalize="false"
            ref={inputRef}
            value={input.map((word) => word.join("")).join(" ")}
            onChange={handleInput}
            onPaste={(e) => e.preventDefault()}
            onSelect={(e) => e.preventDefault()}
            onCopy={(e) => e.preventDefault()}
          />
          <div className="game__board-word-container">
            {words.map((word, i) => {
              return (
                <div className="game__board-word" key={word + i}>
                  {Array.from(word).map((char, j) => (
                    <BoardEntity
                      char={char}
                      key={char + i + j}
                      correct={
                        input[i]
                          ? input[i].length > j
                            ? input[i][j] === char
                            : "normal"
                          : "normal"
                      }
                      active={input[i] ? input[i].length === j : false}
                      modal={""}
                    />
                  ))}
                  <BoardEntity
                    char={
                      input.length - 1 === i && input[i].length > word.length
                        ? input[i].at(-1) || " "
                        : " "
                    }
                    correct={false}
                    active={
                      input.length - 1 === i && input[i].length === word.length
                    }
                    modal={""}
                    filler={
                      input.length - 1 === i && input[i].length > word.length
                    }
                  />
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};

export default Board;
