'use client';

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import { usePathname } from 'next/navigation';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6366f1',
    },
    background: {
      default: '#020617',
      paper: '#0f172a',
    },
    text: {
      primary: '#f8fafc',
      secondary: '#94a3b8',
    },
  },
  typography: {
    fontFamily: 'inherit',
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/signup' || pathname === '/login' || pathname === '/';

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          {isAuthPage ? (
            children
          ) : (
            <Box sx={{ display: 'flex' }}>
              <Box component="main" sx={{ flexGrow: 1, p: 3, minHeight: '100vh' }}>
                {children}
              </Box>
            </Box>
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}
