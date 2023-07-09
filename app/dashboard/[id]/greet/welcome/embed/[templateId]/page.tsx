'use client';
import DashboardLayout from '@/layouts/DashboardLayout';
import { useParams } from 'next/navigation';

const EditEmbedTemplatePage = () => {
  const { templateId } = useParams();
  return <DashboardLayout>{templateId}</DashboardLayout>;
};

export default EditEmbedTemplatePage;
