import { useEffect, useState } from "react"
import ProductTableRow from "./components/ProductTableRow"

const App = () =>{
  const [products, setProduct] = useState([])
  const [input, setInput] = useState({
    id:"",
    name:"",
    description:""
  })
  const SubmitForm = (e)=>{
    e.preventDefault();
    if(input.name!="" && input.description!="")
    {
      onAdd();
      setInput(
        { id:"",
        name:"",
        description:""}
      )
    } else {
      return alert("Please fill all fields");
    }
  }

  const onAdd = ()=>{
    fetch("http://localhost:3000/products",
      {
        method:"POST",
        headers:{
          "Accept":"application/json",
          "Content-Type":"application/json"
        },
        body:JSON.stringify(input)
      }
    )
    .then(response=>response.json())
    .then(data=>setProduct([...products,data]))
    .catch(error=>console.log(error))
  }

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
        const newProduct = products.filter(p=>{
          return p.id!=id;
        })
        setProduct(newProduct);
      }
    })
    .catch(error=>console.log(error))
  }

  useEffect(()=>{
    //fetch call
    fetch("http://localhost:3000/products",{
      method:"GET",
      headers:{
        "Accept":"application/json",
        "Content-Type":"application/json"
      }
    })
    .then(response=>response.json())
    .then(data=>setProduct(data))
    .catch(error=>console.log(error))
  },[])
  return (
    <>
      <h1>Products</h1>
      <form>
        <div>
          <label htmlFor="id">Id</label>
          <input type="number" name="id" id="id" 
          onChange={(e)=>{
              setInput({...input, [e.target.name]:e.target.value})
          }}
          value={input.id}  />
        </div>
        <div>
          <label htmlFor="Name">Name</label>
          <input type="text" name="name" id="name"
          onChange={(e)=>{
            setInput({...input, [e.target.name]:e.target.value})
        }}
        value={input.name}  />
        </div>
        <div>
          <label htmlFor="Description"></label>
          <textarea name="description" id="description" cols="30" rows="10"
          onChange={(e)=>{
            setInput({...input, [e.target.name]:e.target.value})
        }}
        value={input.description} 
          ></textarea>
        </div>
        <div>
          <input type="button" value="Save" onClick={SubmitForm} />
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
          products.length>0?
          <ProductTableRow productsData={products} onDelete={onDelete}/>
          :<tr><th colSpan={4}>No data available</th></tr>
        }
      </tbody>
    </table>
  </>
  )
}

export default App