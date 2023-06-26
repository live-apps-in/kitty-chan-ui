import AllGuilds from '@/components/templates/AllGuilds';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Choose a Server',
};

const AllGuildsPage = () => {
  return <AllGuilds />;
};

export default AllGuildsPage;
