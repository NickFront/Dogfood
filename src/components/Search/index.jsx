import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Binoculars } from "react-bootstrap-icons";
import "./style.css";
import Ctx from "../../context";

const Search = ({ arr, upd }) => {
    const {text, setText} = useContext(Ctx);
    const [quantity, setQuantity] = useState(arr.length);

    const searchByText = (event) => {
        let val = event.target.value;
        setText(val);
        let result = arr.filter(el => new RegExp(val, "i").test(el.name));
        upd(result);
        setQuantity(result.length);
        console.log(result);
    }
    return (
        <div className="search__block">
            <input type="search" className="search" value={text} onChange={searchByText} placeholder="Поиск" />
            <Link to="/catalog">
                <button className="transition"><Binoculars /></button>
            </Link>

            {/* <hr /> */}
            {/* <div>{text}, {n}, {count}</div> */}
            {/* <div>По Вашему запросу «{text}» найдено {quantity} подходящих товаров</div> */}
        </div>
    )
}

export default Search;