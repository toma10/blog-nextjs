import Content from "../components/Content";
import DateTime from "../components/DateTime";
import Heading from "../components/Heading";
import Link from "next/link";
import Page from "../components/Page";
import Paragraph from "../components/Paragraph";
import React from "react";
import StyledLink from "../components/StyledLink";
import Subtitle from "../components/Subtitle";
import Title from "../components/Title";
import { excerpt } from "../helpers";
import { format } from "date-fns";
import matter from "gray-matter";

function Post({ post }) {
  return (
    <div>
      <DateTime dateTime={post.frontmatter.date}>
        {format(new Date(post.frontmatter.date), "dd MMMM, yyyy")}
      </DateTime>
      <Link href="/posts/[slug]" as={`/posts/${post.slug}`}>
        <a>
          <Subtitle>{post.frontmatter.title}</Subtitle>
          <div className="mt-3">
            <Paragraph>{post.excerpt}</Paragraph>
          </div>
        </a>
      </Link>
      <div className="mt-3">
        <StyledLink href="/posts/[slug]" as={`/posts/${post.slug}`}>
          Read full story
        </StyledLink>
      </div>
    </div>
  );
}

export default function Home({ posts }) {
  return (
    <Page title="Home">
      <Heading>
        <Title>Blog</Title>
      </Heading>
      <Content>
        <div className="grid gap-16">
          {posts.map((post, index) => (
            <Post key={index} post={post} />
          ))}
        </div>
      </Content>
    </Page>
  );
}

export async function getStaticProps() {
  const posts = ((context) => {
    const keys = context.keys();
    const values = keys.map(context);

    const data = keys.map((key, index) => {
      const value = values[index];
      const document = matter(value.default);

      const slug = key
        .replace(/^.*[\\\/]/, "")
        .split(".")
        .slice(0, -1)
        .join(".");

      return {
        frontmatter: document.data,
        markdownBody: document.content,
        slug,
        excerpt: excerpt(document.content),
      };
    });

    return data;
  })(require.context("../posts", true, /\.md$/));

  return {
    props: {
      posts: posts.sort(
        (postA, postB) =>
          new Date(postB.frontmatter.date) - new Date(postA.frontmatter.date)
      ),
    },
  };
}
