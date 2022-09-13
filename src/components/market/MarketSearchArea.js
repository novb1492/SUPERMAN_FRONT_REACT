import { useState } from "react";


function MarketSearchArea({searchFun}) {
    const selectList = [{name:'아이스크림',value:1}, {name:'정육',value:2},{name:'생선',value:3},{name:'기타',value:4},{name:'양곡',value:5},{name:'전체',value:2500}];
    const [text, setText] = useState('');
    const [category, setCategory] = useState(2500);
    function handleSelect(e){
        setCategory(e.target.value);
    };
    return (
        <div>
            <select onChange={handleSelect} value={category}>
                {selectList.map((item) => (
                    <option value={item.value} key={item.value}>
                        {item.name}
                    </option>
                ))}
            </select>
            <input type="text" value={text} onChange={(e)=>{
                setText(e.target.value);
            }}/>
            <button onClick={()=>{
                searchFun(text,category)
            }}>검색</button>
        </div>
    )
}

export default MarketSearchArea;