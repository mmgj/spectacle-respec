import React from 'react';
import SplitPane from 'react-split-pane';

const SwitchPane = ({ children, sidebar = false, theme }) => {
  return sidebar ? (
    <SplitPane defaultSize={'25vw'} primary='first'>
      {children[0]}
      <div
        style={{
          borderLeft: `.20px solid ${
            theme == 'dark' ? '#cccccc55' : '#00000055'
          }`,
          height: '100%',
          overflowX: 'hidden',
        }}
      >
        {sidebar && children[1]}
      </div>
    </SplitPane>
  ) : (
    <>{children[0]}</>
  );
};

export default SwitchPane;
