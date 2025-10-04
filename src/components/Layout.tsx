// src/components/Layout.tsx
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { AnimatedBackground } from './AnimatedBackground';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col relative">
      <AnimatedBackground />
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 z-10 relative">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;