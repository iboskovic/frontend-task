import {
  isRejectedWithValue,
  Middleware,
  MiddlewareAPI,
} from "@reduxjs/toolkit";
import toastService from "../../../services/toastService";

export const rtkQueryErrorLogger: Middleware =
  (_api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      if (action.payload.data && action.payload.data.message) {
        toastService.error(action.payload.data.message);
      } else {
        toastService.error("Unhandled error.");
      }
    }

    return next(action);
  };
