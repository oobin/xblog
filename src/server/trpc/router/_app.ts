// src/server/trpc/router/_app.ts
import { router } from "../trpc";
import { exampleRouter } from "./example";
import { postRouter } from "./post";
import { authRouter } from "./auth";

export const appRouter = router({
  example: exampleRouter,
  post: postRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
