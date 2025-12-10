import type { Metadata } from 'next';
import './globals.css';
import Layout from '@/components/Layout';

export const metadata: Metadata = {
  title: 'MasteryPath - Learn SQL, ML & AWS',
  description: 'A comprehensive learning platform to master SQL, Machine Learning, AWS, and Database fundamentals from scratch to professional mastery.',
  keywords: ['SQL', 'Machine Learning', 'AWS', 'Database', 'Learning', 'Education', 'Programming'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
