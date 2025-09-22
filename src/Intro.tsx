import { ImportComponents } from './components/ImportComponents';
import { CustomizeComponents } from './components/CustomizeComponents';
import { CopyPasteBlocks } from './components/CopyPasteBlocks';
import { useId, useState } from 'react';
import { SfTextarea } from '@storefront-ui/react';

function Intro() {
  const labelId = useId();
  const [rating, setRating] = useState(0);

  return (
    <div className="my-6 w-10/12 m-auto">
      <ImportComponents />
      <CustomizeComponents />
      <CopyPasteBlocks />
    </div>
  );
}

export default Intro;
