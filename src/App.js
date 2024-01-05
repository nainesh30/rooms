// trial commit.
import './App.css';
import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import WebApp from './WebApp';
import MobApp from './Mobapp';
function App() {
  const isMobile = useMediaQuery({ maxWidth: 920 });
  const [platform, setPlatform] = useState('web');

  useEffect(() => {
    setPlatform(isMobile ? 'mobile' : 'web');
  }, [isMobile]);

  return (


    <div>
      {platform === 'web' && <WebApp />}
      {platform === 'mobile' && <MobApp />}
    </div>


  );
}

export default App;
