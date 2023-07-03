import Logo from "./Logo";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Telegram, Whatsapp, Instagram, Folder2, Star, Cart4, PersonCircle, HouseFill } from "react-bootstrap-icons";
import Ctx from "../../context";

const Footer = () => {
    const { token } = useContext(Ctx);
    return (
        <div className="wrapper__box">
            <footer>
                <div className="footer__cell">
                    <Logo />
                    <div className="footer__cop">©{new Date().getFullYear()}</div>
                </div>
                {token && <div className="footer__cell">
                    <Link to="/catalog">Каталог</Link>
                    <Link to="/">Избранное</Link>
                    <Link to="/">Корзина</Link>
                </div>}
                <div className="footer__cell">
                    <Link to="">Акции</Link>
                    <Link to="">Новости</Link>
                    <Link to="">Отзывы</Link>
                </div>
                <div className="footer__contacts">
                    <h4>Мы на связи</h4>
                    <p>8 (000) 000-00-00</p>
                    <p>dogfood@bk.ru</p>
                    <div className="header__menu">
                        <span className="transition"><Link to=""><Telegram /></Link></span>
                        <span className="transition"><Link to=""><Whatsapp /></Link></span>
                        <span className="transition"><Link to=""><Instagram /></Link></span>
                    </div>
                    <div className="footer__cop footer__cop_desk">©{new Date().getFullYear()}</div>
                </div>
                {token &&
                    <nav className="header__menu footer__menu">
                        <span className="transition">
                            <Link to="/" title="Главная">
                                <HouseFill />
                            </Link>
                        </span>
                        <span className="transition">
                            <Link to="/catalog" title="Каталог">
                                <Folder2 />
                            </Link>
                        </span>
                        <span className="transition">
                            <Link to="/" title="Избранное">
                                <Star />
                            </Link>
                        </span>
                        <span className="transition">
                            <Link to="/" title="Корзина">
                                <Cart4 />
                            </Link>
                        </span>
                        <span className="transition">
                            <Link to="/profile" title="Профиль">
                                <PersonCircle />
                            </Link>
                        </span>
                    </nav>
                }
            </footer>
        </div>
    )
}

export default Footer;