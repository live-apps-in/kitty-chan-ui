'use client';
import EmbedBuilder from '@/components/templates/embed-builder/EmbedBuilder';
import DashboardLayout from '@/layouts/DashboardLayout';
import { useAppSelector } from '@/redux/store';
import { EmbedTemplateDto, Target } from '@/types/Templates';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const EditFarewellEmbedTemplatePage = () => {
  const { templateId } = useParams();
  const [template, setTemplate] = useState<EmbedTemplateDto>();
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
      console.log('Fetch Farewell Template Error: ', error);
    }
  }

  useEffect(() => {
    if (templateId) {
      fetchTemplate();
    }
  }, [templateId]);

  return (
    !loading &&
    template && (
      <DashboardLayout>
        <EmbedBuilder
          target={Target.FAREWELL}
          templateToEdit={template}
          feature='greet'
        />
      </DashboardLayout>
    )
  );
};

export default EditFarewellEmbedTemplatePage;
