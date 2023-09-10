import WelcomeGreet from '@/components/features/greet/welcome/WelcomeGreet';
import DashboardLayout from '@/layouts/DashboardLayout';

export const metadata = {
  title: 'Welcome Greet',
};

const WelcomeGreetPage = () => {
  return (
    <DashboardLayout>
      <WelcomeGreet />
    </DashboardLayout>
  );
};

export default WelcomeGreetPage;
