import Script from "next/script";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Providers from "./providers";

export const metadata = {
  title: "One mart - Your One Stop Shop",
  description: "Your one stop shop for all your needs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="http://localhost:3000/assets/css/plugins.css" />
        <link rel="stylesheet" href="http://localhost:3000/assets/css/style.css" />
      </head>
      <body>
        <Header />
        <Providers>{children}</Providers>
        <Footer />
        <Script src="http://localhost:3000/assets/js/plugins.js" strategy="afterInteractive" />
        <Script src="http://localhost:3000/assets/js/main.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
