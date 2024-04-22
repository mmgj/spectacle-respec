import React, { useState, useEffect } from 'react';
import { Label, Card, Flex, Button } from '@sanity/ui';
import {
  LuClipboardList as ClipboardIcon,
  LuClipboardCheck as ClipboardCheckIcon,
} from 'react-icons/lu';
import { useCopyToClipboard } from 'usehooks-ts';

import { useStateValue } from '../lib/state';

const PaneLabel = ({ label, ...props }) => {
  const [clicked, setClicked] = useState(false);
  const [copiedText, copy] = useCopyToClipboard();
  const [{ query, params, result, projection }] = useStateValue();

  // TODO: Add projection to state so it can be copied here
  const strValues = {
    query,
    params,
    projection,
    result,
  };

  const handleCopy = (text) => {
    if (!text) return;
    if (label === 'result') {
      text = JSON.stringify(text, null, 2);
    }
    copy(text)
      .then(() => {
        console.log(`Copied ${text}`);
        setClicked(true);
      })
      .catch((error) => {
        console.error('Failed to copy!', error);
      });
  };

  useEffect(() => {
    if (clicked) {
      setTimeout(() => setClicked(false), 1000);
    }
  }, [clicked]);
  return (
    <Card padding={4} paddingBottom={1} {...props}>
      <Flex justify='space-between'>
        <Label size={4} muted>
          {label}
        </Label>
        {/* <Button
          fontSize={[1]}
          icon={clicked ? ClipboardCheckIcon : ClipboardIcon}
          padding={[2]}
          radius='full'
          mode='ghost'
          onClick={() => handleCopy(strValues[label])}
        /> */}
      </Flex>
    </Card>
  );
};

export default PaneLabel;
