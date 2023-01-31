import {
  Query,
  FlattenedComment,
  Emotes,
  ReactionCount,
  EmoteName,
} from "./types";

export function flattenComments(data: Query) {
  const flattenedComments: FlattenedComment[] = [];

  data.data.discussions.edges.map((discussion) =>
    discussion.node.comments.edges.map((comment) => {
      flattenedComments.push({
        id: comment.node.id,
        content: comment.node.content,
        url: discussion.node.canonicalString,
        title: discussion.node.title,
        profilName: comment.node.user.profilName,
        profilLink: comment.node.user.profilLink,
        profilImage: comment.node.user.profilImage,
        ...getReactions(comment.node.reactionsCount),
      });
    })
  );

  return flattenedComments;
}

function getReactions(reactions: ReactionCount[]) {
  const emotes: Emotes = { angry: 0, cry: 0, heart: 0, laugh: 0, shock: 0 };

  reactions.forEach((reaction) => {
    emotes[reaction.reactionType.name] = reaction.count;
  });

  return emotes;
}

export function sortComments(
  flattenedComments: FlattenedComment[],
  sortBy: EmoteName
) {
  const newFlattenedComments = flattenedComments.map((comment) => comment);

  const sortedComments = newFlattenedComments.sort((a, b) => {
    if (a[sortBy] == null) a[sortBy] = 0;
    if (b[sortBy] == null) b[sortBy] = 0;
    if (a[sortBy] < b[sortBy]) return 1;
    if (a[sortBy] > b[sortBy]) return -1;

    return 0;
  });

  return sortedComments;
}
