import './App.css';
import { useState, useEffect } from 'react';

function App() {
  //Initial wird ein leeres Array übergeben => keine Todos vorhanden
  const [todos, setTodos] = useState([]);
  
  let fieldID = "inputfield_newtodo" //Anhand der Field-ID wird das Eingabefeld erkannt

  function updateTodoList(){
    let newToDo ={ 
        value: document.getElementById(fieldID).value, 
        id: generateID() 
      }
    
    
    if(newToDo.value!==""){ 
      todos.push(newToDo)
      setTodos([...todos])
    }
    else{
      //DAS ITEM ist LEER. Es wird nichts hinzugefügt}
    }
  }


  function ToDoList({items}){

    //Delete an item from the list
    function handleDeleteItem(id) {
      alert("Delete Item with ID: "+id);
      //Filtere alle Items, die nicht gelöscht werden sollen
      let newItems = items.filter((item) => item.id !== id);
      //Setze die neue Liste
      setTodos(newItems);      
    }

    //Edit an item from the list
    function handleEditItem(id) {
      alert("Edit Item with ID: "+id);
          
      //make seperate copy of the list
      let newItems = [...items];
      //Find the item with the given ID
      let itemToEdit = newItems.find((item) => item.id === id);
      //Change the value of the item
      itemToEdit.value = prompt("Bitte neuen Wert eingeben", itemToEdit.value);
      //Setze die neue Liste
      setTodos(newItems);


    }
  
    return(<>
            <div className="container mt-5">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Beschreibung</th>
                    <th scope="col">Bearbeiten</th>
                    <th scope="col">Löschen</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map( (item, index )=> { 
                    return(
                      <tr key={item.id}>
                        <th scope="row">{index+1}</th>
                        <td>{item.value}</td>
                        <td><i className="bi bi-pencil-square" onClick={() => handleEditItem(item.id)}></i></td>
                        <td><i className="bi bi-trash" onClick={() => handleDeleteItem(item.id)}></i></td>
                      </tr>
                      )
                      }
                    )
                  }     
                </tbody>
              </table>
            </div>
          </>)
  }
  
  return (
    /*  
        Die App besteht aus zwei Komponenten: 
        1. Todoimputfield bestehend aus Eingabefeld und Button
        2. ToDoList - eine tabelle, die alle Todos anzeigen soll
    */
    <>
      <TodoInputField onAddNewItem={updateTodoList} inputId= {fieldID} ></TodoInputField>
      <ToDoList items={todos} ></ToDoList>
    </>
  );
}

/**
 * Die TodoInputField-Komponenten bestehend aus einem Eingabefeld und einem Button 
 * @param onAddNewItem - Callbackfuntkion, die bei Click auf den Button aufgerufen wird
 * @param inputId - ID des Eingabefelds
 * @param {*} param0 
 * @returns 
 */
function TodoInputField({onAddNewItem, inputId}){
  return (<>
            <div className="container mt-5">
              <div className="input-group row justify-content-md-center  ">
                <input id={inputId} type="text" className="form-control col " placeholder="Neue Aufgabe anlegen" aria-label="Recipient's username" aria-describedby="basic-addon2"></input>
                <div className="input-group-append  col">
                  <button onClick={onAddNewItem}  className="btn btn-primary btn-lg bi bi-plus-circle">add</button>
                </div>
              </div>
            </div>
          </>)
}




//Helperfunktionen
//Generate a unique 4 digit ID
function generateID(){
  return Math.floor(Math.random() * 10000);
}



export default App;

