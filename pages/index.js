import Content from "@/components/Content";
import DateTime from "@/components/DateTime";
import Heading from "@/components/Heading";
import Link from "next/link";
import Page from "@/components/Page";
import Paragraph from "@/components/Paragraph";
import React from "react";
import StyledLink from "@/components/StyledLink";
import Subtitle from "@/components/Subtitle";
import Title from "@/components/Title";
import { allPosts } from "@/lib/post-queries";
import { format } from "date-fns";

export async function getStaticProps() {
  return {
    props: {
      posts: await allPosts(),
    },
  };
}

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
