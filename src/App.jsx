//import { useState } from 'react'
import './App.css'
import New from './components/New.jsx'
import Nav from './components/nav.jsx';
import Home from './components/home.jsx';
import Edit from './components/Edit.jsx';
import Delete from './components/Delete.jsx';
import Projects from './components/Projects.jsx';
import NewProject from './components/NewProject.jsx';
import EditProject from './components/EditProject.jsx';
import DeleteProject from './components/DeleteProject.jsx';
import Project from './components/Project.jsx';
//import { useState} from react;

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="container all">
      < BrowserRouter>
        <Routes>
          <Route path="/" element={<Nav />}>
            <Route index element={<Home />} />
            <Route path="projects" element={<Projects />} />
            <Route path="project/:id" element={<Project />} >
              <Route path="issues/new" element={<New />} />
              <Route path="issues/:id1/edit" element={<Edit /> } />
             {/*  <Route path="issues" element={<All />} /> */}
              <Route path="issues/:id1/delete" element={<Delete />} />
            </Route>              
            <Route path="projects/new" element={<NewProject />} />
            <Route path="projects/edit" element={<EditProject />} />
            <Route path="projects/delete" element={<DeleteProject />} />
            <Route path='/*' element={<Home />} />            
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
