import React, { useState, useEffect } from 'react'
import { NavLink, useParams, useNavigate } from 'react-router-dom'

const Edit = () => {

  // const [getuserdata,setuserdata] = useState([])

   const navigate = useNavigate()

    const[inp, setinp] = useState(
      {
        name:"",
        email:"",
        age:"",
        mobile:"",
        work:"",
        add:"",
        desc:""
      }
    )

    const setdata = (e)=>{
        console.log(e.target.name, e.target.value)
        const{name,value} = e.target
        setinp((prev)=>{
          return {...prev,[name]:value}
        })
      }

  const {id} = useParams("")

  const getdata = async ()=>{
   

    const res = await fetch(`/getuser/${id}`,{
     method:"GET",
     headers:{
       "Content-Type":"application/json"
     }
    })
    const data = await res.json()
    
   if(res.status === 422 || !data){
     console.log("error ")
   }else{
     setinp(data)
     console.log("Getting data")
   }
    
 }

 useEffect(()=>{
  getdata()
 },[])
 
 const updateuser = async (e)=>{
  e.preventDefault()
  const {name,email,age,mobile,add,work,desc} = inp
  const res = await fetch(`/update/${id}`,{
    method:"PATCH",
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({
      name,email,age,mobile,add,work,desc
    })
  })

  const data = await res.json()

  if(res.status === 422 || !data){
    alert("fill the data")
    console.log("error")
  }else{
    alert("updated")
    console.log("success")
    navigate("/")
  }

}
 


  return (
    <div className='container'>
        <NavLink to="/">
            home
        </NavLink>
        <form className='mt-4'>
            <div className='row'>

            <div className="mb-3 col-lg-6 col-md-6 col-12">
    <label for="exampleInputEmail1" className="form-label">Name</label>
    <input type="text" name='name' value={inp.name} onChange={setdata}  className="form-control" id="exampleInputEmail1" />
  </div>
            <div className="mb-3 col-lg-6 col-md-6 col-12">
    <label for="exampleInputEmail1" className="form-label">Email</label>
    <input type="email" name='email'  value={inp.email}  onChange={setdata} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
            
            <div className="mb-3 col-lg-6 col-md-6 col-12">
    <label for="exampleInputEmail1" className="form-label">age</label>
    <input type="number" name='age' value={inp.age} onChange={setdata}  className="form-control" id="exampleInputEmail1" />
  </div>
            <div className="mb-3 col-lg-6 col-md-6 col-12">
    <label for="exampleInputEmail1" className="form-label">Mobile</label>
    <input type="number" name='mobile' value={inp.mobile}  onChange={setdata} className="form-control" id="exampleInputEmail1" />
  </div>
            <div className="mb-3 col-lg-6 col-md-6 col-12">
    <label for="exampleInputEmail1" className="form-label">Work</label>
    <input type="text" name='work' value={inp.work} onChange={setdata}  className="form-control" id="exampleInputEmail1" />
  </div>
            <div className="mb-3 col-lg-6 col-md-6 col-12">
    <label for="exampleInputEmail1" className="form-label">Address</label>
    <input type="text" name='add' value={inp.add} onChange={setdata}  className="form-control" id="exampleInputEmail1" />
  </div>
            <div className="mb-3 ">
    <label for="exampleInputEmail1" className="form-label">Description</label>
    <textarea name='desc' value={inp.desc} onChange={setdata}  className='form-control' id='' cols='30' rows='5'></textarea>    
  </div>
 
  
  <button type="submit" onClick={updateuser} className="btn btn-primary">Submit</button>
            </div>
  
</form>
    </div>
  )
}

export default Edit