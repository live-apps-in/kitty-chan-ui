import PlainMessage from '@/components/templates/plain-message-builder/PlainMessage';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Target } from '@/types/Greet';

const CreateWelcomePlainTemplatePage = () => {
  return (
    <DashboardLayout>
      <PlainMessage target={Target.WELCOME} />
    </DashboardLayout>
  );
};

export default CreateWelcomePlainTemplatePage;
