import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetNotesService } from "../../services/GetNotesService";
import { INotes } from "../notes/RenderNotes";
import { Editor } from '@tinymce/tinymce-react';
import { PostNoteService } from "../../services/PostNoteService";


export interface INote{
    title:string,
    user:number,
    content:string
}
export interface IChangeNote{
    title:string,
    content:string
}

export  function RenderNote(){
    const[body,SetBody]=useState("");
    const[note,setNote]=useState<INotes>({id:0,user:0,title:'',content:''})
    const[title,setTitle]=useState<string>('');
    const[showChange,setShowChange]=useState<boolean>(true)
    const props=useParams()
    const user=Number(props.user)
    const id = Number(props.id);


    useEffect(() => {
        let singleNote = new GetNotesService({user,id})
        singleNote.getNote().then((data) => {        
          setNote(data) 
          setTitle(data.title)   
          SetBody(data.content)
        })
      }, [])
      function handleChange(e:ChangeEvent<HTMLInputElement>){
        let newTitle=e.target.name
        newTitle=e.target.value
        setTitle(newTitle)
        }
    function changeNote(){
        let changedNote:IChangeNote={title:title,content:body}
        let changeNote = new PostNoteService({user,id})
        changeNote.putNote(changedNote)
        window.location.reload()
    }
    function change(){
        setShowChange(false)
    }
    return(
        <>
        {showChange ? (
         <div>
            <h2>{note.title}</h2>
            <div dangerouslySetInnerHTML={{__html:note.content}} />
            <button onClick={change}>Ändra</button>
        </div>
        ) : (
            <div>
            <h2>Ändra din note</h2>
            <input type="text" value={title} name="title" onChange={handleChange}/>
    
            <Editor 
            textareaName="content"
            initialValue={note.content}
            onEditorChange={(newText)=>{SetBody(newText)}}
            init={{
                height: 500,
                width: 700,
                menubar: false,
                toolbar: 'undo redo | formatselect | ' +
                'bold italic backcolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
              }}
            />
            <h2>Titta igenom din text: </h2>
            <h3>{title}</h3>
            <div dangerouslySetInnerHTML={{__html:body}} /> 
            
             <button onClick={changeNote}>Spara ändringar</button>
             </div>
        )}
       
       
        </>
        
    )
}