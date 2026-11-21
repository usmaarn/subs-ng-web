"use client";

import { Link } from "@tanstack/react-router";

export function Brand() {
  return (
    <Link to="/">
      <img src="/logo.png" alt="Subs.NG" className="h-8" />
    </Link>
  );
}
