import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
});
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900',
});

export const metadata: Metadata = {
  title: "Dr.Resume",
  description: "Fix your resume",
  openGraph: {
    title: 'Dr.Resume',
    description: 'Fix your resume',
    images: [
      {
        url: './drresume.png', // Place this image in the public directory
        width: 1200,
        height: 630,
        alt: 'Dr.Resume',
      },
    ],
  },
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
		</html>
	);
}
