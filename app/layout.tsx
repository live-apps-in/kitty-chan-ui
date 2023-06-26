import './globals.css';
import { ReduxProvider } from '@/redux/provider';

export const metadata = {
  title: 'kitty chan',
  description:
    'kitty chan is a Discord bot, powerful enough to moderate your Discord server.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
