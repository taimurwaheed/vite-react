import { useEffect, useState } from "react"
import ProductTableRow from "./components/ProductTableRow"

// Defining a functional component named 'App'
const App = () =>{
  
  // Using the 'useState' hook to create state variables 'products' and 'input'
  const [products, setProduct] = useState([])
  const [input, setInput] = useState({
    id:"",
    name:"",
    description:""
  })

  // Handling form submission
  const SubmitForm = (e)=>{
    e.preventDefault();
    // Checking if 'name' and 'description' fields are not empty
    if(input.name!="" && input.description!="")
    { 
      // If conditions are met, call 'onAdd' function
      onAdd();
      // Resetting the 'input' state to empty values
      setInput(
        { id:"",
        name:"",
        description:""}
      )
    } else {
      return alert("Please fill all fields");
    }
  }

  // Adding a new product
  const onAdd = ()=>{
    fetch("http://localhost:3000/products",
      {
        method:"POST",
        headers:{
          "Accept":"application/json",
          "Content-Type":"application/json"
        },
        // Converting 'input' data to JSON and sending it in the request body
        body:JSON.stringify(input)
      }
    )
    .then(response=>response.json())
    
    // Updating the 'products' state with the new product
    .then(data=>setProduct([...products,data]))
    .catch(error=>console.log(error))
  }

  // Deleting a product by ID
  const onDelete = (id)=>{
    fetch(`http://localhost:3000/products/${id}`,
    {
      method:"DELETE",
      headers:{
        "Accept":"application/json",
        "Content-Type":"application/json"
      }
    })
    .then(response=>{
      if(response.ok){
        
        // Filtering out the deleted product from 'products' and updating the state
        const newProduct = products.filter(p=>{
          return p.id!=id;
        })
        setProduct(newProduct);
      }
    })
    .catch(error=>console.log(error))
  }

  // Fetching products from the server on component mount
  useEffect(()=>{
    //fetch call
    fetch("http://localhost:3000/products",{
      method:"GET",
      headers:{
        "Accept":"application/json",
        "Content-Type":"application/json"
      }
    })
    
    // Handling the response by converting it to JSON
    .then(response=>response.json())
    
    // Updating the 'products' state with the fetched data
    .then(data=>setProduct(data))
    .catch(error=>console.log(error))
  },[]) // Empty dependency array means it runs only once when the component mounts 

  // Rendering the UI of the component
  return (
    <>
      <h1>Products</h1>
      <form>
        <div>
          <label htmlFor="id">Id</label>
          <input type="number" name="id" id="id" 
          // When the value in the 'Id' input changes, update the 'input' state
          onChange={(e)=>{
              // Spread the existing 'input' state and update the 'id' property
              setInput({...input, [e.target.name]:e.target.value})
          }}
          // Set the value of the 'Id' input to the current 'input.id' state
          value={input.id}  />
        </div>
        <div>
          <label htmlFor="Name">Name</label>
          <input type="text" name="name" id="name"
          // When the value in the 'Name' input changes, update the 'input' state
          onChange={(e)=>{
            // Spread the existing 'input' state and update the 'name' property
            setInput({...input, [e.target.name]:e.target.value})
        }}
        // Set the value of the 'Name' input to the current 'input.name' state
        value={input.name}  />
        </div>
        <div>
          <label htmlFor="Description"></label>
          <textarea name="description" id="description" cols="30" rows="10"
          // When the value in the 'Description' textarea changes, update the 'input' state
          onChange={(e)=>{
            // Spread the existing 'input' state and update the 'description' property
            setInput({...input, [e.target.name]:e.target.value})
        }}
        // Set the value of the 'Description' textarea to the current 'input.description' state
        value={input.description} 
          ></textarea>
        </div>
        <div>
          <input type="button" value="Save" 
          // When the 'Save' button is clicked, call the 'SubmitForm' function
          onClick={SubmitForm} />
        </div>
      </form>
      <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        { 
          // Checking if there are products to display
          products.length>0?
          /* If there are products, show the list of products using the ProductTableRow component */
          <ProductTableRow productsData={products} onDelete={onDelete}/>
          // If there are no products, show a message
          :<tr><th colSpan={4}>No data available</th></tr>
        }
      </tbody>
    </table>
  </>
  )
}

export default App