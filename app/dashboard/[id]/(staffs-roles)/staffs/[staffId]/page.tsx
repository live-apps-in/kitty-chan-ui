'use client';
import { StaffDto } from '@/components/features/staffs-roles/Staffs/Staffs';
import StaffForm from '@/components/features/staffs-roles/Staffs/StaffsForm';
import DashboardLayout from '@/layouts/DashboardLayout';
import { useAppSelector } from '@/redux/store';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const StaffsEditPage = () => {
  const { staffId } = useParams();

  console.log(staffId);

  const { currentGuildId } = useAppSelector(
    (state) => state.guildReducer.value
  );

  const [staff, setStaff] = useState<StaffDto>();
  const [loading, setLoading] = useState(false);

  const getStaffs = async () => {
    try {
      setLoading(true);
      const { data, status } = await axios.get(
        `${process.env.NEXT_PUBLIC_KITTY_CHAN_API}/guild/staff`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('accessToken')}`,
            'x-guild-id': currentGuildId,
          },
        }
      );
      if (status == 200) {
        const currentStaff = data.filter(
          (staff: StaffDto) => staff._id === staffId
        );
        setStaff(currentStaff[0]);
      }
    } catch (error) {
      console.log('Fetch Staffs Error: ', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStaffs();
  }, [staffId]);

  return (
    !loading &&
    staff && (
      <DashboardLayout>
        <StaffForm staffToEdit={staff} />
      </DashboardLayout>
    )
  );
};

export default StaffsEditPage;
