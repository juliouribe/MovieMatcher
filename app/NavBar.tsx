"use client";

import { Skeleton } from "@/app/components";
import { Box, Button, Flex } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const NavBar = () => {

  return (
    <nav className="border-b mb-5 px-5 py-3">
        <Flex justify="between" align="center">
          <div>Top Left</div>
          <div>Center</div>
          <UserStatus />
        </Flex>
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
  const handleSignup = () => {
    router.push("/api/auth/signup")
  }

  return (
    <div>
      {status === "authenticated" && (
        <Button onClick={handleLogout} className="hover:cursor-pointer">
          Logout
        </Button>
      )}
      {status === "unauthenticated" && (
        <Flex gap="2">
          <Button onClick={handleSignup} className="hover:cursor-pointer" variant="outline">
            Signup
          </Button>
          <Button onClick={handleLogin} className="hover:cursor-pointer">
            Login
          </Button>
        </Flex>
      )}
      {status === "loading" && (
        <Skeleton width="2em" />
      )}
    </div>
  )
}

export default NavBar
