import axios from "axios";
import { BasicService } from "@/services/BasicServices";
import { cookies } from "next/dist/client/components/headers";
// import { cookies } from "next/headers";

export type registerUser = {
  name: String;
  kana: String;
  gender: Number;
  birthday: String;
  email: String;
  password: String;
};

export type loginUser = {
  email: String;
  password: String;
};

export class signActionServer extends BasicService {
  // register
  public async postRegister(data: registerUser) {
    try {
      console.log("csrfToken");
      console.log(this.csrfToken);
      if (!this.csrfToken) {
        await this.initCsrf();
      }
      const url = `${process.env.NEXT_PUBLIC_LR_BACKEND_API}/api/register`;
      const headers = {
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": this.csrfToken || "",
      };
      const body = {
        name: data.name,
        kana: data.kana,
        gender: data.gender,
        birthday: data.birthday,
        email: data.email,
        password: data.password,
      };
      const response = await this.setCsrf.post(url, body, { headers: headers });
      // console.log("response--------");
      // console.log(response);

      // registerが完了したらログインしてtokenを返し、TOPに遷移させる
      if (response.status == 201) {
        const loginBody = {
          email: data.email,
          password: data.password,
        };
        const loginResponse = await this.postLogin(loginBody);
        console.log("loginResponse-------");
        console.log(loginResponse);
        return loginResponse;
      }
      // TODO: DB削除する
      // login失敗
      return response;
    } catch (error) {
      console.log("error----------");
      console.log(error);
      // console.error("Login failed:", error.response?.data || error.message);
      throw error;
    }
  }

  // login
  public async postLogin(data: loginUser) {
    try {
      if (!this.csrfToken) {
        console.log("csrfToken");
        await this.initCsrf();
      }
      console.log("postLogin------------");
      console.log(this.csrfToken);
      const url = `${process.env.NEXT_PUBLIC_LR_BACKEND_API}/api/login`;
      const headers = {
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": this.csrfToken || "",
      };
      const body = {
        email: data.email,
        password: data.password,
      };
      const response = await this.setCsrf.post(url, body, { headers: headers });
      console.log("response--------");
      console.log(response);

      return response;
    } catch (error) {
      console.log("error----------");
      console.log(error);
      throw error;
    }
  }

  public async setAccessToken(accessToken: string) {
    try {
      if (!this.csrfToken) {
        await this.initCsrf();
      }
      const cookieStore = cookies();
      cookieStore.set("accessToken", accessToken);
      return { status: 200, message: "success" };
    } catch (error) {
      console.log("error----------");
      console.log(error);
      throw error;
    }
  }
  // get login(accessToken)
  public async getAccessToken() {
    try {
      if (!this.csrfToken) {
        await this.initCsrf();
      }
      const cookieStore = cookies();
      const accessToken = cookieStore.get("accessToken");
      return accessToken;
    } catch (error) {
      console.log("error----------");
      console.log(error);
      throw error;
    }
  }
}
