import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import PageTransition from "../components/PageTransition";
import SmoothScroll from "../components/SmoothScroll";
import GrainTexture from "../components/GrainTexture";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      <p className="eyebrow">∅ — Lost</p>
      <h1 className="display-hero mt-8 text-foreground">
        Nothing lives here<span className="text-accent">.</span>
      </h1>
      <p className="mt-10 max-w-md font-display text-xl leading-relaxed text-muted-foreground md:text-2xl">
        A mistyped URL, a removed page, or a path that never existed.
      </p>
      <Link
        to="/"
        data-cursor="hover"
        className="group mt-14 inline-flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-foreground transition-colors hover:text-accent"
      >
        <span className="inline-block h-px w-10 bg-foreground transition-all duration-500 group-hover:w-16 group-hover:bg-accent" />
        <span>Back to index</span>
      </Link>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      <p className="eyebrow">⚠ — Error</p>
      <h1 className="display-lg mt-8 text-foreground">
        Something broke<span className="text-accent">.</span>
      </h1>
      <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
        The page failed to load. You can try refreshing or head back home.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="inline-flex items-center justify-center border border-foreground/20 bg-transparent px-6 py-3 text-xs uppercase tracking-[0.22em] text-foreground transition-colors hover:border-accent hover:text-accent"
        >
          Try again
        </button>
        <a
          href="/"
          className="inline-flex items-center justify-center border border-border bg-transparent px-6 py-3 text-xs uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-foreground"
        >
          Go home
        </a>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    head: () => ({
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { title: "Safi Ur Rehman — Full-stack developer" },
        {
          name: "description",
          content:
            "Safi Ur Rehman — full-stack developer based in Lahore, building MERN products and quiet automations.",
        },
        { name: "author", content: "Safi Ur Rehman" },
        {
          property: "og:title",
          content: "Safi Ur Rehman — Full-stack developer",
        },
        {
          property: "og:description",
          content:
            "Full-stack developer based in Lahore. Selected work, labs, and a few small experiments.",
        },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [
        { rel: "stylesheet", href: appCss },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossOrigin: "anonymous",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600&family=Inter+Tight:wght@300;400;500;600&display=swap",
        },
      ],
    }),
    shellComponent: RootShell,
    component: RootComponent,
    notFoundComponent: NotFoundComponent,
    errorComponent: ErrorComponent,
  },
);

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <SmoothScroll>
        <GrainTexture />
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <PageTransition>
          <Outlet />
        </PageTransition>
      </SmoothScroll>
    </QueryClientProvider>
  );
}
