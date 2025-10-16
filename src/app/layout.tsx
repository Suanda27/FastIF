import './globals.css';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';


const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'FastIF - Fasilitas Surat Informatika',
  description: 'Ajukan surat akademik dengan cepat dan efisien secara online',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={roboto.className}>
        <div className="flex flex-col min-h-screen">
       
          <main className="flex-grow">{children}</main>
    
        </div>
      </body>
    </html>
  );
}
