import { createFileRoute } from "@tanstack/react-router";
import { client } from "../lib/sanity";
import { createImageUrlBuilder } from "@sanity/image-url";
import { PortableText } from "@portabletext/react";
import { useEffect } from "react";
import { gsap } from "gsap";

const DEFAULT_OG_IMAGE =
  "https://storage.googleapis.com/gpt-engineer-file-uploads/qXbErmlRR7MTjCnlxOOKyq58jYW2/social-images/social-1778904108837-Ozonex_new_1-01-removebg-preview.webp";

const builder = createImageUrlBuilder(client);

function urlFor(source: any) {
  if (!source) return "";
  return builder.image(source);
}

export const Route = createFileRoute("/blogs/$slug")({
  loader: async ({ params }) => {
    try {
      const blog = await client.fetch(
        `*[_type=="blog" && slug.current == $slug][0]{
          _id, title, excerpt, coverImage, content,
          seo
        }`,
        { slug: params.slug },
      );
      return blog ?? null;
    } catch (error) {
      console.error("Failed to fetch blog:", error);
      return null;
    }
  },

  head: ({ loaderData, params }) => {
    if (!loaderData) return {};

    const title = loaderData.seo?.metaTitle || loaderData.title;
    const description = loaderData.seo?.metaDescription || loaderData.excerpt;
    const canonicalUrl =
      loaderData.seo?.canonicalUrl || `https://ozonextravel.com/blogs/${params.slug}`;

    const ogImage = loaderData.coverImage
      ? urlFor(loaderData.coverImage).width(1200).height(630).fit("crop").url()
      : DEFAULT_OG_IMAGE;

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: canonicalUrl },
        { property: "og:type", content: "article" },
        { property: "og:image", content: ogImage },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: ogImage },
      ],
      links: [{ rel: "canonical", href: canonicalUrl }],
    };
  },

  component: BlogPage,
});

function BlogPage() {
  useEffect(() => {
    gsap.fromTo(
      ".blog-top-animate",
      {
        opacity: 0,
        y: 80,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.18,
        ease: "power3.out",
      },
    );
  }, []);
  const blog = Route.useLoaderData();

  if (!blog) {
    return (
      <div className="min-h-screen bg-black text-white grid place-items-center">Blog not found</div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111827] text-white">
      <div className="relative">
        {blog?.coverImage && (
          <img
            src={urlFor(blog.coverImage).width(1800).url()}
            alt={blog?.title}
            className="
        w-full
        h-[40vh]
        md:h-[65vh]
        object-cover
        rounded-b-[40px]
      "
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#081325]" />
      </div>
      <div
        className="
max-w-6xl
mx-auto
px-6
py-20
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
text-5xl
md:text-7xl
font-light
leading-[1]
mb-10
"
        >
          {blog.title}
        </h1>

        <p
          className="
text-2xl
text-white/70
leading-relaxed
mb-16
"
        >
          {blog.excerpt}
        </p>

        <div
          className="
prose
prose-invert
prose-lg
max-w-none

prose-headings:text-white
prose-headings:font-medium

prose-p:text-white/80
prose-p:leading-[2]

prose-h2:text-4xl
prose-h2:mt-20

prose-h3:text-2xl

prose-strong:text-white

prose-ul:text-white/80
prose-li:marker:text-blue-400

prose-blockquote:
border-l-2
border-blue-500
pl-6
"
        >
          <PortableText
            value={blog?.content ?? []}
            components={{
              block: {
                // Cap any H1 authored in Sanity content to H2, so the page
                // never has more than one H1 (the actual page title above).
                h1: ({ children }) => <h2 className="text-4xl mt-20">{children}</h2>,
              },
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
