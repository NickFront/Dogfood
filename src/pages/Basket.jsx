import { Trash3, Dash, Plus, Truck, EmojiFrown } from "react-bootstrap-icons";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Ctx from "../context";
import inc from "../utils/inc";
import dec from "../utils/dec";


const Basket = () => {
    const { basket, setBasket, goods } = useContext(Ctx);

    const sum = basket.reduce((acc, el) => {
        return acc + el.cnt * el.price
    }, 0)
    const endSum = basket.reduce((acc, el) => {
        return acc + el.cnt * el.price * (1 - el.discount / 100)
    }, 0)
    const sale = endSum - sum;
    const totalCnt = basket.reduce((acc, el) => {
        return acc + el.cnt
    }, 0)

    const delProd = (id) => {
        setBasket(prev => prev.filter(el => el.id !== id))
    }

    const clearBasket = () => {
        setBasket([])
    }

    const textCnt = (cnt) => {
        if (cnt % 100 >= 5 && cnt % 100 <= 20) {
            return cnt + ' товаров';
        }
        if (cnt % 100 === 1 || cnt % 10 === 1) {
            return cnt + ' товар';
        } else if (cnt % 100 >= 22 && cnt % 100 <= 24 || cnt % 10 >= 2 && cnt % 10 <= 4) {
            return cnt + ' товара';
        } else {
            return cnt + ' товаров';
        }
    }

    return (
        <div className="wrapper__product">
            <h1>
                {textCnt(totalCnt)} в корзине
            </h1>
            {basket.length > 0 ?
                <div className="product__block">
                    <div className="basket__block_left">
                        {basket
                        // .filter(el => {
                        //     return goods.some(item => item._id === el.id)
                        // })
                        .map(el => <div key={el.id}>
                            <div className="basket__block">
                                <div className="reviews__img">
                                    <img src={el.img} alt={el.name} height="100" />
                                </div>
                                <div className="basket__name">
                                    <Link to={`/product/${el.id}`}>{el.name}</Link>
                                    <p className="btn__grey">{el.wight}</p>
                                </div>
                                <div className="product__add">
                                    <button className="product__btn" onClick={() => dec(el.id, el.cnt, setBasket)}><Dash /></button>
                                    <span className="font__bold">{el.cnt}</span>
                                    <button className="product__btn" onClick={() => inc(el.id, setBasket)}><Plus /></button>
                                </div>
                                <span className="basket__price">
                                    {el.discount > 0
                                        ? <>
                                            <del>{el.price * el.cnt}&nbsp;₽</del>
                                            <span className="font__bold">{(el.price * (100 - el.discount) / 100) * el.cnt}&nbsp;₽</span>
                                        </>
                                        : <p className="font__bold">{el.price * el.cnt}&nbsp;₽</p>
                                    }
                                </span>
                                <button className="transition basket__delete"
                                    onClick={() => { delProd(el.id) }}
                                ><Trash3 /></button>
                            </div>
                            <hr />
                        </div>
                        )}
                        <button className="product__add-reviews"
                            onClick={() => clearBasket()}
                        >Очистить корзину</button>
                    </div>
                    <div className="block__rigth ">
                        <div className="product__block_rigth shadow">
                            <h4>Ваша корзина</h4>
                            <div className="basket__block">
                                <p className="btn__grey">Товары({totalCnt})</p>
                                <p>{sum} ₽</p>
                            </div>
                            <div className="basket__block">
                                <p className="btn__grey">Скидка</p>
                                <span>{sale} ₽</span>
                            </div>
                            <hr />
                            <div className="basket__block">
                                <p className="font__bold">Общая стоимость</p>
                                <p className="font__bold">{endSum.toFixed(2)} ₽</p>
                            </div>
                            <button className="pay__btn pay__btn_basket">Оформить заказ</button>
                        </div>
                        <div className="product__block product__block_team-gray product__block_none">
                            <span className="font__gray"><Truck /></span>
                            <div className="product__block_rigth">
                                <h5>Доставка по всему миру!</h5>
                                <p>Доставка курьером &mdash; <span className="font__bold">от 399&nbsp;₽</span></p>
                                <p>Доставка в пункт выдачи &mdash; <span className="font__bold">от 199&nbsp;₽</span></p>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className="basket__empty">
                    <div><EmojiFrown /></div>
                    <p className="font__bold">В корзине нет товаров</p>
                    <p className="basket__delete">Добавьте товар, нажав на кнопку «В корзину» в карточке товара</p>
                    <Link to={"/"}><p className="product__add-reviews basket__empty_btn">На главную</p></Link>
                </div>
            }
        </div>

    )
}

export default Basket;