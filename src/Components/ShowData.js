import React, { useEffect, useState } from "react";
import axios from "axios";
import '../App.css';

const ShowData = ({data,getData}) => {
    
    const handleDelete = (id) =>{
        axios.delete(`http://localhost:3000/users/${id}`)
        .then(()=>getData() )
       
    }


  return (
    <div>
      <table>
        <tr>
          <th>username</th>
          <th>email</th>
          <th>gender</th>
          <th>hobbies</th>
          <th>age group</th>
          <th>image</th>
          <th>actions</th>
        </tr>
        {data.map((item, i) => {
          return (
            <tr key={i}>
              <td>{item.username}</td>
              <td>{item.email}</td>
              <td>{item.gender}</td>
              <td>{item.hobbies.map(i=><>{i} </>)}</td>
              <td>{item.age}</td>
              <td><img src={item.image} height="30" width="30" alt="" /></td>
              <td><button onClick={()=>handleDelete(item.id)}>delete</button></td>

            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default ShowData;
