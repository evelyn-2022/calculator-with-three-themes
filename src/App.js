import React, { useState } from 'react';

const App = () => {
  const [themeNum, setThemeNum] = useState(0);
  const [screen, setScreen] = useState(0);

  const switchTheme = () => {
    let num = themeNum;
    num = (num + 1) % 3;
    setThemeNum(num);
  };

  return (
    <main>
      <div className={`body theme-${themeNum}`}>
        <div className='grid-wrapper'>
          <div className='container'>
            {/* Heading */}
            <section className='heading'>
              <h1>calc</h1>
              <div className='theme-switch-container'>
                <div className='caption'>theme</div>
                <div className='theme-switch'>
                  <div className='theme-num'>
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                  </div>
                  <div className='theme-switch-bg' onClick={switchTheme}>
                    <div className='theme-switch-btn'></div>
                  </div>
                </div>
              </div>
            </section>

            {/* Screen */}
            <section className='screen'>{screen}</section>

            {/* Keyboard */}
            <section className='keypad'>
              <div className='row'>
                <div className='key number'>
                  <span>7</span>
                </div>
                <div className='key number'>8</div>
                <div className='key number'>9</div>
                <div className='key del'>del</div>
              </div>
              <div className='row'>
                <div className='key number'>4</div>
                <div className='key number'>5</div>
                <div className='key number'>6</div>
                <div className='key operator'>+</div>
              </div>
              <div className='row'>
                <div className='key number'>1</div>
                <div className='key number'>2</div>
                <div className='key number'>3</div>
                <div className='key operator'>-</div>
              </div>
              <div className='row'>
                <div className='key dot'>.</div>
                <div className='key number'>0</div>
                <div className='key operator'>/</div>
                <div className='key operator'>x</div>
              </div>
              <div className='last-row'>
                <div className='key reset'>reset</div>
                <div className='key equal'>=</div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

export default App;
