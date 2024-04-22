import React, { useState } from 'react';
import { BsEyeglasses as SpectacleIcon } from 'react-icons/bs';
import {
  CogIcon as SettingsIcon,
  RobotIcon as DebugIcon,
  PanelRightIcon as ProjectionIcon,
  HelpCircleIcon as HelpIcon,
} from '@sanity/icons';
import { Text, Stack, Card, Flex, Button, Dialog, Heading } from '@sanity/ui';
import { useStateValue } from '../lib/state';
import SettingsDialog from './SettingsDialog';
import HelpDialog from './HelpDialog';
import { CONSTANTS } from '../lib/utils';

const TopBar = () => {
  const [
    {
      debugMode,
      dataset,
      projectId,
      result,
      leftSidebar,
      aboutOpen,
      configOpen,
    },
    dispatch,
  ] = useStateValue();

  // Local override for debug mode
  const allowDebug = debugMode && false;

  return (
    <Card
      borderBottom={1}
      style={{
        margin: '0 -6px',
        height: `${CONSTANTS.topbarHeight}vh`,
      }}
    >
      <Flex justify='space-between' align='center' padding={[1, 2, 3]}>
        <Flex justify='flex-start' align='center'>
          <SpectacleIcon
            size={34}
            style={{ margin: '0 20px 0 15px' }}
            title='Spectacular'
          />
          <Button
            mode='bleed'
            tone='default'
            padding={4}
            icon={
              <Text muted>
                <em>
                  {`${dataset}`}
                  <span style={{ color: '#ccc' }}>@</span>
                  {`${projectId}`}
                </em>
              </Text>
            }
            onClick={() => dispatch({ type: 'setConfigOpen', payload: true })}
          />
        </Flex>
        <Flex justify='flex-end' align='center'>
          {allowDebug && (
            <Button
              fontSize={[2, 2, 3]}
              icon={<DebugIcon />}
              mode='bleed'
              padding={[2, 2, 3]}
              title='Settings'
              onClick={() => console.log('YOLO')}
            />
          )}
          <Button
            title='Spectate'
            fontSize={[2, 2, 3]}
            icon={<ProjectionIcon />}
            mode='bleed'
            padding={[2, 2, 3]}
            onClick={() =>
              dispatch({
                type: 'setLeftSidebar',
                payload: !leftSidebar,
              })
            }
          />
          <Button
            fontSize={[2, 2, 3]}
            icon={<SettingsIcon />}
            mode='bleed'
            padding={[2, 2, 3]}
            title='Settings'
            onClick={() => dispatch({ type: 'setConfigOpen', payload: true })}
          />
          <Button
            fontSize={[2, 2, 3]}
            icon={<HelpIcon />}
            mode='bleed'
            padding={[2, 2, 3]}
            title='Help'
            onClick={() => dispatch({ type: 'setAboutOpen', payload: true })}
          />
        </Flex>
      </Flex>
      {configOpen && <SettingsDialog />}
      {aboutOpen && <HelpDialog />}
    </Card>
  );
};

export default TopBar;
