import { Poppins } from "next/font/google";
import "./globals.css";

// Import Poppins font from Google Fonts
const poppins = Poppins({
  subsets: ["latin"], // Optional: You can specify other subsets like 'latin-ext', etc.
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], // Select desired weights
  variable: "--font-poppins", // Create a CSS variable to reference in styles
});

export const metadata = {
  title: "Maybelline",
  description: "Maybelline Influencer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased`} // Apply the font here
      >
        {children}
      </body>
    </html>
  );
}
