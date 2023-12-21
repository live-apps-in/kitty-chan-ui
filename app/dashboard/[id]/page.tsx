'use client';
import Dashboard from '@/components/features/dashboard/Dashboard';
import { useAuth } from '@/hooks/useAuth';
import DashboardLayout from '@/layouts/DashboardLayout';
import { setCurrentGuildId } from '@/redux/slices/guildSlice';
import { AppDispatch, useAppSelector } from '@/redux/store';
import Cookies from 'js-cookie';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function DashboardPage() {
  const { loading } = useAuth();
  
  const { isAuth, userDetails } = useAppSelector(
    (state) => state.authReducer.value
  );

  const { id } = useParams();
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!loading && !userDetails) {
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, userDetails]);

  useEffect(() => {
    if (id) {
      Cookies.set('current-guild', JSON.stringify(id));
      dispatch(setCurrentGuildId(id));
    }
  }, [id]);

  if (loading && !userDetails) {
    return null;
  }

  return (
    isAuth && (
      <DashboardLayout guildId={id}>
        <Dashboard />
      </DashboardLayout>
    )
  );
}
