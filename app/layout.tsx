import type { Metadata } from "next";
import "./globals.css";
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { Toaster } from "react-hot-toast";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  title: "DREAM Lab",
  description: "Reservation system for DREAM Lab",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Toaster />
        <Theme appearance="dark" accentColor="violet">
          {children}
        </Theme>
      </body>
    </html>
  );
}
