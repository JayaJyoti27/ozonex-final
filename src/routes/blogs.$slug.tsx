import { createFileRoute } from "@tanstack/react-router";
import { client } from "../lib/sanity";
import { createImageUrlBuilder } from "@sanity/image-url";
import { PortableText } from "@portabletext/react";

export const Route = createFileRoute("/blogs/$slug")({
  loader: async ({ params }) => {
    const blog = await client.fetch(
      `
      *[
        _type=="blog" &&
        slug.current == $slug
      ][0]{
        _id,
        title,
        excerpt,
        coverImage,
        content
      }
      `,
      {
        slug: params.slug,
      },
    );

    return blog;
  },

  component: BlogPage,
});

const builder = createImageUrlBuilder(client);

function urlFor(source: any) {
  if (!source) return "";

  return builder.image(source);
}

function BlogPage() {
  const blog = Route.useLoaderData();

  if (!blog) {
    return (
      <div className="min-h-screen bg-black text-white grid place-items-center">Blog not found</div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111827] text-white">
      {blog?.coverImage && (
        <img
          src={urlFor(blog.coverImage).width(1600).height(800).url()}
          alt={blog?.title || "Blog"}
          className="
            w-full
            h-[300px]
            md:h-[500px]
            object-cover
          "
        />
      )}

      <div
        className="
          max-w-4xl
          mx-auto
          px-6
          py-14
        "
      >
        <div
          className="
            inline-block
            px-4
            py-2
            rounded-full
            bg-blue-500/20
            text-blue-300
            text-sm
            mb-6
          "
        >
          INSIGHTS
        </div>

        <h1
          className="
            text-4xl
            md:text-6xl
            font-bold
            mb-8
          "
        >
          {blog.title}
        </h1>

        <p
          className="
            text-lg
            text-gray-300
            leading-8
            mb-12
          "
        >
          {blog.excerpt}
        </p>

        <div
          className="
            prose
            prose-invert
            max-w-none
          "
        >
          <PortableText
            value={blog?.content ?? []}
            components={{
              types: {
                table: ({ value }) => (
                  <div className="overflow-x-auto my-10">
                    <table
                      className="
                        w-full
                        border
                        border-white/10
                      "
                    >
                      <tbody>
                        {value?.rows?.map((row: any, i: number) => (
                          <tr key={i}>
                            {row?.cells?.map((cell: string, j: number) => (
                              <td
                                key={j}
                                className="
                                      p-4
                                      border
                                      border-white/10
                                    "
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ),
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
