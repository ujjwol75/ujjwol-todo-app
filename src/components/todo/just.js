import React, { useEffect, useState } from 'react';
import './style.css';

// get local storage 
const getLocalData = () =>{
    const lists = localStorage.getItem("mytodolist");
    if (lists){
        return JSON.parse(lists);
    }else{
        return [];
    }
}

const Todo = () => {
    const [inputValue, setInputValue] = useState("");
    const [items, setItems] = useState(getLocalData());
    const [isEditItem, setIsEditItem] = useState("");
    const [toggleButton, setToggleButton] = useState(false);

    // to add new items 
    const addItems = () => {
        if (!inputValue){
            alert('Please fill up form');
        }
        else{
            const myNewInputData = {
                id: new Date().getTime().toString(),
                name: inputValue
            };
            setItems([...items, myNewInputData]);
            setInputValue("");
        }
    };

    const editItem = (index) =>{
        const item_todo_edited = items.find((curElem) => {
            return curElem.id === index;
        });
        setInputValue(item_todo_edited.name);
        setIsEditItem(index);
        setToggleButton(true);

    }

    // delete particular item from the todo list 
    const deleteItem = (index) =>{
        const updatedItems = items.filter((curElem) => {
            return curElem.id !== index;
        });
        setItems(updatedItems);
    };

    // remove all items
    const removeAll = () =>{
        setItems([]);
    }

    useEffect(() =>{
        localStorage.setItems("mytodolist", JSON.stringify(items))
    }, [items])
  return (
    <>
        <div className="main-div">
            <div className="child-div">
                <figure>
                    <img src="./images/todo.svg" alt="" />
                    <figcaption>Add Your List Here</figcaption>
                </figure>
                <div className="addItems">
                    <input type="text" placeholder='✍ Add Item...' className='form-control' 
                    value = {inputValue}
                    onChange = {(e) => {setInputValue(e.target.value)}}
                    />
                    {toggleButton ? <i className='far fa-edit add-btn ' onClick={addItems}></i> : <i className='fa fa-plus add-btn ' onClick={addItems}></i>}
                    
                </div>

                <div className="showItems">
                    {items.map((curElem) => {
                        return (
                            <div className="eachItem" key={curElem.id}>
                                <h1>{ curElem.name }</h1>
                                <div className="todo-btn">
                                <i className='far fa-edit add-btn ' onClick={() => editItem(curElem.id)}></i>
                                <i className='far fa-trash-alt add-btn ' onClick={() => deleteItem(curElem.id)}></i> 
                            </div>
                    </div>
                        )
                    })}
                    
                </div>

                <div className="showItems">
                    <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}>
                       <span> CHECK LIST </span>
                    </button>
                </div>
            </div>
        </div>
    </>
  );
};

export default Todo;