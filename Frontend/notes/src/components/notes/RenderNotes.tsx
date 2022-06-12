import { ChangeEvent, useEffect, useState } from "react";
import { GetNotesService } from "../../services/GetNotesService";
import { Link, useParams } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import { PostNoteService } from "../../services/PostNoteService";
import "./renderNotes.css";
import { IUserID } from "../login/Login";

export interface INotes {
  id: number;
  user: number;
  title: string;
  content: string;
}
export interface INote {
  title: string;
  user: number;
  content: string;
}
export function RenderNotes() {
  const [notes, setNotes] = useState<INotes[]>([]);
  const [noteLink, setNoteLink] = useState("");
  const [title, setTitle] = useState<string>("Rubrik");
  const [body, setBody] = useState("");
  const props = useParams();
  const user = Number(props.user);
  const [lsId, setLsId] = useState<boolean>(false);
 
  useEffect(() => {
    let allNotes = new GetNotesService({ user });
    allNotes.getNotes().then(data => {
      setNotes(data);
    });
  }, []);

  //   POSTA NY NOTE
  function postNewNote() {
    let note: INote = { title: title, user: user, content: body };
    let postNote = new PostNoteService(user);
    postNote.postNote(note);
    window.location.reload();
  }
  //  Fixa bug att man behöver klicka 2 ggr
  function renderNote(id: number) {
    // setNoteLink(`/notes/${user}/${id}`);
    window.location.href=`/notes/${user}/${id}`
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    let newTitle = e.target.name;
    newTitle = e.target.value;
    setTitle(newTitle);
  }

  const notesInfo = notes.map((note, i) => {
    return (
      <li key={i} onClick={() => renderNote(note.id)}><a>{note.title}</a></li>
    );
  });

  return (
    <div id="renderNotes">
      <div id="newNote">
        <h2>Skapa ny note</h2>
        <input type="text" value={title} name="title" onChange={handleChange} />
        <Editor
          textareaName="content"
          initialValue="Skriv din dokument här"
          onEditorChange={newText => {
            setBody(newText);
          }}
          init={{
            height: 500,
            width: 700,
            menubar: false,
            toolbar:
              "undo redo | formatselect | " +
              "bold italic backcolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
          }}
        />
        <h2>Titta igenom din text: </h2>
        <h2>
          {title}
        </h2>
        <div dangerouslySetInnerHTML={{ __html: body }} />
        <button onClick={postNewNote}>Spara</button>
      </div>
      <div id="notes">
        <h2>Alla notes</h2>
        <ul>
          {notesInfo}
        </ul>
      </div>
    </div>
  );
}
