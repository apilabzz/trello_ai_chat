import React, { useEffect } from 'react';
import PowerUp from './components/PowerUp';

function App() {
  useEffect(() => {
    window.TrelloPowerUp.initialize({
      'board-buttons': function(t, options) {
        return [{
          icon: {
            dark: 'https://trellochat.netlify.app/chatbot.png',
            light: 'https://trellochat.netlify.app/chatbot.png'
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