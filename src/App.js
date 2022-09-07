import React, { useState, useReducer } from 'react';
import { DigitButton } from './DigitButton';
import { OperationButton } from './OperationButton';

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete digit',
  EVALUATE: 'evaluate',
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return { ...state, currentOperand: payload.digit, overwrite: false };
      }

      if (payload.digit === '0' && state.currentOperand === '0') return state;
      if (payload.digit !== '0' && state.currentOperand === '0')
        return { ...state, currentOperand: payload.digit };
      if (payload.digit === '.' && state.currentOperand == null)
        return { ...state, currentOperand: '0.' };
      if (payload.digit === '.' && state.currentOperand.includes('.'))
        return state;
      return {
        ...state,
        currentOperand: `${state.currentOperand || ''}${payload.digit}`,
      };

    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) {
        return state;
      }

      if (state.currentOperand == null) {
        return { ...state, operation: payload.operation };
      }

      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      }
      return {
        ...state,
        operation: payload.operation,
        previousOperand: evaluate(state),
        currentOperand: null,
      };

    case ACTIONS.CLEAR:
      return {};

    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite)
        return { ...state, currentOperand: null, overwrite: false };
      if (state.currentOperand == null) return state;
      if (state.currentOperand.length === 1)
        return { ...state, currentOperand: null };
      return { ...state, currentOperand: state.currentOperand.slice(0, -1) };

    case ACTIONS.EVALUATE:
      if (
        state.operation == null ||
        state.currentOperand == null ||
        state.previousOperand == null
      ) {
        return state;
      }

      return {
        ...state,
        overwrite: true,
        operation: null,
        previousOperand: null,
        currentOperand: evaluate(state),
      };
  }
};

const evaluate = ({ currentOperand, previousOperand, operation }) => {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);

  if (isNaN(prev) || isNaN(current)) return '';

  let computation = '';

  switch (operation) {
    case '+':
      computation = prev + current;
      break;
    case '-':
      computation = prev - current;
      break;
    case '×':
      computation = prev * current;
      break;
    case '÷':
      computation = prev / current;
  }

  return computation.toString();
};

const INTEGER_FORMATTER = new Intl.NumberFormat('en-us', {
  maximumFractionDigits: 0,
});

const formatOperand = operand => {
  if (!operand) return;
  const [integer, decimal] = operand.split('.');
  if (decimal == null) return INTEGER_FORMATTER.format(integer);
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
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

  // dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: 1 } });

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
              <div className='previous-operand'>
                {formatOperand(previousOperand)} {operation}
              </div>
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
