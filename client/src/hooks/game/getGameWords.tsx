import { useEffect, useState } from "react";

const fakeApi = async () => "these are just test words, honestly... It should just - take whatever right?";

export const getGameWords = () => {
  const [words, setWords] = useState<string[] | null>(null);
  const [chars, setChars] = useState<string[] | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const payload = await fakeApi();
      setChars(Array.from(payload));
      setWords(payload.split(" "));
    };
    console.log("fetching...");
    fetch();
  }, []);

  return { words, chars };
};
