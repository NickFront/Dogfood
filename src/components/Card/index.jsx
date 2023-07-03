import { useState, useContext } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { Heart, HeartFill, Percent } from "react-bootstrap-icons";
import Ctx from "../../context";
import addToBasket from "../../utils/addToBasket";
import updLike from "../../utils/updLike";

const Card = ({ img, name, price, _id, discount, wight, tags, likes }) => {
    const { setServerGoods, api, setBasket, basket } = useContext(Ctx);
    const [isLike, setIsLike] = useState(likes.includes(localStorage.getItem("rockId")));
    const [inBasket, setInBasket] = useState(basket.filter(el => el.id === _id).length > 0);

    return (
        <Link className="card" to={`/product/${_id}`}>
            {discount > 0 && <span className="card__discount"><Percent />{discount}</span>}
            <span className="card__like" onClick={(e) => updLike(e, !isLike, setIsLike, setServerGoods, _id, api)}>
                {isLike ? <HeartFill /> : <Heart />}
            </span>
            <img src={img} alt="Картинка" className="card__img" />
            <span className="card__name">{name}</span>
            <span className="card__price">
                {discount > 0
                    ? <>
                        <del>{price}</del>
                        &nbsp;
                        {price * (100 - discount) / 100}
                    </>
                    : price
                }
                &nbsp;₽
            </span>
            <button className="pay__btn transition"
                onClick={(e) => addToBasket(e, setInBasket, setBasket, _id, name, img, price, discount, wight)}
                disabled={inBasket}
            >{inBasket ? "В корзине" : "В корзину"}</button>
            {/* <span className="card__tags">
                {tags.map(el => <span key={el}>{el}</span>)}
            </span> */}
        </Link>
    )
}

export default Card;