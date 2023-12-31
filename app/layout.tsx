import '@radix-ui/themes/styles.css';
import "./theme-config.css";
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Theme } from '@radix-ui/themes';
import NavBar from './NavBar';
import AuthProvider from './auth/Provider';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: 'Movie Matcher',
  description: 'The Tinder for Movies',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.variable}>
        <AuthProvider>
          <Theme accentColor="violet" appearance="dark">
            <NavBar />
            <main>
              {children}
            </main>
          </Theme>
        </AuthProvider>
      </body>
    </html>
  );
}
