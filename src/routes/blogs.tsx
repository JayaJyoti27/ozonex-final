import { Outlet, createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";

export const Route = createFileRoute("/blogs")({
  component: BlogsLayout,
});

function BlogsLayout() {
  return (
    <>
      <Nav />

      <div
        style={{
          paddingTop: 90, // offset fixed nav
        }}
      >
        <Outlet />
      </div>
    </>
  );
}
