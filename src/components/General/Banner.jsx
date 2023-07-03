import { Link } from "react-router-dom";
import { ChevronRight } from "react-bootstrap-icons";
import { useContext } from "react";
import Ctx from "../../context";

const Banner = () => {
    const { user } = useContext(Ctx);
    return (
        <div className="wrapper__ban">
            <div className="header__ban">
                <h1>Лакомства для собак</h1>
                <h5>Всегда свежие лакомства с доставкой по России и СНГ</h5>
                {user &&
                    <>
                        <Link to="/catalog" title="Каталог">
                            <div className="header__catalog transition">
                                <span>Каталог&nbsp;</span>
                                <span>
                                    <ChevronRight />
                                </span>
                            </div>
                        </Link>
                    </>
                }
            </div>
        </div>
    )
}

export default Banner;