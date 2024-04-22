import React, { useState, useCallback } from 'react';
import { Card, usePrefersDark, useGlobalKeyDown } from '@sanity/ui';
import CodeEditor from '@uiw/react-textarea-code-editor';
import isHotkey from 'is-hotkey';

import { useStateValue } from '../lib/state';
import { loadData } from '../lib/sanity';

import PaneLabel from './PaneLabel';

export default function Editor({ label }) {
  const [{ query, params, dataset, apiVersion, projectId }, dispatch] =
    useStateValue();
  const prefersDark = usePrefersDark();

  const handleGlobalKeyDown = useCallback((event) => {
    // TODO: Figure out how to block input in editors on hotkey
    if (isHotkey('mod+return', event)) {
      event.preventDefault();
      event.stopPropagation();
      loadData({ query, params, dataset, apiVersion, projectId, dispatch });
      return false;
    }
  }, []);

  return (
    <Card height='fill'>
      {label && <PaneLabel label={label} />}
      <CodeEditor
        value={label == 'query' ? query : params}
        language='js'
        placeholder='GROQ query...'
        onKeyDown={handleGlobalKeyDown}
        onChange={(evn) =>
          dispatch({
            type: label == 'query' ? 'setQuery' : 'setParams',
            payload: evn.target.value,
          })
        }
        padding={15}
        data-color-mode={prefersDark ? 'dark' : 'light'}
        style={{
          backgroundColor: prefersDark ? '#13141a' : '#fff',
          height: '100%',
          fontSize: '1em',
          // padding: '.5em',
          fontFamily:
            'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
        }}
      />
    </Card>
  );
}
