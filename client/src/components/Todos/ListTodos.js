import React, { Fragment, useEffect ,useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { CloseTodo, deleteTodo, editTodo, getTodos } from '../../Redux/Actions/todos';
import Moment from 'react-moment';

import Spinner from '../Layout/Spinner'
import AddTodo from './AddTodo';
function ListTodos() {
    const [Toggleedit, setToggleedit] = useState(null);
    const [Title, setTitle] = useState("")
    const [Description, setDescription] = useState("")

    const dispatch = useDispatch();

    const todo = useSelector((state) => state.todos);
    const { todos,loading } =todo ;

    const clickHandler = (index) => {
        setToggleedit((prev) => {
            return prev === index ? null : index;
        });
     };


useEffect(()=>{
    dispatch(getTodos());

},[todos])

const CloseTodoo=(e,id)=>{
    e.preventDefault()
    dispatch(CloseTodo(id))
}
const onsubmitedit=(id)=>{
     dispatch(editTodo(id,Title,Description))
    setToggleedit(false);
    setTitle("");
    setDescription("");

}
  return loading||todos===null?<Spinner/>:<Fragment>
<section className="vh-100">
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col">
        <div className="card" id="list1" style={{borderRadius: ".75rem", backgroundColor: "#eff1f2"}}>
          <div className="card-body py-4 px-4 px-md-5">

            <p className="h1 text-center mt-3 mb-4 pb-3 text-primary">
              <i className="fas fa-check-square me-1"></i>
              <u>My Todo-s</u>
            </p>
           <AddTodo/>
       
            <hr className="my-4"/>

    {todos.map((x,i)=>
     <ul key={`todo${i}`} className="list-group list-group-horizontal rounded-0 bg-transparent">
     {Toggleedit === i ? <Fragment>  <li
       className="list-group-item px-3 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent">
     <input className='lead fw-normal mb-0 ' type='text' defaultValue={x.title} onChange={e=>setTitle(e.target.value)} placeholder="title"/>
     
     </li>
     <li
       className="list-group-item px-3 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent">
     <textarea className='lead fw-normal mb-0 ' type='text' defaultValue={x.Description} onChange={e=>setDescription(e.target.value)} placeholder="description" maxLength="300"/>
     
     </li>
     
     </Fragment> : <Fragment>
     <li
       className="list-group-item px-3 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent">
      {x.finished==true? <p className='lead fw-normal mb-0 barree'>{x.title}</p>:
       <p className='lead fw-normal mb-0 '>{x.title}</p>}
      
     </li>
       <li
       className="list-group-item px-3 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent">
      {x.finished==true? <p className='lead fw-normal mb-0 barree'>{x.Description}</p>:
       <p className='lead fw-normal mb-0 '>{x.Description}</p>}
      
     </li>
     </Fragment>
     }
   
  {x.createdAt?<li className="list-group-item px-3 py-1 d-flex align-items-center border-0 bg-transparent">
                <div
                  className="py-2 px-3 me-2 border border-warning rounded-3 d-flex align-items-center bg-light">
                  <p className="small mb-0">
                    <a href="#!" data-mdb-toggle="tooltip" title="Due on date">
                      <i className="fas fa-hourglass-half me-2 text-warning"></i>
                    </a>
                    Started At:

                    <Moment date={x.createdAt}/>
                    
                  </p>
                </div>
              </li>:null}
              {x.updatedAt?<li className="list-group-item px-3 py-1 d-flex align-items-center border-0 bg-transparent">
                <div
                  className="py-2 px-3 me-2 border border-warning rounded-3 d-flex align-items-center bg-light">
                  <p className="small mb-0">
                    <a href="#!" data-mdb-toggle="tooltip" title="Due on date">
                      <i className="fas fa-hourglass-half me-2 text-warning"></i>
                    </a>
                    Updated At:
                    <Moment date={x.updatedAt}/>
                  </p>
                </div>
              </li>:null}
              {x.finished?<li className="list-group-item px-3 py-1 d-flex align-items-center border-0 bg-transparent">
                <div
                  className="py-2 px-3 me-2 border border-warning rounded-3 d-flex align-items-center bg-light">
                  <p className="small mb-0">
                    <a href="#!" data-mdb-toggle="tooltip" title="Due on date">
                      <i className="fas fa-hourglass-half me-2 text-warning"></i>
                    </a>
                    Finished At:
                    <Moment date={x.finished_at}/>

                 
                  </p>
                </div>
              </li>:null}
    
    {x.finished?
      <li className="list-group-item ps-3 pe-0 py-1 rounded-0 border-0 bg-transparent">
      <div className="d-flex flex-row justify-content-end mb-1">
      <Link to={`/get-todo?id=${x._id}`}>
      <button className="btn btn-primary">
      View</button></Link>
  
             <button className="btn btn-danger" onClick={e=>    dispatch(deleteTodo(x._id))}>Delete</button>

        <button className="btn btn-success" disabled>Closed</button>
      </div>
 
    </li>:
      <li className="list-group-item ps-3 pe-0 py-1 rounded-0 border-0 bg-transparent">
      <div className="d-flex flex-row justify-content-end mb-1">
      <Link to={`/get-todo?id=${x._id}`}>
      <button className="btn btn-primary">
      View</button></Link>
       {/* <Link to={`/edit-todo?id=${x._id}`}>
      <button className="btn btn-secondary">
     Edit</button></Link> */}
     {Toggleedit === i ? <button onClick={()=>onsubmitedit(x._id)}  className='btn btn-secondary'>Submit</button> : <button onClick={() => clickHandler(i)} className='btn btn-secondary' id='idbtntextsize'>Edit</button>}
             <button className="btn btn-danger" onClick={e=>    dispatch(deleteTodo(x._id))}>Delete</button>

        <button onClick={e=>CloseTodoo(e,x._id)} className="btn btn-success">Close</button>
      </div>
 
    </li>} 
  
   </ul>
    )}

          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</Fragment>
  
}

export default ListTodos