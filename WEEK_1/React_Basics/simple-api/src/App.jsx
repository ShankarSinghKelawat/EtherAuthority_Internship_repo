import { useState, useEffect } from "react";

function App() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
    },[]);

    async function getUsers(){
        try{
            let response = await fetch("https://jsonplaceholder.typicode.com/users")
            .then((res) => res.json()
            .then((users) => setUsers(users)));
            if(!response.ok){
                console.error("Couldn't fetch data")
            }
        }catch(err){
            console.log(err);
        }
    }

    return(
        <div>
            <h1>User Data</h1>
            <ul>
                {users.map((user) => (
                    <li style={{fontSize: "18px"}} key={user.id}> 
                                    name: {user.name} <br />
                                    email: {user.email} <br />
                                    city: {user.address.city}
                    
                    </li>
                ))}
            </ul>
        </div>
    )
}
 

export default App;
