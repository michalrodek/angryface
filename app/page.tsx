import Comments from "./Comments";
import { FlattenedComment } from "../types";
import { getData } from "../data";
import { flattenComments, sortComments } from "../utils";

export default async function Home() {
  const zpravyJson = getData("zpravy", 0);
  const zpravyJsonLevel1 = getData("zpravy", 1);
  const novinkyJson = getData("novinky", 0);
  const novinkyJsonLevel1 = getData("novinky", 1);

  const queries = await Promise.all([
    zpravyJson,
    zpravyJsonLevel1,
    novinkyJson,
    novinkyJsonLevel1,
  ]);

  const flattenedComments = [
    ...flattenComments(queries[0]),
    ...flattenComments(queries[1]),
    ...flattenComments(queries[2]),
    ...flattenComments(queries[3]),
  ];

  const data = sortComments(flattenedComments, "angry");

  return (
    <main className="max-w-3xl m-auto my-20 px-8">
      <Comments data={data} />
    </main>
  );
}
