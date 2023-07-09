import EmbedBuilder from '@/components/templates/embed-builder/EmbedBuilder';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Target } from '@/types/Greet';

const CreateFarewellEmbedTemplatePage = () => {
  return (
    <DashboardLayout>
      <EmbedBuilder target={Target.FAREWELL} />
    </DashboardLayout>
  );
};

export default CreateFarewellEmbedTemplatePage;
