import { createFileRoute, Link } from "@tanstack/react-router";
import { client } from "../lib/sanity";
import { createImageUrlBuilder } from "@sanity/image-url";
function BlogsSkeleton() {
  return (
    <div className="min-h-screen bg-[#090A12] text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-24">
        <h1 className="text-4xl md:text-6xl font-light mb-14">Insights</h1>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-[28px] bg-[#14141D] overflow-hidden">
              <div className="w-full h-[220px] bg-white/5 animate-pulse" />
              <div className="p-8 space-y-3">
                <div className="h-6 bg-white/5 rounded animate-pulse w-3/4" />
                <div className="h-4 bg-white/5 rounded animate-pulse w-full" />
                <div className="h-4 bg-white/5 rounded animate-pulse w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export const Route = createFileRoute("/blogs/")({
  loader: async () => {
    try {
      const blogs = await client.fetch(`
        *[_type=="blog"] | order(_createdAt desc){
          _id,
          title,
          excerpt,
          slug,
          coverImage
        }
      `);
      return blogs ?? [];
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
      return [];
    }
  },
  pendingComponent: BlogsSkeleton,
  component: BlogsPage,
});

const builder = createImageUrlBuilder(client);

function urlFor(source: any) {
  if (!source) return "";

  return builder.image(source);
}

function BlogsPage() {
  const blogs = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-[#090A12] text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-24">
        <h1 className="text-4xl md:text-6xl font-light mb-14">Insights</h1>

        {!blogs?.length ? (
          <div className="text-white/60">No blogs published yet.</div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {blogs.map((blog: any) => (
              <Link
                key={blog._id}
                to="/blogs/$slug"
                params={{
                  slug: blog?.slug?.current ?? "",
                }}
                className="
                  group
                  block
                  overflow-hidden
                  rounded-[28px]
                  bg-[#14141D]
                  border
                  border-white/10
                  hover:border-white/20
                  transition
                "
              >
                {blog?.coverImage && (
                  <img
                    src={urlFor(blog.coverImage).width(1200).height(700).url()}
                    alt={blog?.title || "Blog"}
                    className="
      w-full
      h-[220px]
      object-cover
    "
                  />
                )}

                <div className="p-8">
                  <h2 className="text-2xl font-medium mb-3">{blog.title}</h2>

                  <p className="text-white/60 line-clamp-3">{blog.excerpt}</p>

                  <div className="mt-6 text-blue-400 group-hover:translate-x-1 transition">
                    Read Article →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
