import React, { useState, useCallback } from 'react';
import SplitPane, { Pane } from 'react-split-pane';
import {
  Card,
  Button,
  Spinner,
  usePrefersDark,
  useGlobalKeyDown,
} from '@sanity/ui';
import { PlayIcon } from '@sanity/icons';
import isHotkey from 'is-hotkey';

import { useStateValue } from '../lib/state';
import { CONSTANTS } from '../lib/utils';
import { loadData } from '../lib/sanity';

import SwitchPane from './SwitchPane';
import Editor from './Editor';
import ResultView from './ResultView';
import ProjectionView from './ProjectionView';
import TopBar from './TopBar';

function SpectacleApp({ theme }) {
  const [
    { leftSidebar, loading, dataset, apiVersion, projectId, query, params },
    dispatch,
  ] = useStateValue();

  function doLoadData() {
    loadData({
      loading,
      dataset,
      apiVersion,
      projectId,
      dispatch,
      query,
      params,
    });
  }

  const handleGlobalKeyDown = useCallback((event) => {
    // TODO: Figure out how to block input in editors on hotkey
    if (isHotkey('mod+return', event)) {
      event.preventDefault();
      event.stopPropagation();
      loadData({ query, params, dataset, apiVersion, projectId, dispatch });
      return false;
    }
  }, []);
  useGlobalKeyDown(handleGlobalKeyDown);

  return (
    <main
      className='app'
      data-theme={theme}
      tabIndex={0}
      onKeyDown={handleGlobalKeyDown}
    >
      <TopBar />
      <div>
        <SplitPane
          className='outer-panes'
          split='vertical'
          minSize={150}
          defaultSize={parseInt(localStorage.getItem('splitPos'), 10)}
          onChange={(size) => localStorage.setItem('splitPos', size)}
          style={{
            height: `calc(${100 - CONSTANTS.topbarHeight}vh - ${
              CONSTANTS.adjustHeight
            }px)`,
          }}
        >
          <section className='query-param-wrap'>
            <SplitPane
              split='horizontal'
              minSize={150}
              defaultSize={'60%'}
              className='query-param-panes'
            >
              <Pane
                initialSize='60%'
                minSize='200'
                maxSize='90%'
                className='query-pane'
              >
                <Editor label='query' />
              </Pane>
              <Pane
                initialSize='40%'
                minSize='200'
                maxSize='90%'
                className='param-pane'
              >
                <Editor label='params' />
              </Pane>
            </SplitPane>
            <Card
              flex={1}
              borderTop={1}
              style={{
                position: 'absolute',
                bottom: 0,
                padding: 20,
                width: '100%',
                boxSizing: 'border-box',
              }}
            >
              <Button
                fontSize={[2, 2, 3]}
                icon={
                  loading ? (
                    <div style={{ marginTop: 7, width: 27 }}>
                      <Spinner />
                    </div>
                  ) : (
                    <div style={{ width: 17 }}>
                      <PlayIcon />
                    </div>
                  )
                }
                disabled={loading}
                mode={theme?.sanity?.color?.dark ? 'ghost' : 'default'}
                tone={theme?.sanity?.color?.dark ? 'default' : 'primary'}
                padding={[1, 2, 3]}
                text={'Fetch'}
                onClick={doLoadData}
              />
            </Card>
          </section>
          <section className='result-projection-wrap'>
            <SwitchPane sidebar={leftSidebar} theme={theme}>
              <Pane
                className='result-pane'
                style={{
                  overflow: 'scroll',
                  height: `calc(${100 - CONSTANTS.topbarHeight}vh - ${
                    CONSTANTS.adjustHeight
                  }px)`,
                }}
              >
                <ResultView label='result' theme={theme} />
              </Pane>
              {leftSidebar ? (
                <Pane
                  className='projection-pane'
                  style={{
                    overflow: 'scroll',
                    height: `calc(${100 - CONSTANTS.topbarHeight}vh - ${
                      CONSTANTS.adjustHeight
                    }px)`,
                  }}
                >
                  <ProjectionView label='projection' />
                </Pane>
              ) : (
                <></>
              )}
            </SwitchPane>
          </section>
        </SplitPane>
      </div>
    </main>
  );
}

export default SpectacleApp;
