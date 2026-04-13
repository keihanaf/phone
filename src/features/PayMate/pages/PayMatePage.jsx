import { useState } from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line
import { motion } from 'framer-motion';

// UI Components
import PageHeader from '@/shared/components/ui/PageHeader.jsx';
import BankCard from '@/features/PayMate/components/BankCard.jsx';
import TabBar from '@/features/PayMate/components/TabBar.jsx';
import TransactionsItem from '@/features/PayMate/components/TransactionsItem.jsx';
import DepositBar from '@/features/PayMate/components/DepositBar.jsx';

// Assets
import RedBankCard from '@/assets/images/card-transparent.png';
import GrayBankCard from '@/assets/images/card-transparent-2.png';
import FleecaImage from '@/assets/images/fleeca.png';

// Mock Data
const mockTransactions = [
  {
    id: 1,
    title: 'Malibu Club',
    subtitle: 'Ethan Evans',
    amount: '226',
    time: '30 Seconds Ago',
    type: 'expense',
    iconClass: 'fi-rs-cocktail',
  },
  {
    id: 2,
    title: 'Mr Kebun',
    subtitle: 'Car rent Payment',
    amount: '26',
    time: '10 Hours Ago',
    type: 'income',
    imageUrl: 'https://i.pravatar.cc/150?img=11',
  },
  {
    id: 3,
    title: 'PizzaThis',
    subtitle: 'Igor Skovacic',
    amount: '89',
    time: '12 Hours Ago',
    type: 'expense',
    iconClass: 'fi-rs-pizza-slice',
  },
  {
    id: 4,
    title: 'UwU Cafe',
    subtitle: 'Ash Ketchup',
    amount: '106',
    time: '2 Days Ago',
    type: 'expense',
    iconClass: 'fi-rs-coffee',
  },
  {
    id: 5,
    title: 'Bob Mulet Hair Salon',
    subtitle: 'Damien Ward',
    amount: '1 019',
    time: '2 Days Ago',
    type: 'expense',
    iconClass: 'fi-rs-scissors',
  },
  {
    id: 6,
    title: 'Los Santos Customs',
    subtitle: 'Car Repair',
    amount: '450',
    time: '3 Days Ago',
    type: 'expense',
    iconClass: 'fi-rs-settings',
  },
  {
    id: 7,
    title: 'Salary',
    subtitle: 'Weekly Paycheck',
    amount: '2 500',
    time: '4 Days Ago',
    type: 'income',
    iconClass: 'fi-rs-money',
  },
  {
    id: 8,
    title: 'Ammunation',
    subtitle: 'Supplies',
    amount: '850',
    time: '5 Days Ago',
    type: 'expense',
    iconClass: 'fi-rs-target',
  },
  {
    id: 9,
    title: 'Vangelico',
    subtitle: 'Jewelry',
    amount: '12 000',
    time: '1 Week Ago',
    type: 'expense',
    iconClass: 'fi-rs-diamond',
  },
  {
    id: 10,
    title: 'Fleeca Bank',
    subtitle: 'Interest Rate',
    amount: '12',
    time: '1 Week Ago',
    type: 'income',
    iconClass: 'fi-rs-bank',
  },
  {
    id: 11,
    title: 'Tequi-la-la',
    subtitle: 'Drinks',
    amount: '120',
    time: '1 Week Ago',
    type: 'expense',
    iconClass: 'fi-rs-glass',
  },
  {
    id: 12,
    title: 'Premium Deluxe Motorsport',
    subtitle: 'Car Purchase',
    amount: '45 000',
    time: '2 Weeks Ago',
    type: 'expense',
    iconClass: 'fi-rs-car',
  },
  {
    id: 13,
    title: 'Yellow Jack Inn',
    subtitle: 'Dinner',
    amount: '45',
    time: '2 Weeks Ago',
    type: 'expense',
    iconClass: 'fi-rs-restaurant',
  },
  {
    id: 14,
    title: 'Casino Diamond',
    subtitle: 'Winnings',
    amount: '5 000',
    time: '2 Weeks Ago',
    type: 'income',
    iconClass: 'fi-rs-dice',
  },
  {
    id: 15,
    title: 'Suburban',
    subtitle: 'Clothing',
    amount: '320',
    time: '3 Weeks Ago',
    type: 'expense',
    iconClass: 'fi-rs-shirt',
  },
  {
    id: 16,
    title: 'Binco',
    subtitle: 'Clothing',
    amount: '85',
    time: '3 Weeks Ago',
    type: 'expense',
    iconClass: 'fi-rs-shirt',
  },
  {
    id: 17,
    title: 'Ponsonbys',
    subtitle: 'Luxury Clothing',
    amount: '1 200',
    time: '1 Month Ago',
    type: 'expense',
    iconClass: 'fi-rs-shopping-bag',
  },
  {
    id: 18,
    title: 'Mechanic',
    subtitle: 'Towing Service',
    amount: '150',
    time: '1 Month Ago',
    type: 'expense',
    iconClass: 'fi-rs-wrench',
  },
  {
    id: 19,
    title: 'Taxi',
    subtitle: 'Downtown Town',
    amount: '25',
    time: '1 Month Ago',
    type: 'expense',
    iconClass: 'fi-rs-taxi',
  },
  {
    id: 20,
    title: 'LSPD',
    subtitle: 'Traffic Ticket',
    amount: '500',
    time: '1 Month Ago',
    type: 'expense',
    iconClass: 'fi-rs-document',
  },
];

