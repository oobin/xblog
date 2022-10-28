import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const postRouter = router({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany();
  }),
  byId: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      const { id } = input;
      const post = ctx.prisma.post.findUnique({
        where: { id },
      });
      if (!post) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No posts with id '${id}'`,
        });
      }
      return post;
    }),
});
