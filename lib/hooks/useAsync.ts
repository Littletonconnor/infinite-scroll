import React from "react";

interface Action {
  data?: any;
  error?: any;
  type: "pending" | "resolved" | "rejected";
}

function asyncReducer(state: any, action: Action) {
  switch (action.type) {
    case "pending":
      return {
        status: "pending",
        data: state.data,
        error: state.error,
      };
    case "resolved":
      return {
        status: "resolved",
        data: [...state.data, ...action.data.results],
        error: state.error,
      };
    case "rejected":
      return {
        status: "rejected",
        data: [],
        error: action.error,
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

export default function useAsync(initialState?: {
  status?: string;
  data?: unknown;
  error?: unknown;
}) {
  const [state, dispatch] = React.useReducer(asyncReducer, {
    status: "idle",
    data: null,
    error: null,
    ...initialState,
  });

  const { data, error, status } = state;

  const run = React.useCallback((promise) => {
    dispatch({ type: "pending" });
    promise.then(
      (data: any) => dispatch({ type: "resolved", data }),
      (error: any) => dispatch({ type: "rejected", error })
    );
  }, []);

  return {
    data,
    error,
    status,
    run,
  };
}
