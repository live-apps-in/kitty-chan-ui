import EmbedBuilder from '@/components/shared/embed-builder/EmbedBuilder';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Target } from '@/types/Templates';

const CreateFarewellEmbedTemplatePage = () => {
  return (
    <DashboardLayout>
      <EmbedBuilder target={Target.FAREWELL} feature='greet' />
    </DashboardLayout>
  );
};

export default CreateFarewellEmbedTemplatePage;
