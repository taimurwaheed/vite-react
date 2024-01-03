// ProductTableRow component is a functional component that renders a table row for each product.
const ProductTableRow = ({ productsData, onDelete, onEdit }) => {
    return (
      // Mapping through the array of products to create a table row for each product
      productsData.map((data, index) => {
        return (
          // Each table row has a unique key based on the index in the productsData array
          <tr key={index}>
            {/* Displaying product information in individual table cells */}
            <td>{data.id}</td>
            <td>{data.name}</td>
            <td>{data.description}</td>
            <td>
              {/* Delete button with an onClick event that triggers the onDelete function with the product's ID */}
              <button onClick={() => {
                onDelete(data.id);
              }}>Delete</button>
              {/* Separator between Delete and Edit buttons */}
              {' | '}
              {/* Edit button (not implemented in this code snippet) */}
              <button onClick={() => onEdit(data)}>Edit</button>
            </td>
          </tr>
        );
      })
    );
  };
  
  // Exporting the ProductTableRow component for use in other parts of the application
  export default ProductTableRow;
  