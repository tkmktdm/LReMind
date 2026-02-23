import axios from "axios";

export class BasicService {
  csrfToken: String | undefined;
  setCsrf: any;
  constructor() {
    this.setCsrf = axios.create({
      baseURL: process.env.NEXT_PUBLIC_LR_BACKEND_API,
      withCredentials: true,
    });

    // if (document.cookie) {
    //   const csrfCookie = document.cookie
    //     .split("; ")
    //     .find((row) => row.startsWith("XSRF-TOKEN="));
    //   this.csrfToken = csrfCookie
    //     ? decodeURIComponent(csrfCookie.split("=")[1])
    //     : "";
    // }
  }
  public async initCsrf() {
    try {
      // TODO: redisに変更したので修正
      // CSRFのクッキーを取得
      await this.setCsrf.get(`/sanctum/csrf-cookie`);
      //await this.setCsrf.get(`/sanctum/csrf-cookie`);
      const resCsrf = await this.setCsrf.get(
        `http://localhost:12101/sanctum/csrf-cookie`,
      );
      console.log(resCsrf);
      const csrfCookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("XSRF-TOKEN="));
      this.csrfToken = csrfCookie
        ? decodeURIComponent(csrfCookie.split("=")[1])
        : "";

      if (!this.csrfToken) {
        console.error("CSRF token not found in cookies.");
      }
    } catch (error) {
      console.error("Failed to initialize CSRF token:", error);
    }
  }

  public async csrfPost() {
    try {
      // CSRFのクッキーを取得
      await this.setCsrf.get(`/sanctum/csrf-cookie`);
      const csrfCookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("XSRF-TOKEN="));
      this.csrfToken = csrfCookie
        ? decodeURIComponent(csrfCookie.split("=")[1])
        : "";

      if (!this.csrfToken) {
        console.error("CSRF token not found in cookies.");
      }
      return (this.setCsrf = axios.create({
        baseURL: process.env.NEXT_PUBLIC_LR_BACKEND_API,
        withCredentials: true,
      }));
    } catch (error) {
      console.error("Failed to initialize CSRF token:", error);
    }
  }
  public exec() {
    return "ok";
  }
}
