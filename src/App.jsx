import React, { useEffect } from 'react';
import { studioTheme, ThemeProvider, usePrefersDark } from '@sanity/ui';
import { StateInspector } from 'reinspect';
import { StateProvider } from './lib/state';
import SpectacleApp from './cpt/SpectacleApp';
import './App.css';

function SpecsApp() {
  const prefersDark = usePrefersDark();
  const scheme = prefersDark ? 'dark' : 'light';

  return (
    <StateInspector name='everything'>
      <StateProvider>
        <ThemeProvider theme={studioTheme} scheme={scheme}>
          <SpectacleApp theme={scheme} />
        </ThemeProvider>
      </StateProvider>
    </StateInspector>
  );
}

export default SpecsApp;
