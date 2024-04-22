import React from 'react';
import { Dialog, Card, Flex, Text, Heading, Code } from '@sanity/ui';
import { defaultExample, useStateValue } from '../lib/state';
import DialogFooter from './DialogFooter';

const HelpDialog = () => {
  const [{ aboutOpen }, dispatch] = useStateValue();
  return (
    <Dialog
      header='About'
      footer={<DialogFooter />}
      id='dialog-about'
      onClose={() => dispatch({ type: 'setAboutOpen', payload: false })}
      onClickOutside={() => dispatch({ type: 'setAboutOpen', payload: false })}
      zOffset={1000}
      width={1}
    >
      <Card padding={[3, 3, 4]}>
        <Heading style={{ margin: '0 0 1em 0' }}>Help</Heading>
        <Text size={3} margin={3}>
          Create a projection named "spectate" in your query, and it'll show up
          in the third pane. E.g.:
          <Card marginTop={2}>
            <Code>
              <pre style={{ padding: 5 }}>{defaultExample}</pre>
            </Code>
          </Card>
        </Text>
      </Card>
    </Dialog>
  );
};

export default HelpDialog;
