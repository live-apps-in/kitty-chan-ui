import WelcomeGreet from '@/components/templates/greet/welcome/WelcomeGreet';
import DashboardLayout from '@/layouts/DashboardLayout';
import React from 'react';

export const metadata = {
  title: 'Welcome Greet',
};

const WelcomeGreetPage = () => {
  return (
    <DashboardLayout>
      <WelcomeGreet />
    </DashboardLayout>
  );
};

export default WelcomeGreetPage;
