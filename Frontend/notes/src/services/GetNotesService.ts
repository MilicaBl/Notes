import axios from "axios";
import { Component } from "react";
import { INotes } from "../components/notes/RenderNotes";

export class GetNotesService extends Component<any, any> {
  user = this.props.user;
  id = this.props.id;

  // Alla notes
  async getNotes(): Promise<INotes[]> {
    let notes = await axios.get<INotes[]>(
      `http://localhost:3000/notes/${this.user}`
    );
    return notes.data;
  }
  // En specifik note
  async getNote(): Promise<INotes> {
    let note = await axios.get<INotes>(
      `http://localhost:3000/notes/${this.user}/${this.id}`
    );
    return note.data;
  }
}
