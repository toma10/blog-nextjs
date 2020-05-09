import Content from "../../components/Content";
import DateTime from "../../components/DateTime";
import Heading from "../../components/Heading";
import Page from "../../components/Page";
import React from "react";
import ReactMarkdown from "react-markdown";
import Title from "../../components/Title";
import { format } from "date-fns";
import glob from "glob";
import matter from "gray-matter";
import { excerpt } from "../../helpers";

export default function BlogPost({ frontmatter, excerpt, markdownBody }) {
  return (
    <Page title={frontmatter.title} description={excerpt} article>
      <Heading>
        <Title>{frontmatter.title}</Title>
        <div className="mt-2">
          <DateTime dateTime={frontmatter.date}>
            {format(new Date(frontmatter.date), "dd MMMM, yyyy")}
          </DateTime>
        </div>
      </Heading>
      <Content>
        <ReactMarkdown className="space-y-6 markdown" source={markdownBody} />
      </Content>
    </Page>
  );
}

export async function getStaticProps(context) {
  const { slug } = context.params;
  const content = await import(`../../posts/${slug}.md`);
  const data = matter(content.default, {
    excerpt: (file) => (file.excerpt = excerpt(file.content)),
  });

  return {
    props: {
      frontmatter: data.data,
      excerpt: data.excerpt,
      markdownBody: data.content,
    },
  };
}

export async function getStaticPaths() {
  const posts = glob.sync("posts/**/*.md");

  const slugs = posts.map((file) =>
    file.split("/")[1].replace(/ /g, "-").slice(0, -3)
  );

  const paths = slugs.map((slug) => `/posts/${slug}`);

  return {
    paths,
    fallback: false,
  };
}
