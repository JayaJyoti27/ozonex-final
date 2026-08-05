import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'blog',
  title: 'Blog',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),

    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
    }),

    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
    }),
    defineField({
      name: 'seo',
      title: 'SEO & Social',
      type: 'seo',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',

      of: [
        {
          type: 'block',
        },

        {
          type: 'table',
        },

        {
          type: 'image',
        },
      ],
    }),
  ],
})
