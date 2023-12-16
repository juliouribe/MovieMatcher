"use client";

import { Container, Flex } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { Skeleton } from "@/app/components";


const NavBar = () => {
  const { status, data: session } = useSession()

  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify="between" align="center">
          <div>Top Left</div>
          <div>Center</div>
          {status === "authenticated" && (
            <Link href="/api/auth/signout">Logout</Link>
          )}
          {status === "unauthenticated" && (
            <Link href="/api/auth/signin">Login</Link>
          )}
          {status === "loading" && (
            <Skeleton width="2em" />
          )}
        </Flex>
      </Container>
    </nav>
  )
}

export default NavBar
