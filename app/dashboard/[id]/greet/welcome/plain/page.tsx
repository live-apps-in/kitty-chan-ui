import PlainMessage from '@/components/shared/plain-message-builder/PlainMessage';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Target } from '@/types/Templates';

const CreateWelcomePlainTemplatePage = () => {
  return (
    <DashboardLayout>
      <PlainMessage target={Target.WELCOME} feature='greet' />
    </DashboardLayout>
  );
};

export default CreateWelcomePlainTemplatePage;
