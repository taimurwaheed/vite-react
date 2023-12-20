const ProductTableRow = ({productsData, onDelete}) =>{
    return (
        productsData.map((data, index)=>{
            return(
                <tr key={index}>
                    <td>{data.id}</td>
                    <td>{data.name}</td>
                    <td>{data.description}</td>
                    <td>
                        <button onClick={()=>{
                            onDelete(data.id)
                        }}>Delete</button> |
                        <button>Edit</button>
                    </td>
                </tr>
            )
        })
    )
}
export default ProductTableRow