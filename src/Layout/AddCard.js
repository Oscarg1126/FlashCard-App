import React, {useEffect, useState} from 'react';
import {createCard, readDeck } from "../utils/api/index";
import { useHistory, useParams } from "react-router-dom";

function AddCard() {
    const [deck, setDeck] = useState([]);
    const {deckId} = useParams();
    const history = useHistory();
    const [front, setFront] = useState("Front side of card")
    const [back, setBack] = useState("Back side of card")

    useEffect(()=> {
        const abortController = new AbortController()
        async function loadDeck() {
            const getDeckFromAPI = await readDeck(deckId, abortController.signal);
            setDeck(getDeckFromAPI)
        }
        loadDeck();
        return ()=> abortController.abort()
    }, [deckId]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const card = {
            front: front,
            back: back,
            deckId: deckId
        }
        createCard(deckId, card)
        .then(response => {
            setFront("Front side of card")
            setBack("Back side of card")
        })
        history.push(`decks/${deckId}`)
    }

    return( <div>
        <div>
        <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item"><a href="/">Home</a></li>
        <li className="breadcrumb-item"><a href="/">{deck.name}</a></li>
        <li className="breadcrumb-item active" aria-current="page">Add Card</li>
      </ol>
    </nav>
    </div>
    
    <div>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label for="name">Front</label>
        <textarea 
        className="form-control" 
        required
        rows="3" 
        value={front}
        />
      </div>
      <div className="form-group">
        <label for="exampleFormControlTextarea1">Back</label>
        <textarea 
        className="form-control" 
        required
        rows="3" 
        value={back}/>
      </div>
      <button type="button" className="btn btn-secondary" onClick={()=> history.push("/")}>Done</button>
      <button type="submit" className="btn btn-primary">Save</button>
    </form>
    </div>
    </div>)
}

export default AddCard