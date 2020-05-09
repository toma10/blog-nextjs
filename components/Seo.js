import Head from "next/head";
import PropTypes from "prop-types";
import React from "react";
import config from "../config";
import { useRouter } from "next/router";

export default function SEO({ title, description, article }) {
  const { asPath: pathname } = useRouter();

  const seo = {
    title: title || config.defaultTitle,
    description: description || config.defaultDescription,
    url: `${config.siteUrl}${pathname}`,
  };

  return (
    <Head>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/static/images/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/static/images/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/static/images/favicon-16x16.png"
      />
      <link rel="manifest" href="/static/manifest.json" />
      <link
        rel="mask-icon"
        href="/static/images/safari-pinned-tab.svg"
        color="#5bbad5"
      />
      <meta name="msapplication-TileColor" content="#2b5797" />
      <meta name="theme-color" content="#ffffff" />
      <title>{config.titleTemplate.replace("%s", seo.title)}</title>
      <meta name="description" content={seo.description} />
      {seo.url && <meta property="og:url" content={seo.url} />}
      {(article ? true : null) && <meta property="og:type" content="article" />}
      {seo.title && <meta property="og:title" content={seo.title} />}
      {seo.description && (
        <meta property="og:description" content={seo.description} />
      )}
    </Head>
  );
}

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  article: PropTypes.bool,
};

SEO.defaultProps = {
  title: null,
  description: null,
  article: false,
};
