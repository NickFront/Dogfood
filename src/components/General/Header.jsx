import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Folder2, Star, Cart4, PersonCircle, BoxArrowInRight, PlusSquare } from "react-bootstrap-icons";
import Logo from "./Logo";
import Search from "../Search";
import Ctx from "../../context";

const Header = () => {
    const { user, userId, setGoods, setModalActive, serverGoods, basket } = useContext(Ctx);
    const [likeCnt, setLikeCnt] = useState(0);
    const [cardCnt, setCardCnt] = useState(0);

    useEffect(() => {
        setLikeCnt(serverGoods.filter(el => el.likes.includes(userId)).length)
    }, [serverGoods])

    useEffect(() => {
        let cnt = 0;
        for (let i = 0; i < basket.length; i++) {
            cnt += basket[i].cnt
        }
        setCardCnt(cnt);
    }, [basket])

    const logIn = (e) => {
        e.preventDefault();
        localStorage.setItem("rockUser", "lk-band");
        setModalActive(true);
    }

    return (
        <div className="wrapper__box">
            <header>
                <div className="header__nav">
                    <Logo />
                    {user && <div className="header__search">
                        <Search arr={serverGoods} upd={setGoods} />
                    </div>}
                    <nav className="header__menu">
                        {/* Если пользователь === true */}
                        {user && <>
                            <span className="transition">
                                <Link to="/add" title="Добавить товар">
                                    <PlusSquare />
                                </Link>
                            </span>
                            <span className="transition">
                                <Link to="/catalog" title="Каталог">
                                    <Folder2 />
                                </Link>
                            </span>
                            <span className="transition">
                                <Link to="/favorites" title="Избранное" className="badge__el">
                                    <Star />
                                    <span className="badge__item">{likeCnt}</span>
                                </Link>
                            </span>
                            <span className="transition">
                                <Link to="/basket" title="Корзина" className="badge__el">
                                    <Cart4 />
                                    <span className="badge__item">{cardCnt}</span>
                                </Link>
                            </span>
                            <span className="transition">
                                <Link to="/profile" title="Профиль">
                                    <PersonCircle />
                                </Link>
                            </span>

                        </>}
                        {!user && <a href="" onClick={logIn} title="Войти">
                            <BoxArrowInRight />
                        </a>}
                    </nav>
                </div>
            </header>
        </div>
    )
}


export default Header;