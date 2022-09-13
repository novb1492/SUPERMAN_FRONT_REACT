
import { Link } from 'react-router-dom';

function ProductList({data}) {
    return (
        <li>
           <Link to={"/product/detail/"+data.id}> 
             {JSON.stringify({data})}
             <p>{data.state===0 ? '품절되었습니다' : null}</p>
           </Link>
        </li>
    )
}

export default ProductList;