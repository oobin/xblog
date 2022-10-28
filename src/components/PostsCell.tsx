import Link from "next/link";
import { styles } from "../styles/styles";
import { DefaultQueryCell } from "../utils/DefaultQueryCell";
import { trpc } from "../utils/trpc";

type BlogPostProps = {
  id: string;
  title: string;
};

export default function PostsCell() {
  const postsQuery = trpc.post.all.useQuery();

  return (
    <>
      <h2 className={styles.blogHeader}>Posts</h2>
      {/* {postsQuery.status === "loading"} */}

      <DefaultQueryCell
        query={postsQuery}
        success={({ data }: any) =>
          data.map(({ id, title }: BlogPostProps) => (
            <Link key={id} href={`/post/${id}`}>
              <a className={styles.link}>{title}</a>
            </Link>
          ))
        }
        empty={() => <p>WE NEED POSTS!!!</p>}
      />
    </>
  );
}
