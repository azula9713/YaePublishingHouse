import React from 'react';
import {RecoilRoot} from 'recoil';

import Navigation from './navigation/Navigation';

function App(): React.JSX.Element {
  return (
    <RecoilRoot>
      <Navigation />
    </RecoilRoot>
  );
}

export default App;
