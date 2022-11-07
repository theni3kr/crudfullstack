import React, { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { NavLink } from "react-router-dom";

const Home = () => {
  const [getuserdata, setuserdata] = useState([]);


  const getdata = async () => {
    const res = await fetch("/userdata", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
      setuserdata(data);
      console.log("Getting data");
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const deleteuser = async (id) => {
    const res2 = await fetch(`/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const deletedata = await res2.json();

    if (res2.status === 422 || !deletedata) {
      console.log("error");
    } else {
      console.log("Deleted successfully");
      alert("delete")
      getdata();
    }
  };
  return (
    <>
      
      <div className="mt-5">
        <div className="container">
          <div className="add_btn mt-2 mb-2">
            <NavLink to="/register" className="btn btn-primary">
              Add data
            </NavLink>
          </div>

          <table class="table">
            <thead>
              <tr className="table-dark">
                <th scope="col">id</th>
                <th scope="col">Username</th>
                <th scope="col">email</th>
                <th scope="col">job</th>
                <th scope="col">Number</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {getuserdata.map((item, id) => {
                return (
                  <>
                    <tr>
                      <th scope="row">{id + 1}</th>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.work}</td>
                      <td>{item.mobile}</td>
                      <td className="d-flex justify-content-between">
                        <NavLink to={`/view/${item._id}`}>
                          <button className="btn btn-success">
                            <VisibilityIcon />
                          </button>{" "}
                        </NavLink>
                        <NavLink to={`/edit/${item._id}`}>
                          {" "}
                          <button className="btn btn-primary">
                            <CreateIcon />
                          </button>{" "}
                        </NavLink>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteuser(item._id)}
                        >
                          <DeleteIcon />
                        </button>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Home;
