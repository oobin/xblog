import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { createContextInner } from "../../server/trpc/context";
import { prisma } from "../../server/db/client";
import { appRouter } from "../../server/trpc/router/_app";
import superjson from "superjson";
import { trpc } from "../../utils/trpc";
import { styles } from "../../styles/styles";
import Head from "next/head";
import { DefaultQueryCell } from "../../utils/DefaultQueryCell";

export const getStaticProps = async (context: GetStaticPropsContext<{ id: string }>) => {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: await createContextInner({ session: null }),
    transformer: superjson,
  });

  const id = context.params?.id as string;

  await ssg.post.byId.prefetch({ id });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await prisma.post.findMany({
    select: {
      id: true,
    },
  });

  return {
    paths: posts.map((post) => ({
      params: {
        id: post.id,
      },
    })),
    fallback: "blocking",
  };
};

export default function PostPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const { id } = props;
  const postQuery = trpc.post.byId.useQuery({ id });

  return (
    <DefaultQueryCell
      query={postQuery}
      success={({ data }) => (
        <>
          <Head>
            <title>{data?.title}</title>
            <meta name="description" content={data?.description} />
          </Head>

          <main className={styles.blogContainer}>
            <h1 className={styles.blogTitle}>{data?.title}</h1>
            <p className={styles.blogBody}>{data?.body}</p>
            <em>Created {data?.createdAt.toLocaleDateString()}</em>
          </main>
        </>
      )}
      empty={() => (
        <>
          <Head>
            <title>Blog post does not exist</title>
            <meta name="description" content="Blog post does not exist" />
          </Head>

          <main className={styles.blogContainer}>
            <h1 className={styles.blogTitle}>Blog post does not exist</h1>
            <p className={styles.blogBody}>Cant find blog post with an id of {id}</p>
          </main>
        </>
      )}
      loading={() => (
        <>
          <main className={styles.blogContainer}>
            <p>Shouldnt be here..</p>
          </main>
        </>
      )}
    />
  );
}
