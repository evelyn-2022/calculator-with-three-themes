import { ACTIONS } from './App';
const bigDecimal = require('js-big-decimal');

export const reducer = (state, { type, payload }) => {
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

      if (state.currentOperand === '0' && state.operation === '÷')
        return {
          ...state,
          currentOperand: 'ERROR',
          previousOperand: null,
          operation: null,
          overwrite: true,
        };

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

      if (state.currentOperand === '0' && state.operation === '÷')
        return {
          ...state,
          currentOperand: 'ERROR',
          previousOperand: null,
          operation: null,
          overwrite: true,
        };

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
      computation = bigDecimal.add(prev, current);
      break;
    case '-':
      computation = bigDecimal.subtract(prev, current);
      break;
    case '×':
      computation = bigDecimal.multiply(prev, current);
      break;
    case '÷':
      computation = bigDecimal.divide(prev, current);
  }
  return computation.toString();
};
