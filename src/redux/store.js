import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { rootReducer } from "./reducers";

const logger = createLogger();

const configureStore = () => {
  const store = createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware, logger)
  );
  return store;
};

export default configureStore;
