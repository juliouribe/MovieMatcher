'use client';

import { Container, Flex } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react';


const NavBar = () => {
  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify="between" align="center">
          <div>Top Left</div>
          <div>Center</div>
          <Link href="/api/auth/signin">Login</Link>
        </Flex>
      </Container>
    </nav>
  )
}

export default NavBar
