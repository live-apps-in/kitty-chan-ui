'use client';
import EmbedBuilder from '@/components/shared/embed-builder/EmbedBuilder';
import DashboardLayout from '@/layouts/DashboardLayout';
import { useParams } from 'next/navigation';

// To create embed template
const EmbedTemplateFormPage = () => {
  const { target } = useParams();
  return (
    <DashboardLayout>
      <EmbedBuilder target={target} feature='logs' />
    </DashboardLayout>
  );
};

export default EmbedTemplateFormPage;
