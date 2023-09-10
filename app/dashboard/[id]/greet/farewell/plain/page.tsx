import PlainMessage from '@/components/shared/plain-message-builder/PlainMessage';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Target } from '@/types/Templates';
import React from 'react';

const CreateFarewellPlainTemplatePage = () => {
  return (
    <DashboardLayout>
      <PlainMessage target={Target.FAREWELL} feature='greet' />
    </DashboardLayout>
  );
};

export default CreateFarewellPlainTemplatePage;
