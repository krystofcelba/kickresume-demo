import axios from "axios";
import { Constants } from "src/assets";

const APIClient = axios.create({
  baseURL: Constants.baseURL,
});

function setAuthHeaders(authToken?: string) {
  APIClient.defaults.headers.common.Authorization = authToken
    ? `Token ${authToken}`
    : undefined;
}

async function register(data) {
  const resp = await axios({
    method: "post",
    url: `${Constants.baseURL}/register/`,
    data,
  });

  return resp.data;
}

async function login(data) {
  const resp = await axios({
    method: "post",
    url: `${Constants.baseURL}/auth-token/`,
    data,
  });

  return resp.data.token;
}

async function createCV() {
  console.log("create");
  const resp = await APIClient.post(
    "/resumes/"
  );

  return resp.data;
}

async function updateCV(cv_id, data) {
  console.log("create");
  const resp = await APIClient.put(
    `/cvs/${cv_id}/`,
    data
  );

  return resp.data;
}

async function getPDFUrl(cv_id) {
  console.log("getting pdf");
  const resp = await APIClient.get(
    `/cvs/${cv_id}/pdf/`
  );

  return resp.data;
}

export default {
  register,
  login,
  setAuthHeaders,
  createCV,
  updateCV,
  getPDFUrl,
};
