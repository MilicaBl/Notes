import axios from "axios";
import { Component } from "react";
import { IChangeNote, INote } from "../components/note/RenderNote";
export class PostNoteService extends Component<any, any> {
  user = this.props.user;
  id = this.props.id;
  // Posta en ny note
  postNote(note: INote) {
    axios
      .post<INote>(`http://localhost:3000/notes`, note, {
        headers: {
          "content-type": "application/json"
        }
      })
      .then((data) => console.log(data))
      .catch((error) => console.log("Error", error));
  }
  // Ändra en note
  putNote(note: IChangeNote) {
    axios
      .put<IChangeNote>(
        `http://localhost:3000/notes/${this.user}/${this.id}`,
        note,
        {
          headers: {
            "content-type": "application/json"
          }
        }
      )
      .then((data) => console.log(data))
      .catch((error) => console.log("Error", error));
  }
}
