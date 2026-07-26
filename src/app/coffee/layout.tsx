import type { Metadata } from "next";
import { Playfair_Display, Manrope } from "next/font/google";

const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-display",
});

const body = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Ember & Oak Coffee Co.",
  description:
    "Small-batch, single-origin coffee roasted in-house. Discover Ember & Oak.",
};

export default function CoffeeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${display.variable} ${body.variable} font-body`}>
      {children}
    </div>
  );
}
