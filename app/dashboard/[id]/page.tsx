'use client';
import Dashboard from '@/components/templates/dashboard/Dashboard';
import { useAuth } from '@/hooks/useAuth';
import DashboardLayout from '@/layouts/DashboardLayout';
import { useAppSelector } from '@/redux/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const { loading } = useAuth();
  const { isAuth, userDetails } = useAppSelector(
    (state) => state.authReducer.value
  );

  const router = useRouter();

  useEffect(() => {
    if (!loading && !userDetails) {
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, userDetails]);

  if (loading && !userDetails) {
    return null;
  }

  return (
    isAuth && (
      <DashboardLayout>
        <Dashboard />
      </DashboardLayout>
    )
  );
}
