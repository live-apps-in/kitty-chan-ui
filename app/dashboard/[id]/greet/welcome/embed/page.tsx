import EmbedBuilder from '@/components/templates/embed-builder/EmbedBuilder';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Target } from '@/types/Greet';

const CreateEmbedTemplateFormPage = () => {
  return (
    <DashboardLayout>
      <EmbedBuilder target={Target.WELCOME} />
    </DashboardLayout>
  );
};

export default CreateEmbedTemplateFormPage;
