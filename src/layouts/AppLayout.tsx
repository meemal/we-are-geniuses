import { ReactNode } from 'react';
import { Header } from '../components/Header';
import { HelloBar } from '../components/HelloBar';

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-genius">
      <HelloBar />
      <Header />
      <div className="pt-40">
        {children}
      </div>
    </div>
  );
};