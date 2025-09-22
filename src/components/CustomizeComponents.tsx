import {
  SfAccordionItem,
  SfButton,
  SfIconCheck,
  SfIconDelete,
  SfLoaderCircular,
  SfIconChevronLeft,
  SfLink,
  SfIconArrowForward,
} from '@storefront-ui/react';
import classNames from 'classnames';
import { useState } from 'react';
import { CTA } from './CTA';

const accordionItem = {
  id: 'acc-1',
  summary: 'Where is my order?',
  details:
    'We will inform you about the expected delivery time of your order in checkout and in your order confirmation email.',
};

const AccordionSummary = ({ isOpen }: { isOpen: (id: string) => boolean }) => (
  <div className="flex justify-between !bg-green-500 rounded-t p-4 !text-white font-medium hover:!bg-green-600 hover:!text-white active:neutral-100">
    <p>{accordionItem.summary}</p>
    <SfIconChevronLeft
      className={classNames('text-white', {
        'rotate-90': isOpen('0'),
        '-rotate-90': !isOpen('0'),
      })}
    />
  </div>
);

export const CustomizeComponents = () => {
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  const handleClick = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 5000);
  };

  const isOpen = (id: string) => id === active;

  const handleToggle = (id: string) => (open: boolean) => {
    if (open) {
      setActive(id);
    } else if (isOpen(id)) {
      setActive(null);
    }
  };

  return (
    <div className="border-t p-4">
      <div className="flex flex-col justify-center items-center gap-4 p-4">
        <p className="typography-headline-3">Customize them</p>
        <div className="flex gap-10">
          <CTA
            first={
              <SfButton
                type="button"
                size="lg"
                variant="secondary"
                disabled={loading}
                onClick={handleClick}
                slotPrefix={
                  loading ? <SfLoaderCircular size="sm" /> : <SfIconDelete />
                }
                className="ring-red-400 !text-gray-800 rounded-none hover:bg-red-100 hover:!text-gray-600 hover:ring-red-400 active:bg-red-600 active:!text-gray-50 active:ring-red-400 disabled:!ring-gray-600 disabled:!bg-gray-100"
              >
                {loading ? 'Clearing...' : 'Clear Cart'}
              </SfButton>
            }
            second={
              <SfButton
                type="button"
                size="lg"
                className="!bg-blue-500 text-white rounded-none ring-0 hover:!bg-blue-700 hover:text-white active:!bg-blue-600 active:!text-gray-50"
                slotSuffix={<SfIconArrowForward />}
              >
                Checkout
              </SfButton>
            }
          />
        </div>
      </div>
      <SfAccordionItem
        className="w-full m-auto md:w-3/4"
        summary={<AccordionSummary isOpen={isOpen} />}
        onToggle={handleToggle('0')}
        open={isOpen('0')}
      >
        <div className="flex flex-col gap-4 bg-green-50 py-2 px-4">
          {accordionItem.details}
          <SfLink href="#" variant="primary" className="!text-blue-500">
            Click for more information
          </SfLink>
        </div>
      </SfAccordionItem>
    </div>
  );
};
