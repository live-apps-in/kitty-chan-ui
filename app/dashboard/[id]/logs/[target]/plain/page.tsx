'use client';
import PlainMessage from '@/components/templates/plain-message-builder/PlainMessage';
import DashboardLayout from '@/layouts/DashboardLayout';
import { useParams } from 'next/navigation';

const PlainTemplateFormPage = () => {
  const { target } = useParams();
  return (
    <DashboardLayout>
      <PlainMessage target={target} feature='logs' />
    </DashboardLayout>
  );
};

export default PlainTemplateFormPage;
