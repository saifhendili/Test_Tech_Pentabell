import React,{useState} from 'react'
import { addTodos } from '../../Redux/Actions/todos'
import { useDispatch, useSelector } from "react-redux";

function AddTodo() {
  const dispatch = useDispatch();

    const [Title, setTitle] = useState("")
    const [Description, setDescription] = useState("")
  return (
    <div className="pb-2">
    <div className="card">
      <div className="card-body">
        <div className="d-flex flex-row align-items-center">
          <input type="text" value={Title} name="Title" onChange={e=>setTitle(e.target.value)} className="form-control form-control-lg" id="exampleFormControlInput1"
            placeholder="Add Title"/> 
             <textarea maxLength="300" value={Description} name="Description" onChange={e=>setDescription(e.target.value)} className="form-control form-control-lg" id="exampleFormControlInput1"
            placeholder="Add Description..."/>
          <a href="#!" data-mdb-toggle="tooltip" title="Set due date"><i
              className="fas fa-calendar-alt fa-lg me-3"></i></a>
          <div>
            <button type="button" onClick={e=>dispatch(addTodos(Title,Description))} className="btn btn-primary">Add</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default AddTodo