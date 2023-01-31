import { Roboto } from "@next/font/google";
import "./globals.css";

const font = Roboto({ weight: "400", subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs" className={font.className}>
      <head>
        <title>Angry Face</title>
        <meta name="description" content="Nejlepší komentáře na Seznamu" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}
