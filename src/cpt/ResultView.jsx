import React from 'react';
import { Card, Flex, Box, Spinner, usePrefersDark } from '@sanity/ui';
import ReactJson from 'react-json-view';

import { useStateValue } from '../lib/state';

import PaneLabel from './PaneLabel';

const ResultView = ({ label = 'Result', theme }) => {
  const [{ result, loading }] = useStateValue();
  return (
    <Card height='fill'>
      {label && <PaneLabel label={label} />}
      <Box padding={4} style={{ overflow: 'auto', overflowX: 'hidden' }}>
        {loading ? (
          <Card padding={4} height='fill' style={{ width: '100%' }}>
            <Flex justify='center'>
              <Spinner muted />
            </Flex>
          </Card>
        ) : (
          <>
            {result && (
              <ReactJson
                collapseStringsAfterLength={false}
                displayDataTypes={false}
                theme={
                  theme === 'dark' ? 'summerfruit' : 'summerfruit:inverted'
                }
                name={null}
                src={result}
              />
            )}
          </>
        )}
      </Box>
    </Card>
  );
};

export default ResultView;
