import PlainMessage from '@/components/templates/plain-message-builder/PlainMessage';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Target } from '@/types/Greet';

const WelcomePlainTemplateFormPage = () => {
  return (
    <DashboardLayout>
      <PlainMessage target={Target.WELCOME} />
    </DashboardLayout>
  );
};

export default WelcomePlainTemplateFormPage;
