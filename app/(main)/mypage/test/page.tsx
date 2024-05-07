"use client";
import React from "react";
import { Api } from "./post";

function Test() {
  const { mutate } = Api();
  return (
    <button
      onClick={() =>
        mutate({
          workIdx: 1,
        })
      }
    >
      작업하기
    </button>
  );
}

export default Test;
