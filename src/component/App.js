import React, {useState} from "react"
import { useEffect } from "react";
import './App.css';
import {Inp, Display, ButAdd} from "./test";

function App() {
  const [dataValue, setDataValue] = useState('');
  const [dataSubmit, setDataSubmit] = useState([]);
  const [check, setCheck] = useState(0);
  const [Update, setUpDate] = useState("");
  const [load, setLoad] = useState("0")


  useEffect(()=>{
    (async ()=>{
      const res = await fetch("/test") 
      const items = await res.json()
      setDataSubmit(items) 
      return setLoad(0)
    })()
  },[load])

  async function handleClick() {
    let details = {content: dataValue}
    const res = await fetch("/test", {
      // mode: 'cors',
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(details)
    })
    res.json();
    setDataValue("") 
    return setLoad(1)
    // setDataSubmit((el) => [...el, dataValue]);
    
  }

  async function del(itemId) {
    const res = await fetch(`/test/${itemId}`, {
      method: "DELETE"
    })
    let data1 =await res.json()
    if(data1.success){
      return setLoad(1) 
    }
  }

  function edit(id, id_db) {
    setDataValue(dataSubmit[id].content);
    setCheck(1);
    setUpDate(id_db);
  }

  async function update() {
    let details = {content: dataValue}
    let res = await fetch(`/test/${Update}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body : JSON.stringify(details)
    })
    res.json();
    setCheck(0);
    setDataValue("");
    return setLoad(1)
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List </h1>
      </div>
      <Inp
        onChange={setDataValue}
        Value={dataValue}
      />

      <ButAdd
        onUpdate={update}
        onCheck={check}
        onAdd={handleClick}
      />

      <Display onAdd={dataSubmit} onDel={del} onEdit={edit}/>
    </div>
  );
}

export default App;
