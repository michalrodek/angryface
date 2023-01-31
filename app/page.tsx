import Comments from "./Comments";
import { FlattenedComment, Query } from "../types";
import { SZ_COMMENTS, NOVINKY_COMMENTS, getData } from "../data";
import { flattenComments, sortComments } from "../utils";

let cache = 0;

export default async function Home() {
  let data: FlattenedComment[] = [];

  if (process.env.NODE_ENV === "production") {
    const cacheSec = new Date(cache).getSeconds();
    const currentSec = new Date(Date.now()).getSeconds();

    if (currentSec - cacheSec > 300 || cache === 0) {
      cache = Date.now();
      let flattenedComments: FlattenedComment[] = [];

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

      flattenedComments = [
        ...flattenComments(queries[0]),
        ...flattenComments(queries[1]),
        ...flattenComments(queries[2]),
        ...flattenComments(queries[3]),
      ];

      data = sortComments(flattenedComments, "angry");
    }
  } else {
    let flattenedComments: FlattenedComment[] = [];

    flattenedComments = [
      ...flattenComments(SZ_COMMENTS),
      ...flattenComments(NOVINKY_COMMENTS),
    ];

    data = sortComments(flattenedComments, "angry");
  }

  return (
    <main className="max-w-3xl m-auto my-20 px-8">
      <Comments data={data} />
    </main>
  );
}
