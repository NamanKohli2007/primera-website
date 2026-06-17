import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import AnnouncementBar from "@/components/AnnouncementBar";
import LoadingScreen from "@/components/LoadingScreen";
import CartDrawer from "@/components/CartDrawer";
import EmailPopup from "@/components/EmailPopup";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "PRIMERA — Made To Be Missed",
  description:
    "PRIMERA is a premium essentials brand crafted from exceptional plant-based fibres — soft Modal blends and breathable Bamboo blends — made to be worn, washed, and worn again.",
  openGraph: {
    title: "PRIMERA — Made To Be Missed",
    description:
      "Everyday essentials crafted from premium plant-based fibres.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        <AuthProvider>
          <CartProvider>
            <AnnouncementBar />
            <LoadingScreen />
            {children}
            <CartDrawer />
            <EmailPopup />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
