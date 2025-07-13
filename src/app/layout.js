import './globals.css';
import { Web3Provider } from './providers';

export const metadata = {
  title: 'FairTales',
  description: 'A censorship-resistant storytelling platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Web3Provider>{children}</Web3Provider>
      </body>
    </html>
  );
}
