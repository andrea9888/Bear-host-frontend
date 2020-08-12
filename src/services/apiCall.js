import axios from "axios";
import { auth } from "../auth_and_private/authService";

const apiUrl = "http://localhost:3001";

const instance = axios.create({
  baseURL: apiUrl,
});

instance.defaults.headers.common["Content-Type"] = `application/json`;

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
      
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const req = await instance
        .post("/user/token", {
          token: localStorage.getItem("bear-host-refresh"),
        })
        .then(async (res) => {
          if (res.status === 200) {
            localStorage.setItem("bear-host-access", res.data.accessToken);
            // axios.defaults.headers.common["Authorization"] =
            //   "Bearer " + res.data.accessToken;
            auth.setJwt(res.data.accessToken);
            originalRequest.headers["Authorization"] =
              "Bearer " + res.data.accessToken;

            const req = await axios(originalRequest);
            return req;
          } else if(res.status === 403) {
            console.log("oreq - ", originalRequest);
            localStorage.removeItem("bear-host-refresh");
            localStorage.removeItem("bear-host-logged");
          }
        }, rej => {
            window.location.href="/login";
        });

      return req;
    } else{
        return error.response;
    }
  }
);

export default instance;
