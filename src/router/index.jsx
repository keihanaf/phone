import { createBrowserRouter } from 'react-router-dom';
// Layout
import Layout from '@/layout/Layout.jsx';

// Pages
import HomeScreenPage from '@/features/HomeScreen/pages/HomeScreenPage.jsx';
import CallPage from '@/features/Call/pages/CallPage.jsx';
import MessagePage from '@/features/Message/pages/MessagePage.jsx';
import PayMatePage from '@/features/PayMate/pages/PayMatePage.jsx';
import YellowJackPage from '@/features/YellowJack/pages/YellowJackPage.jsx';
import BleeterPage from '@/features/Bleeter/pages/BleeterPage.jsx';
import FruitMarketPage from '@/features/FruitMarket/pages/FruitMarketPage';
import MailPage from '@/features/Mail/pages/MailPage';
import SettingPage from '@/features/Setting/pages/SettingPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomeScreenPage />,
      },
      {
        path: 'call',
        element: <CallPage />,
      },
      {
        path: 'message',
        element: <MessagePage />,
      },
      {
        path: 'paymate',
        element: <PayMatePage />,
      },
      {
        path: 'yellowjack',
        element: <YellowJackPage />,
      },
      {
        path: 'bleeter',
        element: <BleeterPage />,
      },
      {
        path: 'fruitmarket',
        element: <FruitMarketPage />,
      },
      {
        path: 'mail',
        element: <MailPage />,
      },
      {
        path: 'setting',
        element: <SettingPage />,
      },
    ],
  },
]);

export default router;
