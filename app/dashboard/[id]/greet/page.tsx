import Greet from '@/components/features/greet/Greet';
import DashboardLayout from '@/layouts/DashboardLayout';

const GreetPage = () => {
  return (
    <DashboardLayout>
      <Greet />
    </DashboardLayout>
  );
};

export default GreetPage;
