import React, { useEffect } from 'react';
import PowerUp from './components/PowerUp';

function App() {
  useEffect(() => {
    window.TrelloPowerUp.initialize({
      'board-buttons': function(t, options) {
        return [{
          icon: {
            dark: 'https://firebasestorage.googleapis.com/v0/b/unlimited-apis.appspot.com/o/applicationFiles%2Fpowerups%2Fchatbot.png?alt=media&token=977eec6d-abb3-4492-8f9d-c8acdef65ca8',
            light: 'https://firebasestorage.googleapis.com/v0/b/unlimited-apis.appspot.com/o/applicationFiles%2Fpowerups%2Fchatbot.png?alt=media&token=977eec6d-abb3-4492-8f9d-c8acdef65ca8'
          },
          text: 'Ask Trello',
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