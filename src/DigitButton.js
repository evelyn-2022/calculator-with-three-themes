import { ACTIONS } from './App';

export const DigitButton = ({ dispatch, digit, selector }) => {
  return (
    <div
      className={selector}
      onClick={() => {
        dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } });
      }}
    >
      {digit}
    </div>
  );
};
