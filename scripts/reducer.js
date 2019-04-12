// Typical Redux-like reducer here ...
export const reducer = (action, state) => {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        ...action.payload,
        loading: true,
        error: false,
      };
    case "SUCCESS":
      return {
        ...state,
        ...action.payload,
        loading: false,
        error: false
      };
    case "ERROR":
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};
