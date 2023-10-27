import './App.css';
import { useState } from 'react';

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

  return (
    /*  
        Die App besteht aus zwei Komponenten: 
        1. Todoimputfield bestehend aus Eingabefeld und Button
        2. ToDoList - eine tabelle, die alle Todos anzeigen soll
    */
    <>
      <TodoInputField onAddNewItem={updateTodoList} inputId= {fieldID} ></TodoInputField>
      <ToDoList items={todos}></ToDoList>
    </>
  );
}

//Generate a unique 4 digit ID
function generateID(){
  return Math.floor(Math.random() * 10000);
}

//Delete an item from the list
function deleteItem(id){
  alert("Delete Item with ID: "+id);
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

function ToDoList({items}){
  
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
                  return(<tr>
                          <th scope="row">{index+1}</th>
                          <td>{item.value}</td>
                          <td><i className="bi bi-pencil-square"></i></td>
                          <td><i className="bi bi-trash"></i></td>
                        </tr>)
                    }
                  )
                }     
              </tbody>
            </table>
          </div>
        </>)
}

export default App;

