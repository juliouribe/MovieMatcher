"use client";

import { Skeleton } from "@/app/components";
import { Box, Button, Container, Flex } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const NavBar = () => {

  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify="between" align="center">
          <div>Top Left</div>
          <div>Center</div>
          <UserStatus />
        </Flex>
      </Container>
    </nav>
  )
}

const UserStatus = () => {
  const router = useRouter()
  const { status, data: session } = useSession()

  const handleLogin = () => {
    router.push("/api/auth/signin")
  }
  const handleLogout = () => {
    router.push("/api/auth/signout")
  }

  return (
    <Box>
      {status === "authenticated" && (
        <Button onClick={handleLogout} className="hover:cursor-pointer">
          Logout
        </Button>
      )}
      {status === "unauthenticated" && (
        <Button onClick={handleLogin} className="hover:cursor-pointer">
          Login
        </Button>
      )}
      {status === "loading" && (
        <Skeleton width="2em" />
      )}
    </Box>
  )
}

export default NavBar
