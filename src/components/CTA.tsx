import { ReactNode } from 'react';

export const CTA = ({
  first,
  second,
}: {
  first: ReactNode;
  second: ReactNode;
}) => {
  return (
    <div className="flex gap-4">
      {first}
      {second}
    </div>
  );
};
