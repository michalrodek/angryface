export interface Query {
  data: DiscussionsQuery;
}

interface DiscussionsQuery {
  discussions: DiscussionConnection;
}

interface DiscussionConnection {
  edges: DiscussionEdge[];
}

interface DiscussionEdge {
  node: DiscussionNode;
}

interface DiscussionNode {
  id: string;
  title: string;
  createdDate: string;
  canonicalString: string;
  commentsCount: number;
  comments: CommentConnection;
  service: Service;
}

interface Service {
  title: string;
}

interface CommentEdge {
  node: CommentNode;
}

interface CommentNode {
  id: string;
  content: string;
  createdDate: string;
  reactionsCount: ReactionCount[];
  user: User;
}

interface User {
  profilName: string;
  profilLink: string;
  profilImage: string;
}

export interface ReactionCount {
  reactionType: ReactionType;
  count: number;
}

interface ReactionType {
  name: EmoteName;
}

export type EmoteName = "angry" | "laugh" | "heart" | "shock" | "cry";

interface CommentConnection {
  edges: CommentEdge[];
}

export interface FlattenedComment extends Emotes, User {
  id: string;
  content: string;
  url: string;
  title: string;
}

export type Emotes = Record<EmoteName, number>;
