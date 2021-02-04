import { Platform } from "react-native";

export const isAndroid = () => Platform.OS === "android";

export function errorToAlertMessage(error) {
  const errorData = error.response.data;
  const errorMessage = Object.keys(errorData).reduce((message, key) => {
    console.log(errorData[key]);
    return `${message}${errorData[key].reduce(
      (e: string, c: string) => `${e}${c}`
    )}\n`;
  }, "");

  return errorMessage;
}
