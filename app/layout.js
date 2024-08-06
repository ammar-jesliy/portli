import { Poppins, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "leaflet/dist/leaflet.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-bricolage",
});

export const metadata = {
  title: "Portli",
  description:
    "Build beautiful microsites in minutes with our easy drag-and-drop builder. Customize every detail to fit your brand and share your story with the world effortlessly",
  openGraph: {
    title: "Portli",
    description:
      "Build beautiful microsites in minutes with our easy drag-and-drop builder. Customize every detail to fit your brand and share your story with the world effortlessly",
    url: "https://portli.vercel.app",
    images: [
      {
        url: "/portli-og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portli",
    description:
      "Build beautiful microsites in minutes with our easy drag-and-drop builder. Customize every detail to fit your brand and share your story with the world effortlessly",
    images: ["/portli-og-image.jpg"],
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
