import PlainMessage from '@/components/templates/plain-message-builder/PlainMessage';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Target } from '@/types/Greet';
import React from 'react';

const FarewellPlainTemplateFormPage = () => {
  return (
    <DashboardLayout>
      <PlainMessage target={Target.FAREWELL} />
    </DashboardLayout>
  );
};

export default FarewellPlainTemplateFormPage;
