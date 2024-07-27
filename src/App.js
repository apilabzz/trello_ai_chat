import React, { useEffect } from 'react';
import PowerUp from './components/PowerUp';

function App() {
  useEffect(() => {
    window.TrelloPowerUp.initialize({
      'board-buttons': function(t, options) {
        return [{
          icon: {
            dark: 'https://firebasestorage.googleapis.com/v0/b/unlimited-apis.appspot.com/o/applicationFiles%2Fpowerups%2Ficons8-chat%20(1).gif?alt=media&token=9b0ebea8-8520-4605-b5ec-ab8541ab1f56',
            light: 'https://firebasestorage.googleapis.com/v0/b/unlimited-apis.appspot.com/o/applicationFiles%2Fpowerups%2Ficons8-chat%20(1).gif?alt=media&token=9b0ebea8-8520-4605-b5ec-ab8541ab1f56'
          },
          text: 'AI Chat',
          callback: function(t) {
            return t.popup({
              title: 'AI Chat Assistant',
              url: t.signUrl('./index.html'),
              width: 340,
              height: 400,
            });
          }
        }];
      }
    });
  }, []);

  return (
    <div className="App">
      <PowerUp />
    </div>
  );
}

export default App;