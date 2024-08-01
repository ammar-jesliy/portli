import { Poppins, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "leaflet/dist/leaflet.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-poppins",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-bricolage",
});

export const metadata = {
  title: "Portli",
  description: "Micro site builder",
  openGraph: {
    title: "Portli",
    description: "Micro site builder",
    url: "https://portli.vercel.app",
    images: [
      {
        url: "/portli-og-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portli",
    description: "Micro site builder",
    images: ["/portli-og-image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider afterSignOutUrl="/">
      <html lang="en" data-theme="light">
        <body className={`${poppins.variable} ${bricolage.variable} h-full`}>
          {children}
          <ToastContainer />
        </body>
      </html>
    </ClerkProvider>
  );
}
