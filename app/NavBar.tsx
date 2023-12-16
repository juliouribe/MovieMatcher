"use client";

import { Skeleton } from "@/app/components";
import { Button, Container, Flex } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


const NavBar = () => {
  const router = useRouter()
  const { status, data: session } = useSession()

  const handleLogin = () => {
    router.push("/api/auth/signin")
  }
  const handleLogout = () => {
    router.push("/api/auth/signout")
  }

  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify="between" align="center">
          <div>Top Left</div>
          <div>Center</div>
          {status === "authenticated" && (
            <Button onClick={handleLogout}>
              Logout
            </Button>
          )}
          {status === "unauthenticated" && (
            <Button onClick={handleLogin}>
              Login
            </Button>
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
