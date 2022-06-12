import axios from "axios";
import { IUser } from "../components/login/Login";

export class GetUserService {
  userLogin(user: IUser) {
    axios
      .post<IUser>(`http://localhost:3000/login`, user, {
        headers: {
          "content-type": "application/json"
        }
      })
      .then((data) =>
        localStorage.setItem("inloggad", JSON.stringify(data.data))
      )
      .catch((error) => console.log("Error", error));
  }
}