const mockBills = [
  {
    id: 101,
    title: 'LS Water & Power',
    subtitle: 'Electricity Bill',
    amount: '150',
    time: '1 Day Ago',
    iconClass: 'fi-rs-bolt',
  },
  {
    id: 102,
    title: 'Bleeter Network',
    subtitle: 'Internet Service',
    amount: '60',
    time: '3 Days Ago',
    iconClass: 'fi-rs-wifi',
  },
  {
    id: 103,
    title: 'Los Santos City',
    subtitle: 'Property Tax',
    amount: '500',
    time: '1 Week Ago',
    iconClass: 'fi-rs-home',
  },
];

export default function PayMatePage({ scale = 1, onClose }) {
  // State Management
  const [isFirstCardTop, setIsFirstCardTop] = useState(true);
  const [activeTab, setActiveTab] = useState('Latest Transactions');

  // Constants for Animation & Layout
  const CARD_OVERLAP_OFFSET = 30;
  const CARD_HEIGHT = 140;

  const springTransition = {
    type: 'spring',
    stiffness: 260,
    damping: 25,
  };

  // Event Handlers
  const handleAcceptBill = (id) => {
    console.log(`Accepted bill ID: ${id}`);
    // Add acceptance logic here
  };

  const handleRejectBill = (id) => {
    console.log(`Rejected bill ID: ${id}`);
    // Add rejection logic here
  };

  return (
    <div className="flex flex-col items-center w-full h-full bg-app overflow-hidden relative">
      <div
        className="flex flex-col relative h-full w-full"
        style={{ width: `${265 * scale}px` }}
      >
        {/* Header Section */}
        <div
          className="shrink-0 w-full relative z-20 transition-all"
          style={{
            paddingTop: `${20 * scale}px`,
            paddingLeft: `${10 * scale}px`,
            paddingRight: `${10 * scale}px`,
            paddingBottom: `${10 * scale}px`,
          }}
        >
          <div className="relative z-30 pointer-events-auto">
            <PageHeader
              scale={scale}
              onLeftClick={onClose}
              showRightButton={false}
            />
          </div>

          <div
            className="absolute flex items-center pointer-events-none z-10"
            style={{
              top: `${20 * scale}px`,
              left: `${(10 + 25 + 8) * scale}px`,
              height: `${25 * scale}px`,
            }}
          >
            <span
              className="font-bold leading-none"
              style={{ fontSize: `${16 * scale}px` }}
            >
              <span className="text-white">Pay</span>
              <span className="text-[#F63C44]">Mate</span>
            </span>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="flex-1 w-full flex flex-col items-center justify-start relative min-h-0 z-0">
          {/* Card Stack Area */}
          <div
            className="relative w-full flex justify-center shrink-0 z-20"
            style={{
              height: `${(CARD_HEIGHT + CARD_OVERLAP_OFFSET) * scale}px`,
            }}
          >
            {/* Primary Card */}
            <motion.div
              layout
              className="absolute flex justify-center cursor-pointer"
              initial={false}
              animate={{
                y: isFirstCardTop ? 0 : CARD_OVERLAP_OFFSET * scale,
                zIndex: isFirstCardTop ? 20 : 10,
              }}
              transition={springTransition}
              onClick={() => !isFirstCardTop && setIsFirstCardTop(true)}
            >
              <BankCard
                scale={scale}
                width={isFirstCardTop ? 245 : 235}
                backgroundImage={RedBankCard}
                balance="$58 529"
                cardNumber="2025  3562  8439  3826"
                cardHolder="Eddie Marshall"
                logoImage={FleecaImage}
              />
            </motion.div>

            {/* Secondary Card */}
            <motion.div
              layout
              className="absolute flex justify-center cursor-pointer"
              initial={false}
              animate={{
                y: !isFirstCardTop ? 0 : CARD_OVERLAP_OFFSET * scale,
                zIndex: !isFirstCardTop ? 20 : 10,
              }}
              transition={springTransition}
              onClick={() => isFirstCardTop && setIsFirstCardTop(false)}
            >
              <BankCard
                scale={scale}
                width={!isFirstCardTop ? 245 : 235}
                backgroundImage={GrayBankCard}
                balance="$12 400"
                cardNumber="4012  8832  1192  4451"
                cardHolder="John Doe"
                logoImage={FleecaImage}
              />
            </motion.div>
          </div>

          {/* Navigation Tabs */}
          <div
            className="w-full flex justify-center shrink-0 z-20 bg-app"
            style={{
              marginTop: `${10 * scale}px`,
              paddingBottom: `${10 * scale}px`,
            }}
          >
            <TabBar
              scale={scale}
              activeTab={activeTab}
              onTabChange={(selectedTab) => setActiveTab(selectedTab)}
            />
          </div>

          {/* Lists Container */}
          <div className="flex flex-col flex-1 w-full items-center justify-start min-h-0 relative">
            {/* Inline style for scrollbar hiding specific to this container */}
            <style>{`
              .hide-scrollbar::-webkit-scrollbar { display: none; }
              .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>

            <div
              className="flex flex-col overflow-y-auto hide-scrollbar"
              style={{
                width: `${245 * scale}px`,
                borderRadius: `${15 * scale}px`,
                paddingBottom: `${70 * scale}px`,
              }}
            >
              {/* Transactions Tab */}
              {activeTab === 'Latest Transactions' &&
                mockTransactions.map((tx, index) => (
                  <TransactionsItem
                    key={tx.id}
                    scale={scale}
                    mode="transaction"
                    title={tx.title}
                    subtitle={tx.subtitle}
                    amount={tx.amount}
                    time={tx.time}
                    type={tx.type}
                    imageUrl={tx.imageUrl}
                    iconClass={tx.iconClass}
                    isFirst={index === 0}
                    isLast={index === mockTransactions.length - 1}
                  />
                ))}

              {/* Bills Tab */}
              {activeTab === 'Bills' &&
                mockBills.map((bill, index) => (
                  <TransactionsItem
                    key={bill.id}
                    scale={scale}
                    mode="bill"
                    title={bill.title}
                    subtitle={bill.subtitle}
                    amount={bill.amount}
                    time={bill.time}
                    iconClass={bill.iconClass}
                    isFirst={index === 0}
                    isLast={index === mockBills.length - 1}
                    onAccept={() => handleAcceptBill(bill.id)}
                    onReject={() => handleRejectBill(bill.id)}
                  />
                ))}
            </div>
          </div>
        </div>

        {/* Bottom Deposit Bar Overlay */}
        <div
          className="absolute bottom-0 left-0 w-full z-10 flex justify-center pointer-events-none"
          style={{
            paddingBottom: `${20 * scale}px`,
            paddingLeft: `${10 * scale}px`,
            paddingRight: `${10 * scale}px`,
          }}
        >
          <div className="pointer-events-auto flex justify-center items-end w-full relative h-full">
            <DepositBar scale={scale} />
          </div>
        </div>
      </div>
    </div>
  );
}

PayMatePage.propTypes = {
  scale: PropTypes.number,
  onClose: PropTypes.func.isRequired,
};
