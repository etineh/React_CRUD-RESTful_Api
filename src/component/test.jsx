import React from "react";

function Inp(props) {
  return (
    <div className="form">
      <input 
        type="text" 
        name="name" 
        onChange={(e) => props.onChange(e.target.value)}
        value={props.Value || ""}
      />
    </div>
  );
}

export const ButAdd = (props)=>{
  return (
    <div className="form">
      {!props.onCheck ? (
      <button onClick={props.onAdd}>
        <span>Add</span>
      </button>
    ) : (
      <button onClick={props.onUpdate}>
        <span>Update</span>
      </button>
    )}
    </div>
  )
}

function Display(props) {
  return (
    <ul>
      {props.onAdd.map((el, i) => {
        return (
          <div key={i}>
            <li>
              <span>  {el.content} </span>
              <button
                onClick={() => props.onEdit(i, el._id)}
                style={{ paddingLeft: "20px" }}
              >
                Edit
              </button>
              <button
                onClick={() => props.onDel(el._id)}
                style={{ paddingLeft: "20px" }}
              >
                Delete
              </button>
            </li>
          </div>
        );
      })}
    </ul>
  );
}

export { Inp, Display };
