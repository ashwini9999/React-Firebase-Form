import React, { useState, useEffect } from "react";
import "../app.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import MultiSelect from  'react-multiple-select-dropdown-lite'
import  'react-multiple-select-dropdown-lite/dist/index.css'
import { db } from "../firebase";

const options = [
  'male', 'female', 'do not wish to mention'
];
const defaultOption = options[0];

const  options2  = [
  { label:  'Drug', value:  'Drug'  },
  { label:  'Food', value:  'Food'  },
  { label:  'Insect', value:  'Insect'  },
  { label:  'Latex', value:  'Latex'  },
  { label:  'Mold', value:  'Mold'  },
  { label:  'Pet' ,value:  'Pet'   },
  { label:  'Pollen', value:  'Pollen'},
]
const dropdownlist = ["item1", "item2", "item3"]
const defaultOption2 = options2[0];
const Response_Form = () => {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [loader, setLoader] = useState(false);
  const [firstdropdown, setFirstdropdown] = useState("Not selected Anything");
  const [value, setvalue] = useState('Not selected Anything')
  const  handleOnchange  =  val  => {
    setvalue(val)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);

    db.collection("Response_Forms")
      .add({
        name: name,
        startDate:startDate,
        firstdropdown:firstdropdown,
        value:value,
      })
      .then(() => {
        setLoader(false);
        alert("Your response has been recorded successfully");
      })
      .catch((error) => {
        alert(error.message);
        setLoader(false);
      });

    setName("");
    setStartDate(new Date());
    setFirstdropdown("");
    setvalue("");
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h1>Form</h1>

      <label>Name</label>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>Date: </label>
      <DatePicker className="date" selected={startDate} onChange={date => setStartDate(date)}  />
      <label>Gender: </label>
      <select
        id="first"
        value={firstdropdown}
        onChange={e=> setFirstdropdown(e.target.value)}
        onBlur={e=> setFirstdropdown(e.target.value)}
        disabled={!dropdownlist.length}>
         <option>Select</option>
            {options.map(item=>
            <option key={item} value={item}>{item}</option>)}
      </select>
      <label>Allergies: </label>
      <MultiSelect 
    onChange={handleOnchange}
    options={options2}
    />

      <button
        type="submit"
        style={{ background: loader ? "#ccc" : " rgb(2, 2, 110)" }}
      >
        Submit
      </button>
    </form>
  );
};

export default Response_Form;
