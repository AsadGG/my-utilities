import ky from "ky";
import { RefreshResponse, User } from "../types/App.types";
import HTTP_STATUS from "./http-status";
import { getItem, removeItem, setItem } from "./local-storage";

const instance = ky.create({
  hooks: {
    beforeRequest: [
      (request) => {
        const user = getItem<User>("USER");
        if (user) {
          request.headers.set("Authorization", "Bearer " + user.accessToken);
        }
        return request;
      },
    ],
    afterResponse: [
      async (input, options, response) => {
        if (response.status === HTTP_STATUS.UNAUTHORIZED) {
          try {
            const refreshResponse = await refreshUser();
            if (refreshResponse.statusCode === HTTP_STATUS.OK) {
              setItem("USER", refreshResponse.data);
              const headers = new Headers(options.headers);
              headers.set(
                "Authorization",
                "Bearer " + refreshResponse.data.accessToken
              );
              options.headers = headers;
              return ky(input, options);
            }
            removeItem("USER");
            return response;
          } catch {
            removeItem("USER");
            return response;
          }
        }
        return response;
      },
    ],
  },
});

export function refreshUser() {
  const url = `http://localhost:3600/api/v1/super-admin/refresh`;
  const user = getItem<User>("USER");
  return ky
    .post(url, {
      headers: {
        Authorization: "Bearer " + user?.refreshToken,
      },
    })
    .json<RefreshResponse>();
}

export default instance;
