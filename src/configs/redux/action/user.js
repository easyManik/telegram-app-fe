import axios from "axios";

const registerRequest = () => {
  return { type: "REGISTER_REQUEST" };
};

const registerSuccess = (data) => {
  return { type: "REGISTER_SUCCESS", payload: data };
};

const registerFailure = (error) => {
  return { type: "REGISTER_FAILURE", payload: error };
};

export const register = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    const Url = "http://localhost:4000/";
    dispatch(registerRequest());
    axios
      .post(`${Url}users/register`, data)
      .then((res) => {
        dispatch(registerSuccess(res.data.data));
        resolve(res.data.message);
      })
      .catch((err) => {
        dispatch(registerFailure(err.response.data.message));
        reject(new Error(err.response.data.message));
      });
  });
};

export const login = (data, navigate) => (dispatch) => {
  return new Promise((resolve, reject) => {
    const Url = process.env.REACT_APP_TEKTOK_API;
    axios
      .post(`${Url}users/login`, data)
      .then((res) => {
        dispatch({ type: "LOGIN", payload: res.data.data });
        // localStorage.setItem("id", res.data.data.id)
        localStorage.setItem("username", res.data.data.email);
        localStorage.setItem("token", res.data.data.token);

        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const userProfile = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem("token");
    const Url = process.env.REACT_APP_TEKTOK_API;
    axios
      .get(`${Url}users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        resolve(res.data.data);
      });
  });
};

export const getUser = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    const Url = process.env.REACT_APP_TEKTOK_API;
    axios
      .get(`${Url}users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: "GET_USER",
          payload: res.data.data,
        });
      });
  };
};

export const update = (data) => (dispatch) => {
  const token = localStorage.getItem("token");
  return new Promise((resolve, reject) => {
    const Url = process.env.REACT_APP_TEKTOK_API;
    axios
      .put(`${Url}users/update`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        resolve(res.data.message);
      })
      .catch((err) => {
        reject(new Error(err.response.data.message));
      });
  });
};
