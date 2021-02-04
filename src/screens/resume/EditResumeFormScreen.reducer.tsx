import { takeLatest, call, put, delay } from "redux-saga/effects";
import * as WebBrowser from "expo-web-browser";
import API from "src/API";

import initialData from "src/assets/resume-data.json";

const BASE_EXPERIENCE_DATA = {
  city: "",
  note: null,
  company: "",
  country: "",
  current: false,
  endDate: ["01", "2018"],
  startDate: ["05", "2016"],
  description: "",
  presentValue: "present",
};

function* pollPDFTask(cvId) {
  yield put({ type: "SUBMIT_UPDATE", message: "Generating PDF..." });
  yield delay(6000);

  while (true) {
    try {
      const respData = yield call(API.getPDFUrl, cvId);
      const { url } = respData;
      console.log(respData);
      if (url) {
        yield put({
          type: "SUBMIT_SUCCESS",
          url,
        });
        yield call(WebBrowser.openBrowserAsync, url);
        break;
      }

      yield delay(2000);
    } catch (e) {
      console.error(e);
    }
  }
}

function* submitSaga(action) {
  try {
    let respData = yield call(API.createCV);
    const { id } = respData;

    initialData.cv.sections[0].data.entries = action.data.workExperiences.map(
      (experience) => ({ ...BASE_EXPERIENCE_DATA, ...experience })
    );
    respData = yield call(API.updateCV, id, {
      ...initialData,
    });

    yield call(pollPDFTask, id);
  } catch (error) {
    yield put({ type: "FETCH_ERROR" });
  }
}

export function* saga() {
  console.log("saga");
  yield takeLatest("SUBMIT", submitSaga);
}

export function reducer(state, action) {
  switch (action.type) {
    case "SUBMIT":
      return { submitting: true, submissionStateMessage: "Creating CV..." };
      break;

    case "SUBMIT_UPDATE":
      return { ...state, submissionStateMessage: action.message };
      break;

    case "SUBMIT_SUCCESS":
      return { ...state, submitting: false, submissionStateMessage: "" };
      break;

    default:
      return state;
      break;
  }
}
