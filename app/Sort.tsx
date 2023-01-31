"use client";

import { EmoteName } from "../types";

interface SortProps {
  sortBy: EmoteName;
  onClick: (sortBy: EmoteName) => void;
}

export default function Sort(props: SortProps) {
  return (
    <div className="flex relative gap-4 bg-slate-900 px-6 py-4 m-auto w-min rounded-md">
      <span className="whitespace-nowrap text-slate-100">Seřadit podle:</span>
      {reactions.map((reaction) => (
        <button
          key={reaction.name}
          className="cursor-pointer"
          onClick={() => props.onClick(reaction.name)}
        >
          {reaction.emoji}
        </button>
      ))}
    </div>
  );
}

const reactions: Reaction[] = [
  { name: "angry", emoji: "😡" },
  { name: "cry", emoji: "😭" },
  { name: "heart", emoji: "❤️" },
  { name: "laugh", emoji: "😂" },
  { name: "shock", emoji: "😲" },
];

interface Reaction {
  name: EmoteName;
  emoji: string;
}
