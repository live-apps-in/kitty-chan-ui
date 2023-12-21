import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ReduxProvider } from "@/redux/provider";
import NextTopLoader from "nextjs-toploader";

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Home | kitty chan",
  description: "A powerful bot to moderate your discord server!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-psr">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ReduxProvider>
            <NextTopLoader color="#fce4a8" showSpinner={false} />
            <main>{children}</main>
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
