import Layout from '@/components/layout/layout';
import { Footer } from '@/components/footer';

export default async function NavFooterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
      <Layout>
        {children}
        <Footer />
      </Layout>
    </div>
  );
}
