import { allPosts, getPost } from "@/lib/post-queries";

import Content from "@/components/Content";
import DateTime from "@/components/DateTime";
import Heading from "@/components/Heading";
import Page from "@/components/Page";
import React from "react";
import Title from "@/components/Title";
import { format } from "date-fns";

export async function getStaticPaths() {
  const posts = await allPosts();

  return {
    paths: posts.map((post) => `/posts/${post.slug}`),
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  return {
    props: {
      post: await getPost(slug),
    },
  };
}

export default function BlogPost({ post }) {
  return (
    <Page title={post.frontmatter.title} description={post.excerpt} article>
      <Heading>
        <Title>{post.frontmatter.title}</Title>
        <div className="mt-2">
          <DateTime dateTime={post.frontmatter.date}>
            {format(new Date(post.frontmatter.date), "dd MMMM, yyyy")}
          </DateTime>
        </div>
      </Heading>
      <Content>
        <div
          className="space-y-6 markdown"
          dangerouslySetInnerHTML={{ __html: post.body }}
        />
      </Content>
    </Page>
  );
}
