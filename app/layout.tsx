import getCurrentUser from './api/actions/getCurrentUser';
import Navbar from './components/navbar/Navbar';
import './globals.css';
import { Poppins } from 'next/font/google';
import ThemeProvider from './providers/ThemeProvider';
import SessionProvider from './providers/SessionProvider';
import LoginModal from './components/modals/LoginModal';
import RegisterModal from './components/modals/RegisterModal';
import ToasterProvider from './providers/ToasterProvider';

export const metadata = {
  title: 'coinscope',
  description: 'webapp to track crypto coins',
};

const font = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${font.className} bg-[#eaebf5] dark:bg-[#0d0e30]`}>
        <ThemeProvider attribute="class">
          <SessionProvider>
            <Navbar currentUser={currentUser} />
            <ToasterProvider />
            <LoginModal />
            <RegisterModal />
            {children}
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

// dark:bg-gradient-to-r dark:from-[#302568] dark:to-[#0d0e30]
