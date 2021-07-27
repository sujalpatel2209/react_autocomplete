import React, {useState, useEffect} from 'react';
import './App.css';
import axios from "axios";

function App() {

    const [users, setUsers] = useState([])
    const [key, setKey] = useState('')
    const [suggestion, setSuggestion] = useState([]);

    useEffect(() => {
        const loadUsers = async() => {
            await axios.get('https://reqres.in/api/users')
                .then((res) => {
                    setUsers(res.data.data);
                })
        }
        loadUsers();
    }, [])

    const onChangeHandler = (key) => {
        let matches = [];
        if(key.length > 0){
            matches = users.filter(user => {
                const regex = new RegExp(`${key}`, 'gi')
                return user.email.match(regex)
            })
        }
        setSuggestion(matches);
        setKey(key);
    }

    const onClickHandler = (value) => {
        setKey(value);
        setSuggestion([]);
    }

    return (
        <div className="container">
            <input type="text" className="col-md-12 input"
                   onChange={event => onChangeHandler(event.target.value)}
                   style={{marginTop:'10px'}}
                   value={key}
                   onBlur={() => {
                       setTimeout(() => {
                           setSuggestion([])
                       }, 100)
                   }}
            />
            { suggestion && suggestion.map((user, index) =>
                <div onClick={() => onClickHandler(user.email)} key={index} className="col-md-12" style={{cursor:"pointer"}}>{user.email}</div>
            )}
        </div>
    );
}

export default App;
