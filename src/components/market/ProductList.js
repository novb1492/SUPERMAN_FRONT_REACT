

function ProductList({data}) {
    return (
        <li>
          <a href={"/product/detail/"+data.id}>
             {JSON.stringify({data})}
             <p>{data.state===0 ? '품절되었습니다' : null}</p>
          </a>
        </li>
    )
}

export default ProductList;