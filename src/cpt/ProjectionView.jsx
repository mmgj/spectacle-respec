import React from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { Card, Flex, Box, Code, Spinner } from '@sanity/ui';

import PaneLabel from './PaneLabel';
import { useStateValue } from '../lib/state';

const ResultView = ({ label = 'Result' }) => {
  const [{ result, loading }] = useStateValue();
  return (
    <Card height='fill'>
      {label && <PaneLabel label={label} />}
      <Box padding={4} style={{ overflow: 'auto' }}>
        {loading ? (
          <Card padding={4} height='fill' style={{ width: '100%' }}>
            <Flex justify='center'>
              <Spinner muted />
            </Flex>
          </Card>
        ) : (
          <>
            {result && (
              <Card>
                <ul>
                  {result.map((item) => (
                    <li key={JSON.stringify(item)} padding={3} type='none'>
                      <pre style={{ fontSize: '1.1em' }}>{item?.spectate}</pre>
                    </li>
                  ))}
                </ul>
              </Card>
            )}
          </>
        )}
      </Box>
    </Card>
  );
};

export default ResultView;
