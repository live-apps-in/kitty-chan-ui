'use client';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppSelector } from '@/redux/store';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { RolesDto } from './Roles';

const permissions = [
  'dashboard:read',
  'dashboard:write',
  'greet:read',
  'greet:write',
  'greet:welcome:read',
  'greet:welcome:write',
  'greet:welcome:delete',
  'greet:farewell:read',
  'greet:farewell:write',
  'greet:farewell:delete',
  'template:read',
];

const schema = z.object({
  roleName: z.string().min(3, 'Role name should be at least 3 characters long'),
});

type FormData = z.infer<typeof schema>;

const RolesForm = ({ roleToEdit }: { roleToEdit?: RolesDto }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      roleName: roleToEdit?.name || '',
    },
  });

  const router = useRouter();

  const { currentGuildId } = useAppSelector(
    (state) => state.guildReducer.value
  );

  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const handlePermissionChange = (permission: string) => {
    console.log(permission);
    setSelectedPermissions((prevSelectedPermissions) => {
      if (prevSelectedPermissions.includes(permission)) {
        return prevSelectedPermissions.filter((p) => p !== permission);
      } else {
        return [...prevSelectedPermissions, permission];
      }
    });
  };

  const onSubmit: SubmitHandler<FormData> = async ({ roleName }) => {
    const roleInfo = {
      name: roleName,
      permissions: selectedPermissions,
      guildId: currentGuildId,
    };

    if (roleToEdit) {
      try {
        const { status } = await axios.patch(
          `${process.env.NEXT_PUBLIC_KITTY_CHAN_API}/guild/role/${roleToEdit._id}`,
          roleInfo,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get('accessToken')}`,
              'x-guild-id': currentGuildId,
            },
          }
        );
        if (status === 200) {
          router.push(`/dashboard/${currentGuildId}/roles`);
        }
      } catch (error) {
        console.log('Roles Form Update Error: ', error);
      }
    } else {
      try {
        const { status } = await axios.post(
          `${process.env.NEXT_PUBLIC_KITTY_CHAN_API}/guild/role`,
          roleInfo,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get('accessToken')}`,
              'x-guild-id': currentGuildId,
            },
          }
        );
        if (status === 201) {
          router.push(`/dashboard/${currentGuildId}/roles`);
        }
      } catch (error) {
        console.log('Roles Form Create Error: ', error);
      }
    }
  };

  useEffect(() => {
    // Check permissions from the role object and set them in selectedPermissions
    if (roleToEdit && roleToEdit.permissions) {
      setSelectedPermissions(roleToEdit.permissions);
    }
  }, [roleToEdit]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='text-white h-screen'>
      <div className='mb-4'>
        <h2 className='mb-2'>Role Name</h2>
        <input
          placeholder='Role Name'
          type='text'
          className='form-input-field w-1/2'
          {...register('roleName')}
        />
        {errors?.roleName && (
          <p className='text-xs text-red-500 mt-1'>{errors.roleName.message}</p>
        )}
      </div>

      <div>
        <h2 className='text-lg mb-2'>Permissions</h2>
        <div className='space-y-3'>
          {permissions.map((permission) => (
            <div key={permission} className='space-x-2'>
              <input
                type='checkbox'
                id={permission}
                onChange={() => handlePermissionChange(permission)}
                checked={selectedPermissions.includes(permission)}
              />
              <label htmlFor={permission}>{permission}</label>
            </div>
          ))}
        </div>
      </div>
      <button className='bg-kittyNeutralBlack  hover:bg-black text-white font-bold py-2 px-4 rounded my-6'>
        {roleToEdit ? 'Update Role' : 'Create Role'}
      </button>
    </form>
  );
};

export default RolesForm;
