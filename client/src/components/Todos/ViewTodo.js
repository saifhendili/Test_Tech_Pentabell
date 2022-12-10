import React,{useEffect} from 'react'
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getTodo } from '../../Redux/Actions/todos'
import Spinner from '../Layout/Spinner';

function ViewTodo() {
    const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

    const mytodo = useSelector((state) => state.todos);
    const { todo,loading } =mytodo ;
    useEffect(() => {
        dispatch(getTodo(searchParams.get("id")));
      }, []);
   
  return loading||todo==null?<Spinner/>:(
<table className="table">
  <thead>
    <tr>
      <th scope="col">Title</th>
      <th scope="col">Description</th>
      {todo?.createdAt?<th scope="col">Created At</th>:null}  
      {todo?.updatedAt?<th scope="col">Updated At</th>:null}  
      {todo?.finished?<th scope="col">Finished At</th>:null}  

    </tr>
  </thead>
  <tbody>
    <tr>
      <td>{todo?.title}</td>
      <td>{todo?.Description}</td>
      <td>{todo?.createdAt}</td>
      <td>{todo?.updatedAt}</td>
      <td>{todo?.finished}</td>
    </tr>
  </tbody>
</table>  )
}

export default ViewTodo