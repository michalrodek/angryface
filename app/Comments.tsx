"use client";

import { useEffect, useRef, useState } from "react";
import { EmoteName, FlattenedComment } from "../types";
import { sortComments } from "../utils";
import Comment from "./Comment";
import Sort from "./Sort";

interface CommentsProps {
  data: FlattenedComment[];
}

const nextComments = 5;

export default function Comments(props: CommentsProps) {
  const [showFirstComments, setShowFirstComments] = useState(1);
  const [data, setData] = useState(props.data);
  const sortBy = useRef<EmoteName>("angry");
  let commentCounter = -1;

  function handleShowNextComments() {
    setShowFirstComments(showFirstComments + nextComments);
  }

  function handleSortComments(emote: EmoteName) {
    sortBy.current = emote;
    setData(sortComments(props.data, sortBy.current));
  }

  useEffect(() => {
    const first = parseInt(window.location.search.split("=")[1]);
    setShowFirstComments(first ? first : 1);
  }, []);

  useEffect(() => {
    if (showFirstComments > 1) {
      const url = new URL(location.href);
      url.searchParams.set("first", showFirstComments.toString());
      window.history.replaceState(null, "", url.href);
    }

    if (showFirstComments > 10) {
      const focus =
        document.querySelectorAll("article")[showFirstComments - nextComments];
      window.scrollTo({ top: focus.offsetTop - 100 });
      focus.classList.add("accent");
    }
  }, [showFirstComments]);

  function renderComments() {
    return data.map((comment, i) => {
      if (i >= showFirstComments) return;
      if (i % nextComments === 1) commentCounter = 0;

      commentCounter += 1;

      return (
        <Comment
          key={comment.id}
          comment={comment}
          showFirst={showFirstComments}
          index={commentCounter}
        />
      );
    });
  }

  return (
    <>
      <Sort onClick={handleSortComments} sortBy={sortBy.current} />
      <div className="flex flex-col gap-8 py-20">
        {renderComments()}
        <button
          className="m-auto p-3 cursor-pointer rounded-lg border-none"
          onClick={handleShowNextComments}
        >
          Zobrazit další
        </button>
      </div>
    </>
  );
}
