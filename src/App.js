import React from "react";
import "./App.css";
import { Route, Link, Switch } from "react-router-dom";
import Display from "./Display";
import Form from "./Form";
// import { set } from "../../backend/DB/conn";

function App() {

 // Variable to hold url
 const url = "https://zendogsbackend.herokuapp.com"

 //State to Hold Dogs
 const [dogs, setDogs] = React.useState([])

 //Empty Dog
 const emptyDog = {
   name: "",
   age: 0,
   img: ""
 }

 //selectedDog State, this will represent the dog to be edited
 const [selectedDog, setSelectedDog] = React.useState(emptyDog);

 // Function to get dogs via API
 const getDogs = () => {
   fetch(url + "/dog")
   .then(response => response.json())
   .then(data => {
     console.log(data)
     setDogs(data)
   })
 }

 // useEffect to do initial call of getDogs
 React.useEffect(() => {
   getDogs()
 }, [])

 //handleCreate function for creating new dogs
const handleCreate = (newDog) => {
  fetch(url + "/dog/", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newDog),
  }).then(() => {
    // don't need the response from the post but will be using the .then to update the list of dogs
    getDogs();
  });
};

  //handeUpdate for when you use the update form
  const handleUpdate = (dog) => {
    fetch(url + "/dog/" + dog._id, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dog),
    }).then((response) => getDogs());
  };

//Set the state when you select a dog to edit
  const selectDog = (dog) => {
    setSelectedDog(dog);
  };

  //Function to delete dog
  const deleteDog = (dog) => {
    fetch(url + "/dog/" + dog._id, {
      method: "delete",
    }).then((response) => getDogs());
  };

  return (
    <div className="App">
      <h1>DOG LISTING SITE</h1>
      <hr />
      <Link to="/create">
        <button>Add Dog</button>
      </Link>
      <main>
        <Switch>
        <Route
            exact
            path="/"
            render={(rp) => (<Display 
              selectDog={selectDog} {...rp} dogs={dogs}
              deleteDog= {deleteDog} />)}
          />
          <Route
            exact
            path="/create"
            render={(rp) => (
              <Form
                {...rp}
                label="create"
                dog={emptyDog}
                handleSubmit={handleCreate}
              />
            )}
          />
          <Route
            exact
            path="/edit"
            render={(rp) => (
              <Form {...rp} label="update" dog={selectedDog} handleSubmit={handleUpdate} />
            )}
          />
        </Switch>
      </main>
    </div>
  );
}

export default App;
