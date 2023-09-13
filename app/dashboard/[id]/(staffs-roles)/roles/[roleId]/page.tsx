'use client';
import { RolesDto } from '@/components/features/staffs-roles/Roles/Roles';
import RolesForm from '@/components/features/staffs-roles/Roles/RolesForm';
import DashboardLayout from '@/layouts/DashboardLayout';
import { useAppSelector } from '@/redux/store';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const RolesEditPage = () => {
  const { roleId } = useParams();

  console.log(roleId);

  const { currentGuildId } = useAppSelector(
    (state) => state.guildReducer.value
  );

  const [role, setRole] = useState<RolesDto>();
  const [loading, setLoading] = useState(false);

  const getRoles = async () => {
    try {
      setLoading(true);
      const { data, status } = await axios.get(
        `${process.env.NEXT_PUBLIC_KITTY_CHAN_API}/guild/role`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('accessToken')}`,
            'x-guild-id': currentGuildId,
          },
        }
      );
      if (status == 200) {
        const currentRole = data.filter(
          (role: RolesDto) => role._id === roleId
        );
        setRole(currentRole[0]);
      }
    } catch (error) {
      console.log('Fetch Guild Roles Error: ', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRoles();
  }, [roleId]);

  return (
    !loading &&
    role && (
      <DashboardLayout>
        <RolesForm roleToEdit={role} />
      </DashboardLayout>
    )
  );
};

export default RolesEditPage;
