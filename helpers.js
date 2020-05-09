function excerpt(text) {
  const excerpt = text.split("\n").slice(0, 2).join(" ").trim().slice(0, -1);
  return `${excerpt}...`;
}

export { excerpt };
