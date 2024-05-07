"use client";

import { useEffect, useState } from "react";
import { FindIdForm } from "./find-id";
import { FindPasswordForm } from "./password/main";

export const FindInfoMain = () => {
  const [isFindId, setIsFindId] = useState(true);

  useEffect(() => {
    localStorage.removeItem("enc_data");
  }, [isFindId]);

  return (
    <>
      {isFindId === true && <FindIdForm setIsFindId={setIsFindId} />}
      {isFindId === false && <FindPasswordForm setIsFindId={setIsFindId} />}
    </>
  );
};
