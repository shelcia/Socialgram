/* eslint-disable indent */
// provider.js

import axios from "axios";
import { handleResponse, handleError } from "./response";
import { CYCLIC_BASE_URL } from "../api";
// import { LOCALHOST_URL } from "../api";

// Define your api url from any source.
// Pulling from your .env file when on the server or from localhost when locally
// const BASE_URL = LOCALHOST_URL;

const BASE_URL = CYCLIC_BASE_URL;

/** @param {string} resource */
const getAll = async (resource, signal, isAuthorized = false) => {
  const token = localStorage.getItem("Socialgram-Token");

  const headers = isAuthorized ? { "auth-token": token } : {};

  try {
    const response = await axios.get(`${BASE_URL}`, {
      signal,
      headers,
    });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

/** @param {string} resource */
/** @param {string} id */
/** @param {string} additionalParam */
const getSingle = async (
  resource,
  id,
  signal,
  additionalParam = "",
  isAuthorized = false
) => {
  const token = localStorage.getItem("Socialgram-Token");

  const headers = isAuthorized ? { "auth-token": token } : {};

  try {
    let response;
    if (additionalParam === "") {
      response = await axios.get(`${BASE_URL}/${resource}/${id}`, {
        signal,
        headers,
      });
    } else {
      // console.log(`${BASE_URL}/${resource}/${additionalParam}/${id}`);
      response = await axios.get(
        `${BASE_URL}/${resource}/${additionalParam}/${id}`,
        {
          signal,
          headers,
        }
      );
    }
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

/** @param {string} resource */
/** @param {string} params */
const getByParams = async (
  resource,
  signal,
  params,
  additionalParam = "",
  isAuthorized = false
) => {
  const token = localStorage.getItem("Socialgram-Token");

  const headers = isAuthorized ? { "auth-token": token } : {};

  try {
    let response;
    if (additionalParam === "") {
      response = await axios.get(`${BASE_URL}/${resource}`, {
        signal,
        headers,
        params,
      });
    } else {
      response = await axios.get(`${BASE_URL}/${resource}/${additionalParam}`, {
        signal,
        headers,
        params,
      });
    }
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

/** @param {string} resource */
/** @param {object} model */
const post = async (
  resource,
  model,
  additionalParam = "",
  isAuthorized = false
) => {
  // console.log({ model });
  const token = localStorage.getItem("Socialgram-Token");
  const headers = isAuthorized ? { "auth-token": token } : {};

  try {
    let response;
    if (additionalParam === "") {
      response = await axios.post(`${BASE_URL}/${resource}`, model, {
        headers,
      });
    } else {
      //   console.log(`${BASE_URL}/${additionalParam}`);
      response = await axios.post(
        `${BASE_URL}/${resource}/${additionalParam}`,
        model,
        {
          headers,
        }
      );
    }
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

/** @param {string} resource */
/** @param {object} model */

const postFormData = async (
  resource,
  model,
  additionalParam = "",
  isAuthorized = false
) => {
  const token = localStorage.getItem("Socialgram-Token");
  // console.log("invoked");
  const headers = isAuthorized
    ? {
        "Content-Type": "multipart/form-data",
        "auth-token": `${token}`,
      }
    : { "Content-Type": "multipart/form-data" };

  try {
    let response;
    if (additionalParam === "") {
      response = await axios.post(`${BASE_URL}/${resource}`, model, {
        headers,
      });
    } else {
      response = await axios.post(
        `${BASE_URL}/${resource}/${additionalParam}`,
        model,
        {
          headers,
        }
      );
    }
    // console.log(await response);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

/** @param {string} resource */
/** @param {object} model */
const put = async (resource, model, additionalParams, isAuthorized = false) => {
  const token = localStorage.getItem("Socialgram-Token");
  const headers = isAuthorized ? { "auth-token": token } : {};

  try {
    let response;
    if (additionalParams === "") {
      response = await axios.put(`${BASE_URL}/${resource}`, model, {
        headers,
      });
    } else {
      response = await axios.put(
        `${BASE_URL}/${resource}/${additionalParams}`,
        model,
        {
          headers,
        }
      );
    }

    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

/** @param {string} resource */
/** @param {object} model */
const putById = async (resource, id, model, signal) => {
  try {
    const response = await axios.put(`${BASE_URL}/${resource}/${id}`, model, {
      signal,
    });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

/** @param {string} resource */
/** @param {object} model */

const putFormData = async (
  resource,
  model,
  additionalParam = "",
  isAuthorized = false
) => {
  const token = localStorage.getItem("Socialgram-Token");
  // console.log("invoked");
  const headers = isAuthorized
    ? {
        "Content-Type": "multipart/form-data",
        "auth-token": `${token}`,
      }
    : { "Content-Type": "multipart/form-data" };

  try {
    let response;
    if (additionalParam === "") {
      response = await axios.put(`${BASE_URL}/${resource}`, model, {
        headers,
      });
    } else {
      response = await axios.put(
        `${BASE_URL}/${resource}/${additionalParam}`,
        model,
        {
          headers,
        }
      );
    }
    // console.log(await response);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

/** @param {string} resource */
/** @param {object} model */
const patch = async (resource, model, signal) => {
  const token = localStorage.getItem("Socialgram-Token");
  try {
    const response = await axios.patch(`${BASE_URL}/${resource}`, model, {
      signal,
      headers: {
        "auth-token": token,
      },
    });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

// has no body
/** @param {string} resource */
const patchByParams = async (
  resource,
  additionalParams,
  queryParams,
  isAuthorized = false
) => {
  const token = localStorage.getItem("Socialgram-Token");
  const headers = isAuthorized ? { "auth-token": token } : {};

  try {
    const request = axios.create({
      method: "PATCH",
      baseURL: `${BASE_URL}/${resource}/${additionalParams}?${queryParams}`,
      headers,
    });
    const response = await request.patch(null);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

/** @param {string} resource */
/** @param {string} id */
const remove = async (resource, id, additionalParams, isAuthorized = false) => {
  const token = localStorage.getItem("Socialgram-Token");
  const headers = isAuthorized ? { "auth-token": token } : {};

  // console.log(`${BASE_URL}/${resource}/${id}`);
  try {
    let response;
    if (additionalParams === "") {
      response = await axios.delete(`${BASE_URL}/${resource}/${id}`, {
        headers,
      });
    } else {
      response = await axios.delete(
        `${BASE_URL}/${resource}/${additionalParams}/${id}`,
        {
          headers,
        }
      );
    }
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

// eslint-disable-next-line import/prefer-default-export
export const apiProvider = {
  getAll,
  getSingle,
  getByParams,
  post,
  postFormData,
  put,
  putById,
  putFormData,
  patch,
  patchByParams,
  remove,
};
