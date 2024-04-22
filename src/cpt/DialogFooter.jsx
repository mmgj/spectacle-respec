import React from 'react';
import { Flex, Card, Text } from '@sanity/ui';

const DialogFooter = () => {
  return (
    <Flex justify='center' align='center'>
      <Card padding={[2, 2, 3]}>
        <Text size={1} style={{ marginBottom: 5 }}>
          Made with <span style={{ color: 'red' }}>♥</span> &{' '}
          <a href='https://sanity.io/ui'>Sanity UI</a>
        </Text>
      </Card>
    </Flex>
  );
};

export default DialogFooter;
