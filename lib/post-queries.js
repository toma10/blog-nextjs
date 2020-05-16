import excerptHtml from "excerpt-html";
import frontMatter from "front-matter";
import { promises as fs } from "fs";
import marked from "marked";
import path from "path";

export async function getPost(slug) {
  const content = await fs.readFile(
    path.resolve(process.cwd(), `posts/${slug}.md`),
    "utf8"
  );
  const { attributes: frontmatter, body: postMarkdown } = frontMatter(content);
  const postBody = marked(postMarkdown);
  const postExcerpt = excerptHtml(postBody);

  return {
    slug,
    frontmatter,
    body: postBody,
    excerpt: postExcerpt,
  };
}

export async function allPosts() {
  const postPaths = await fs.readdir(path.resolve(process.cwd(), "posts"));

  const posts = await Promise.all(
    postPaths.map(async (path) => {
      return await getPost(path.replace(/\.md$/, ""));
    })
  );

  return posts.sort(
    (postA, postB) =>
      new Date(postB.frontmatter.date) - new Date(postA.frontmatter.date)
  );
}
