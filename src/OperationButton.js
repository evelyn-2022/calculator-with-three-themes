import { ACTIONS } from './App';

export const OperationButton = ({ dispatch, operation, selector }) => {
  return (
    <div
      className={selector}
      onClick={() => {
        dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } });
      }}
    >
      {operation}
    </div>
  );
};
