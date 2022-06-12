import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NotFound } from './components/notFound/NotFound';
import { Layout } from './components/layout/Layout';
import { RenderNotes } from './components/notes/RenderNotes';
import { RenderNote } from './components/note/RenderNote';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
     <BrowserRouter>
      <Routes>
        <Route path='/'element={<Layout/>}>
          <Route index element={<App/>}/>
           <Route path='/notes/:user'element={<RenderNotes/>}/> 
           <Route path='/notes/:user/:id'element={<RenderNote/>}/> 
          <Route path='*'element={<NotFound/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
