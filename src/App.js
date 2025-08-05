import './index.css';
import Layout from './components/Layout'
import Header from './components/Header';
import Lists from './components/Lists';
import Form  from './components/Form';
import { useEffect, useState } from 'react';

function App() {
  const [error,setError]=useState(null)
  const[todo,setTodo]=useState("")
  const [todos, setTodos] = useState(() => {
  const savedTodos = localStorage.getItem('todos');
  return savedTodos ? JSON.parse(savedTodos) : [];
});

  useEffect(()=>{
    const getTodos=JSON.parse(localStorage.getItem('todos'))
    if (getTodos){
      setTodos(getTodos)
    }
  },[])

  useEffect(()=>{
    localStorage.setItem('todos',JSON.stringify(todos))
  },[todos])

  const submitHandler=(e)=>{
    e.preventDefault()
    if (todo.length< 5 ){
      setError("کار خود را وارد کنید (حداقل 5کارکتر)");
      return false;
    }
    setTodos([...todos,{id : Date.now(),title:todo , done:false}])
    setError(null)
    //"پیغام خطا رو پاک کن."
    setTodo("")


  }
  const delHandLer=(todoId)=>{
    if(window.confirm('از حذف مطمئنی ؟!')){
        const updateTodos =todos.filter((item)=>item.id !==todoId);
    setTodos(updateTodos)
    }
    }
  const doneHandLer=(todoId)=>{
    const  index = todos.findIndex((item)=>item.id === todoId)
    const dublicateTodos=[...todos];
    dublicateTodos[index]={
      id: todos[index].id,
      title: todos[index].title,
      done:!todos[index].done
      // done مقدار true داشته باشه، تبدیل میشه به false و برعکس. این همون کاریه که معمولاً برای تیک زدن/برداشتن انجام می‌دیم.
    }
    setTodos(dublicateTodos)
    console.log(todos)
  }
  return (
    <Layout>
      <Header/>
      <Form todo={todo}
      change ={(e)=>setTodo(e.target.value)}
      submit={submitHandler}
      error={error}/>
      <Lists del={delHandLer} 
      done={doneHandLer} 
      todos={todos}/>
    </Layout>
  );
}

export default App;
