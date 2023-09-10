'use client';
import PlainMessage from '@/components/shared/plain-message-builder/PlainMessage';
import DashboardLayout from '@/layouts/DashboardLayout';
import { useAppSelector } from '@/redux/store';
import { Target, PlainTemplateDto } from '@/types/Templates';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const EditWelcomePlainTemplatePage = () => {
  const { templateId } = useParams();
  const [template, setTemplate] = useState<PlainTemplateDto>();
  const [loading, setLoading] = useState(false);

  const { currentGuildId } = useAppSelector(
    (state) => state.guildReducer.value
  );

  async function fetchTemplate() {
    try {
      setLoading(true);
      const { status, data } = await axios.get(
        `${process.env.NEXT_PUBLIC_KITTY_CHAN_API}/template/${templateId}/view`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('accessToken')}`,
            'x-guild-id': currentGuildId,
          },
        }
      );
      setLoading(false);

      if (status == 200) {
        setTemplate(data);
      }
    } catch (error) {
      console.log('Fetch Welcome Template Error: ', error);
    }
  }

  useEffect(() => {
    if (templateId) {
      fetchTemplate();
    }
  }, []);

  return (
    !loading &&
    template && (
      <DashboardLayout>
        <PlainMessage
          target={Target.WELCOME}
          templateToEdit={template}
          feature='greet' //For redirection after update
        />
      </DashboardLayout>
    )
  );
};

export default EditWelcomePlainTemplatePage;
