import React, { useEffect, useState } from "react";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import PersonIcon from "@mui/icons-material/Person";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {  NavLink, useNavigate, useParams } from "react-router-dom";

const Details = () => {
  const navigate = useNavigate()
  const [getuserdata,setuserdata] = useState([])

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
     setuserdata(data)
     console.log("Getting data")
   }
    
 }

useEffect(()=>{
 getdata()
},[])


const deleteuser = async (id)=>{
  const res2 = await fetch(`/delete/${id}`,{
   method:"DELETE",
       headers:{
         "Content-Type":"application/json"
       }
  })
    const deletedata = await res2.json()
 
    if(res2.status === 422 || !deletedata){
     console.log("error")
    }else{
     console.log("Deleted successfully")
     navigate('/')
    }
 }

  return (
    <div className="container mt-3">
      <h1 style={{ fontWeight: 400 }}>Welcome</h1>

      <Card sx={{ maxWidth: 600 }}>
        <CardContent>
        <div className="add_btn">
                <NavLink to={`/edit/${getuserdata._id}`}><button className='btn btn-primary mx-2'><CreateIcon/></button></NavLink>
        <button className='btn btn-danger' onClick={()=>deleteuser(getuserdata._id)}><DeleteIcon/></button>
                </div>
          <div className="row">
            <div className="left_view col-lg-6 col-md-6 col-12">
              <PersonIcon style={{ width: 50 }} />
              <h3 className="mt-3">
                Name: <span>{getuserdata.name}</span>
              </h3>
              <h3 className="mt-3">
                Age: <span>{getuserdata.age}</span>
              </h3>
              <p className="mt-3">
                <MailOutlineIcon /> Email: <span>{getuserdata.email}</span>
              </p>
              <p className="mt-3">
                <WorkOutlineIcon />
                Occupation: <span>{getuserdata.work}</span>
              </p>
            </div>
            <div className="right_view col-lg-6 col-md-6 col-12">
                
              <p className="mt-5">
                <PhoneIphoneIcon />
                mobile: <span>+91 {getuserdata.mobile}</span>
              </p>
              <p className="mt-3">
                <LocationOnIcon />
                location: <span>{getuserdata.add}</span>
              </p>
              <p className="mt-3">
                Description: <span>{getuserdata.desc}</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Details;
