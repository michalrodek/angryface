"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { CopyImg } from "../assets";
import { FlattenedComment } from "../types";

interface CommentProps {
  comment: FlattenedComment;
  showFirst: number;
  index: number;
}

export default function Comment(props: CommentProps) {
  const [showToast, setShowToast] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(
      `${props.comment.content}\n${props.comment.angry} 😡   ${props.comment.heart} ❤️   ${props.comment.laugh} 😂   ${props.comment.shock} 😲   ${props.comment.cry} 😭`
    );

    setShowToast(true);

    if (showToast) return;

    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  }

  return (
    <article
      id={props.comment.id}
      style={{ animationDelay: (props.index - 1) / 5 + "s" }}
      className="show flex gap-4 px-8 py-8 rounded-lg bg-slate-900"
    >
      <div className="flex flex-col gap-4">
        <div className="flex gap-4 items-center">
          <img
            className="rounded-full h-10 w-10"
            src={props.comment.profilImage}
          />
          <a
            href={props.comment.profilLink}
            target="_blank"
            className="text-xl text-slate-100"
          >
            {props.comment.profilName}
          </a>
        </div>
        <p className="whitespace-pre-wrap text-slate-400">
          {props.comment.content ? props.comment.content : ""}
        </p>
        <div className="flex gap-4 text-slate-100">
          {renderReaction(props.comment.angry, "😡")}
          {renderReaction(props.comment.heart, "❤️")}
          {renderReaction(props.comment.laugh, "😂")}
          {renderReaction(props.comment.shock, "😲")}
          {renderReaction(props.comment.cry, "😭")}
        </div>
        <p>
          <a
            href={`https://${props.comment.url}`}
            className="text-slate-500 underline"
            target="_blank"
          >
            {props.comment.title}
          </a>
        </p>
      </div>
      <div className="flex flex-col flex-shrink-0 justify-between ml-auto">
        <button onClick={handleCopy}>
          <CopyImg />
        </button>
        <img
          src={
            props.comment.url.includes("seznamzpravy")
              ? "https://d39-a.sdn.cz/d_39/c_static_gT_F/ioiCY/seznam-zpravy-icon.svg"
              : "https://d39-a.sdn.cz/d_39/c_static_gQ_L/q98Du/novinky-logos/novinky-icon.svg"
          }
          className="rounded-full w-5 h-5"
        ></img>
      </div>
      {false &&
        createPortal(
          <div className="show fixed bottom-28 right-28 p-4 bg-slate-700 rounded-md">
            Text zkopírován
          </div>,
          document.querySelector("main")!
        )}
    </article>
  );
}

function renderReaction(count: number | undefined, emoji: string) {
  if (count === 0 || count == null) return;

  return (
    <span>
      {emoji} {count}
    </span>
  );
}
