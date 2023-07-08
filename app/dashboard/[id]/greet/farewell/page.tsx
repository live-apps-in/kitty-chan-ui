import FarewellGreet from '@/components/templates/greet/farewell/FarewellGreet';
import DashboardLayout from '@/layouts/DashboardLayout';
import React from 'react';

export const metadata = {
  title: 'Welcome Greet',
};

const FarewellGreetPage = () => {
  return (
    <DashboardLayout>
      <FarewellGreet />
    </DashboardLayout>
  );
};

export default FarewellGreetPage;
