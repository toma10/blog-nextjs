// import { graphql, useStaticQuery } from "gatsby"

import Avatar from "./Avatar";
import Link from "next/link";
import Nav from "./Nav";
import React from "react";
import config from "../config";

export default function Header() {
  return (
    <header className="flex justify-between items-center">
      <Link href="/">
        <a className="flex items-center space-x-3">
          <Avatar />
          <div>
            <h1 className="text-2xl leading-6 tracking-tight font-extrabold text-gray-900 sm:text-3xl sm:leading-9 ">
              {config.title}
            </h1>
            <p className="text-gray-600">{config.subtitle}</p>
          </div>
        </a>
      </Link>
      <Nav />
    </header>
  );
}
