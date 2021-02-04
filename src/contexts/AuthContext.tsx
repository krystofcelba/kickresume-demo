import React, { useReducer } from "react";

type Action = { type: "SET_AUTH_TOKEN"; authToken: string };
type Dispatch = (action: Action) => void;
type State = { authToken: string | undefined };

let reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_AUTH_TOKEN":
      return { ...state, authToken: action.authToken };
    default:
      return { ...state };
  }
};
const initialState = { authToken: undefined };

const AuthStateContext = React.createContext<State | undefined>(undefined);
const AuthDispatchContext = React.createContext<Dispatch | undefined>(
  undefined
);

function AuthProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {props.children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
}

function useAuthState() {
  const context = React.useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error("useAuthState must be used within a AuthProvider");
  }
  return context;
}

function useAuthDispatch() {
  const context = React.useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error("useAuthDispatch must be used within a AuthProvider!");
  }
  return context;
}

function useAuthContext() {
  return [useAuthState(), useAuthDispatch()];
}
export { AuthProvider, useAuthContext, useAuthState, useAuthDispatch };
