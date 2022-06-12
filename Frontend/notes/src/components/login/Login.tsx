import "./login.css";
import { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetUserService } from "../../services/GetUserService";

export interface IUser {
  userName: string;
  userPassword: string;
}
export interface IUserID {
  userID: number;
}
export function Login() {
  const [newUser, setNewUser] = useState<IUser>({
    userName: "",
    userPassword: ""
  });
  const [id, setId] = useState<IUserID>({ userID: 0 });
  function userLogin(e: any) {
    e.preventDefault();
    let user: IUser = {
      userName: newUser.userName,
      userPassword: newUser.userPassword
    };
    let login = new GetUserService();
    login.userLogin(user)
  }
  useEffect(() => {
    if (id.userID > 0) return;
    let userId = localStorage.getItem("inloggad");
    if (userId) {
      setId(JSON.parse(userId));
      console.log(id.userID)
    }
  });
  let notesLink = `/notes/${id.userID}`;
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    let name = e.target.name;
    let password = e.target.name;
    setNewUser({
      ...newUser,
      [name]: e.target.value,
      [password]: e.target.value
    });
  }
  return (
    <form>
      <h1>Logga in</h1>
      <input
        placeholder="användarnamn"
        type="text"
        name="userName"
        value={newUser.userName}
        onChange={handleChange}
      />
      <input
        placeholder="lösenord"
        type="password"
        name="userPassword"
        value={newUser.userPassword}
        onChange={handleChange}
      />
      <button onClick={userLogin}>
        <Link to={notesLink}>Logga in</Link>
      </button>
    </form>
  );
}
