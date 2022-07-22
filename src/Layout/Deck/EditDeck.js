import React, {useEffect, useState} from 'react'
import { useHistory, useParams } from "react-router-dom";
import { readDeck } from '../../utils/api';



function EditDeck() {
    const [deck, setDeck] = useState([]);
    const {deckId} = useParams();
    const history = useHistory();

    useEffect(()=> {
        const abortController = new AbortController()
        async function loadDeck() {
            const getDeckFromAPI = await readDeck(deckId, abortController.signal);
            setDeck(getDeckFromAPI)
        }
        loadDeck();
        return ()=> abortController.abort()
    }, [deckId]);
    
    return(
       <div>
             <div>
    <nav aria-label="breadcrumb">
  <ol className="breadcrumb">
    <li className="breadcrumb-item"><a href="/">Home</a></li>
    <li className="breadcrumb-item"><a href={`/decks/${deckId}`}>{deck.name}</a></li>
    <li className="breadcrumb-item active" aria-current="page">Edit Deck</li>
  </ol>
</nav>
</div>
<h2>Edit Deck</h2>
<div>
<form>
  <div className="form-group">
    <label for="name">Name</label>
    <input type="name" className="form-control" id="exampleFormControlInput1" value={deck.name}/>
  </div>
  <div className="form-group">
    <label for="exampleFormControlTextarea1">Description</label>
    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" value={deck.description}></textarea>
  </div>
  <button type="button" className="btn btn-secondary" onClick={()=> history.push("/")}>Cancel</button>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
</div>
       </div>
    )
}

export default EditDeck