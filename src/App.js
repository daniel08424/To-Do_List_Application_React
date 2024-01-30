
//import Content from './Content.js';
import Header from './Header.js';
import Footer from './Foot.js';
import './index.css' 
import { useState } from 'react'
import List from './list.js'
import AddingItem from './AddingItem.js';
import Search from './Search.js';
import { useEffect } from 'react'; 
import api_request from './api_request.js';

function App() {
//by using props drilling write the child component
//function & object to the parent component and pass
//the fuctions as parameter to the list component

  //To fetch the data from the API link
  const API_URL = "http://localhost:3500/items"

  const [namees,setName] = useState([]) /* the localstorage data is used inside useEffect hooks*/

  const [newItem,setNewItem] = useState('')

  const[search,setSearch] = useState('')

  //to control the state of the error we use useState()
  const[fetchError,setFetchError] = useState(null)

  //we set the useSatate() for loading as true when we first open the webPage
  const[loading,SetIsLoading] = useState(true)


 //useEffect is executed whenever there is a change in state of the component that is given in [].

 //console.log("before use effect")  

  useEffect(()=>{ 
    console.log("updation or deletion is happened in namees array")
    //JSON.parse(localStorage.getItem('ToDolist'))

    //To fetch The data From the API
    const fetch_items = async() => {
      try{

        //fetch(API_URL) will fetch the data from the const API_URL
        const response = await fetch(API_URL)
        console.log(response)

        //if the data from the url is not received due to typo mistake or some reasons it will throw the error message
        if(!response.ok) throw Error("Data not received")

        //since the fetched data from the API_URL is in another fromat
        //so we convert the response to the JSON format
        const list = await response.json() 
        console.log(list)
        //update the list items to the namees by setName using useState
        setName(list)
        
        // if no error occurs it will return null and store in fetchError variable in useState()
        setFetchError(null)
      }
      catch(error){
        //if any error occurs it will give error messsage and store in fetchError variable in useState()
        setFetchError(error.message)
        console.log(error)
      }
      //finally is used if try or catch is successfully executed
      finally{
        SetIsLoading(false)
      }
    }

    //we stimulate the fetching of data in 2 seconds delay so that we can print loading on that delay
    //this is just an example how can we print loading on the webpage if any data fetching delay occurs
    setTimeout(()=>{
    //We have to call the async() function by this
    (async()=> await fetch_items())() //() is given aftre the async() function to kickstart the function
    },2000)

  },/*Here the dependancy component is given*/[]) 

  //console.log("after use effect")
  

  const addItem = async (item)=>{
                          //[ 3 - 1 ] = 2 where id for array 2 is 3 + 1 = 4
    const id = namees.length ? namees[namees.length - 1].id + 1 : 1 
    console.log(id)
    const addNewItem = {id,checked:false,item}
    // ...items -> means that the array inside the items function
               //  is also present while adding new addNewItem array 
    const AddList = [...namees,addNewItem]

    //update the new array to the setName variable in useState

    setName(AddList)

    //While fetching the data from API we dont need localStorage
    //localStorage.setItem('ToDolist',JSON.stringify(AddList))

    //we have to create an object for the postOptions in the addList
    //in the addItem function we are adding the list here
    //so postOption request also called here

    const postOptions = {
      method:'POST',
      headers : {
        'Content-Type':'application/json'
      },
      body: JSON.stringify(addNewItem)
    }

    const result = await api_request(API_URL,postOptions)
    if(result) setFetchError(result)

  }

  const handleCheck= async(id)=>{
    console.log(`key is :${id}`)
    const listName = namees.map((check)=>
      check.id===id ? {...check,checked:!check.checked} : check
    )
    setName(listName)

    //While fetching the data from API we dont need localStorage
    //localStorage.setItem("ToDolist",JSON.stringify(listName))

    const myItem = listName.filter((check)=>check.id===id)

    //here is the object for updateOption
    //in the handleCheck function we are calling the api_function with the update request
    const updateOption = {
      // since it is an update in the database we have to declare the method as 'PATCH'
      method: 'PATCH',
      headers : {
        'Content-Type':'application/json'
        
      },
      body: JSON.stringify({checked : myItem[0].checked})
    }

    //here if we want to update any list we want that id to update the particular list
    //so we have to call the URL along with the id that is been updated
    const requesturl = `${API_URL}/${id}`
    const result = await api_request(requesturl,updateOption)
    if(result) setFetchError(result)

  }

  const deletefn = async(id)=>{
    console.log(`key is :${id}`)
    const listName = namees.filter((check)=>
    check.id!==id )
    setName(listName)

    //While fetching the data from API we dont need localStorage
    //localStorage.setItem("ToDolist",JSON.stringify(listName))

    //here is the object for DELETE operation
    //since it is a delete opereation, there is no need to specify the headers and body

    const deleteOption = {
      method : 'DELETE'
    }

    //here if we want to delete any list we want that id to delete the particular list
    //so we have to call the URL along with the id that is been deleted
    const requestedurl = `${API_URL}/${id}`
    const result = await api_request(requestedurl,deleteOption)
    if(result) setFetchError(result)
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    console.log('submitted',newItem)
    if(!newItem) return;
    //add the item
    addItem(newItem)
    setNewItem('') // it will return  the newItem State to empty when the value inside the box is submitted
  }


  return (
    <div className="App">
      <Header /*title = "TO DO LIST" *//>
      {/* <Content /> */}
      <AddingItem 
        newItem = {newItem}
        setNewItem = {setNewItem}
        handleSubmit = {handleSubmit}
      />
      <Search 
        search = {search}
        setSearch = {setSearch}
      />
      <List //passing as parameters
          //to search the particular task in toDoList use the filter to filter the task that
          //you searched and give the filtered task .
          
          namees = {namees.filter(item=>((item.item).toLowerCase()).includes(search.toLowerCase()))}
          handleCheck = {handleCheck}
          deletefn = {deletefn}  
          fetchError = {fetchError}
          loading={loading}
      />
      <Footer 
        length = {namees.length}/>

    </div>
  );
}

export default App;
