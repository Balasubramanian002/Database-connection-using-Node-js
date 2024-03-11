
import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function CRUD() {
  const [post,setpost] = useState([]);
  const [id,setid] = useState(0);
  const [name,setname] = useState('');
  const [age,setage] = useState(0);
  useEffect( () => {
     axios.get('http://localhost:3001/Students')
     .then(res => {setpost(res.data)})
     .catch(err => {console.log(err)})
  });
  const handlesubmit = () => {
    axios.post('http://localhost:3001/Students',{"id" : id,"name" : name,"age" : age})
    .then(res => {console.log(res)})
    .catch(err=>console.log(err))

  }
 const handledelete=(id)=>{
     axios.delete(`http://localhost:3001/Students/${id}`)
     .then(res=>console.log(res))
     .catch(err=>console.log(err))
 }
 const [popup,setpopup] = useState(false);
  const [id1,setid1] = useState(0);
  const [name1,setname1] = useState('');
  const [age1,setage1] = useState(0);
 
  const openpopup = (datas)=>{
      setpopup(true)
      setid1(datas.id)
      setname1(datas.name)
      setage1(datas.age)
  }
 
  const handleUpdate=()=>{
      axios.put(`http://localhost:3001/Students/${id1}`,{"id":id1,"name":name1,"age":age1})
      .then(res=>console.log(res))
      .catch(err=>console.log(err))

  } 

  return (
    <div>
        <form onSubmit={handlesubmit}>
          <label>Id:</label>
          <input type='number' value={id} onChange={(e)=>setid(e.target.value)}/><br/>
          <label>Name:</label>
          <input type='text' value={name} onChange={(e)=>setname(e.target.value)}/><br/>
          <label>Age</label>
          <input type='number' value={age} onChange={(e)=>setage(e.target.value)}/><br/>
          <button type='submit'> Submit </button>
        </form>
        <thead>
           <tr>
               <th>Id</th>
               <th>Name</th>
               <th>Age</th>
               <th>Action</th>
           </tr>
        </thead>
        <tbody>
            {
              post.map(x=>(
                 <tr key={x.id}>
                  <td>{x.id}</td>
                  <td>{x.name}</td>
                  <td>{x.age}</td>
                  <td>
                    <button onClick={()=>openpopup(x)}>Update</button>
                    <button onClick={()=>handledelete(x.id)}>Delete</button>
                  </td>
                 </tr>
            
              ))
            }
        </tbody>
        {popup && <form onSubmit={handleUpdate}>
          <button onClick={()=>{setpopup(false)}}>x</button>
          <label>Id:</label>
          <input type='number' value={id1} onChange={(e)=>setid1(e.target.value)}/><br/>
          <label>Name:</label>
          <input type='text' value={name1} onChange={(e)=>setname1(e.target.value)}/><br/>
          <label>Age</label>
          <input type='number' value={age1} onChange={(e)=>setage1(e.target.value)}/><br/>
          <button type='submit'> Submit </button>
        </form>}          
    </div>
  )
}
