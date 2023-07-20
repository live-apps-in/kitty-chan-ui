import EmbedBuilder from '@/components/templates/embed-builder/EmbedBuilder';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Target } from '@/types/Templates';

const CreateWelcomeEmbedTemplatePage = () => {
  return (
    <DashboardLayout>
      <EmbedBuilder target={Target.WELCOME} feature='greet'/>
    </DashboardLayout>
  );
};

export default CreateWelcomeEmbedTemplatePage;
