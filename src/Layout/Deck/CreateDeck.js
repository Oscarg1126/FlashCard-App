import React from 'react'
import { useHistory } from "react-router-dom";

function CreateDeck() {
  const history = useHistory()
return (
    <div>
    <div>
    <nav aria-label="breadcrumb">
  <ol className="breadcrumb">
    <li className="breadcrumb-item"><a href="/">Home</a></li>
    <li className="breadcrumb-item active" aria-current="page">Create Deck</li>
  </ol>
</nav>
</div>

<div>
<form>
  <div className="form-group">
    <label for="name">Name</label>
    <input type="name" className="form-control" id="exampleFormControlInput1" placeholder="Deck Name"/>
  </div>
  <div className="form-group">
    <label for="exampleFormControlTextarea1">Description</label>
    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Brief description of deck"></textarea>
  </div>
  <button type="button" className="btn btn-secondary" onClick={()=> history.push("/")}>Cancel</button>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
</div>
</div>
)
}

export default CreateDeck