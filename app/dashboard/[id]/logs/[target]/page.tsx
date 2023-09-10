'use client';
import AllTemplates from '@/components/features/logger/AllTemplates';
import DashboardLayout from '@/layouts/DashboardLayout';
import { useParams } from 'next/navigation';

const LogTypePage = () => {
  const { target } = useParams();
  return (
    <DashboardLayout>
      <AllTemplates target={target} />
    </DashboardLayout>
  );
};

export default LogTypePage;
