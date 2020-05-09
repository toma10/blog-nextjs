import Link from "next/link";
import React from "react";

export default function StyledLink({ children, ...props }) {
  return (
    <Link {...props}>
      <a className="text-base font-semibold leading-6 text-indigo-600 transition duration-150 ease-in-out hover:text-indigo-500">{children}</a>
    </Link>
  );
}
