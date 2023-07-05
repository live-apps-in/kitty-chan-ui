import Greet from '@/components/templates/greet/Greet';
import DashboardLayout from '@/layouts/DashboardLayout';

const GreetPage = () => {
  return (
    <DashboardLayout>
      <Greet />
    </DashboardLayout>
  );
};

export default GreetPage;
