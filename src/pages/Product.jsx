import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { ChevronLeft, Plus, Dash, HeartFill, Heart, Truck, Check2Circle } from "react-bootstrap-icons";
import Ctx from "../context";
import updLike from "../utils/updLike";
import addToBasket from "../utils/addToBasket";
import dec from "../utils/dec";
import inc from "../utils/inc";

import Loader from "../components/Loader";
import ModalEditProd from "../components/ModalEditProd";


const Product = () => {
    const { userId, setServerGoods, api, basket, setBasket, modalEdit, setModalEdit } = useContext(Ctx);
    const [product, setProduct] = useState({});
    const [count, setCount] = useState(basket.filter(el => el.id === product._id).length > 0 ?
        basket.filter(el => el.id === product._id)[0].cnt
        : 1);
    const [text, setText] = useState("");
    const [isLike, setIsLike] = useState(false);
    const [modalRevActive, setModalRevActive] = useState(false);
    const [inBasket, setInBasket] = useState(false);
    // const [modalEdit, setModalEdit] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    const clickCountUp = (id) => {
        setCount(count + 1);
        inc(id, setBasket);
        setCount(basket.filter(el => el.id === product._id).length > 0 ?
            basket.filter(el => el.id === product._id)[0].cnt
            : count
        );
    }

    const clickCountDown = (id) => {
        setCount(count - 1)
        if (count === 1) {
            setInBasket(false)
        }
        dec(id, count, setBasket)
        setCount(basket.filter(el => el.id === product._id).length > 0 ?
            basket.filter(el => el.id === product._id)[0].cnt
            : count
        );
    }

    const clearForm = () => {
        setText("");
    }

    const editProd = () => {
        setModalEdit(true);
    }

    useEffect(() => {
        // fetch(`https://api.react-learning.ru/products/${id}`, {
        //     headers: {
        //         "Authorization": `Bearer ${token}`
        //     }
        // })
        //     .then(res => res.json())
        api.getSingleProduct(id)
            .then(data => {
                if (!data.err) {
                    console.log(data);
                    setProduct(data);
                    setIsLike(data.likes.includes(localStorage.getItem("rockId")));
                    setInBasket(basket.filter(el => el.id === data._id).length > 0);
                    setCount(basket.filter(el => el.id === data._id).length > 0 ?
                        basket.filter(el => el.id === data._id)[0].cnt
                        : count
                    );
                }
            })
    }, []);

    const sendForm = (e) => {
        e.preventDefault();
        let body = {
            text: text
        }
        // fetch(`https://api.react-learning.ru/products/review/${id}`, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //         "Authorization": `Bearer ${token}`
        //     },
        //     body: JSON.stringify(body)
        // })
        //     .then(res => res.json())
        api.addReview(id, body)
            .then(data => {
                setProduct(data);
            })
        clearForm();
        setModalRevActive(false);
    }

    const deleteRev = (idRev) => {
        // fetch(`https://api.react-learning.ru/products/review/${product._id}/${idRev}`, {
        //     method: "DELETE",
        //     headers: {
        //         "Authorization": `Bearer ${token}`
        //     }
        // })
        //     .then(res => res.json())
        api.delReview(id, idRev)
            .then(data => {
                setProduct(data);
            })
    }

    const delProduct = () => {
        // fetch("https://api.react-learning.ru/products/${id}", {
        //     method: "DELETE",
        //     headers: {
        //         "Authorization": `Bearer ${token}`
        //     }
        // })
        //     .then(res => res.json())
        api.delProduct(id)
            .then(data => {
                setServerGoods(prev => prev.filter(el => el._id !== id));
                if (basket.filter(el => el.id === id)) {
                    setBasket(prev => prev.filter(el => el.id !== id))
                };
                navigate("/catalog")
            })
    }

    return (
        <div className="wrapper__product maxwidth"
        >
            <button className="btn__gray" onClick={() => navigate(-1)}><ChevronLeft />&nbsp;Назад</button>
            {product.name
                ?
                <div className="product">
                    <div className="product__block">
                        <div className="product__block_left">
                            <h2>{product.name}</h2>
                            <p><img src={product.pictures} alt={product.name} className="product__img" /></p>
                        </div>
                        <div className="block__rigth">
                            <span className="product__price">
                                {product.discount > 0
                                    ? <>
                                        <del>{product.price}&nbsp;₽</del>
                                        <span className="font__bold">{product.price * (100 - product.discount) / 100}&nbsp;₽</span>
                                    </>
                                    : <p className="font__bold">{product.price}&nbsp;₽</p>
                                }
                            </span>
                            <div className="product__block">
                                {
                                    inBasket && <div className="product__add">
                                        <button className="product__btn"
                                            onClick={() => clickCountDown(product._id)}
                                        >
                                            <Dash /></button>
                                        <span className="font__bold">{count}</span>
                                        <button className="product__btn"
                                            onClick={() => clickCountUp(product._id)}
                                        >
                                            <Plus /></button>
                                    </div>
                                }

                                <button className="pay__btn transition font__bold pay__btn_mobile"
                                    onClick={(e) => addToBasket(e, setInBasket, setBasket, product._id, product.name, product.pictures, product.price, product.discount, product.wight, count)}
                                    disabled={inBasket}
                                >
                                    {inBasket ? "В корзине" : "В корзину"}
                                </button>
                            </div>
                            <button className="btn__gray"
                                onClick={(e) => updLike(e, !isLike, setIsLike, setServerGoods, product._id, api)}
                            >
                                {isLike ? <HeartFill /> : <Heart />} &nbsp;В избранное
                            </button>
                            <div className="product__block product__block_team-gray product__block_none">
                                <span className="font__gray"><Truck /></span>
                                <div className="product__block_rigth">
                                    <h5>Доставка по всему миру!</h5>
                                    <p>Доставка курьером &mdash; <span className="font__bold">от 399&nbsp;₽</span></p>
                                    <p>Доставка в пункт выдачи &mdash; <span className="font__bold">от 199&nbsp;₽</span></p>
                                </div>
                            </div>
                            <div className="product__block product__block_team-gray product__block_none">
                                <span className="font__gray"><Check2Circle /></span>
                                <div className="product__block_rigth">
                                    <h5>Гарантия качества</h5>
                                    <p>Если Вам не понравилось качество нашей продукции, мы вернем деньги, либо сделаем все возможное, чтобы удовлетворить Ваши нужды.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="product__block">
                        <div className="product__block_left">
                            <h3>Описание</h3>
                            <span>{product.description}</span>
                        </div>
                        {userId === product.author._id &&
                            <div className="product">
                                <button className="product__add product__delete transition"
                                    onClick={delProduct}
                                >Удалить товар</button>
                                <button className="product__add product__delete transition"
                                    onClick={editProd}
                                >Изменить товар</button>
                            </div>

                        }
                    </div>
                    <div className="product__block_left">
                        <h3>Характеристики</h3>
                        <div className="product__char">
                            <div className="product__char_row">
                                <span>Вес</span>
                            </div>
                            <span>{product.wight}</span>
                        </div>
                    </div>
                    <div className="product__block product__block_team-gray product__block_flex">
                        <span className="font__gray"><Truck /></span>
                        <div className="product__block_rigth">
                            <h4>Доставка по всему миру!</h4>
                            <p>Доставка курьером &mdash; <span className="font__bold">от 399&nbsp;₽</span></p>
                            <p>Доставка в пункт выдачи &mdash; <span className="font__bold">от 199&nbsp;₽</span></p>
                        </div>
                    </div>
                    <div className="product__block product__block_team-gray product__block_flex">
                        <span className="font__gray"><Check2Circle /></span>
                        <div className="product__block_rigth">
                            <h4>Гарантия качества</h4>
                            <p>Если Вам не понравилось качество нашей продукции, мы вернем деньги, либо сделаем все возможное, чтобы удовлетворить Ваши нужды.</p>
                        </div>
                    </div>
                    <div className="product__block_left">
                        <h3>Отзывы</h3>
                        <button className="product__add-reviews font__bold transition"
                            onClick={() => setModalRevActive(true)}>Написать отзыв</button>
                        {(product.reviews.length > 0) ?
                            product.reviews.map((el, i) =>
                                <div className="product__block_left" key={i}>
                                    <h4>{el.author.name}</h4>
                                    <p>{el.text}</p>
                                    {el.author._id === userId &&
                                        <div>
                                            <button className="modal-link maxwidth_btn" onClick={() => deleteRev(el._id)}>Удалить отзыв</button>
                                        </div>
                                    }
                                    <hr />
                                </div>
                            )
                            :
                            <p>Пока здесь нет отзывов</p>
                        }
                    </div>
                </div>
                : <Loader />
            }
            <div className="modal__reviews"
                style={{ display: modalRevActive ? "flex" : "none" }}>
                <div className="reviews">
                    <button className="btn_close transition"
                        onClick={() => setModalRevActive(false)}>х</button>
                    <div className="reviews__product">
                        <p><img src={product.pictures} alt={product.name} className="reviews__img" /></p>
                        <div className="reviews__name">{product.name} </div>
                    </div>
                    <form onSubmit={sendForm}>
                        <label>
                            <h3>Ваш отзыв</h3>
                            <textarea
                                placeholder="Введите текст"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            />
                        </label>
                        <button className="modal-link maxwidth_btn">Отправить</button>
                    </form>
                </div>
            </div>
            {modalEdit && <ModalEditProd
                show={modalEdit}
                onHide={() => setModalEdit(false)}
                nameProd={product.name}
                priceProd={product.price}
                disProd={product.discount}
                wightProd={product.wight}
                stockProd={product.stock}
                tagsProd={product.tags}
                imgProd={product.pictures}
                desProd={product.description}
                _id={product._id}
                setProduct={setProduct}
            />}
        </div>
    )
}
export default Product;