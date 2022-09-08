import React, { useState, useReducer } from 'react';
import { DigitButton } from './DigitButton';
import { OperationButton } from './OperationButton';
import { reducer } from './reducer';
import { formatOperand } from './formatOperand';

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete digit',
  EVALUATE: 'evaluate',
};

const App = () => {
  const [themeNum, setThemeNum] = useState(0);
  const switchTheme = () => {
    let num = themeNum;
    num = (num + 1) % 3;
    setThemeNum(num);
  };

  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );

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
            <section className='screen'>
              {previousOperand && (
                <div className='previous-operand'>
                  {formatOperand(previousOperand)} {operation}
                </div>
              )}
              <div className='current-operand'>
                {formatOperand(currentOperand)}
              </div>
            </section>

            {/* Keyboard */}
            <section className='keypad'>
              <div className='row'>
                <DigitButton
                  selector='key number'
                  digit='7'
                  dispatch={dispatch}
                />
                <DigitButton
                  selector='key number'
                  digit='8'
                  dispatch={dispatch}
                />
                <DigitButton
                  selector='key number'
                  digit='9'
                  dispatch={dispatch}
                />
                <div
                  className='key del'
                  onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}
                >
                  del
                </div>
              </div>
              <div className='row'>
                <DigitButton
                  selector='key number'
                  digit='4'
                  dispatch={dispatch}
                />
                <DigitButton
                  selector='key number'
                  digit='5'
                  dispatch={dispatch}
                />
                <DigitButton
                  selector='key number'
                  digit='6'
                  dispatch={dispatch}
                />
                <OperationButton
                  selector='key operator'
                  operation='+'
                  dispatch={dispatch}
                />
              </div>
              <div className='row'>
                <DigitButton
                  selector='key number'
                  digit='1'
                  dispatch={dispatch}
                />
                <DigitButton
                  selector='key number'
                  digit='2'
                  dispatch={dispatch}
                />
                <DigitButton
                  selector='key number'
                  digit='3'
                  dispatch={dispatch}
                />
                <OperationButton
                  selector='key operator'
                  operation='-'
                  dispatch={dispatch}
                />
              </div>
              <div className='row'>
                <DigitButton selector='key dot' digit='.' dispatch={dispatch} />
                <DigitButton
                  selector='key number'
                  digit='0'
                  dispatch={dispatch}
                />
                <OperationButton
                  selector='key operator'
                  operation='÷'
                  dispatch={dispatch}
                />
                <OperationButton
                  selector='key operator'
                  operation='×'
                  dispatch={dispatch}
                />
              </div>
              <div className='last-row'>
                <div
                  className='key reset'
                  onClick={() => dispatch({ type: ACTIONS.CLEAR })}
                >
                  reset
                </div>
                <div
                  className='key equal'
                  onClick={() => {
                    dispatch({ type: ACTIONS.EVALUATE });
                  }}
                >
                  =
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

export default App;
