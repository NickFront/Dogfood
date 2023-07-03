import React, { useContext } from 'react';
import Carousel from "better-react-carousel";
import Ctx from "../context";
import Promo from "../components/Promo";
import Card from "../components/Card";
import Banner from '../components/General/Banner';

const Main = () => {
    const { token, serverGoods } = useContext(Ctx);
    return (
        <>
            <Banner />
            <div className="main__wrapper maxwidth">
                <p className="promo_big">
                    <Promo />
                </p>
                {token && <div className="carousel maxwidth">
                    <h4>Новинки</h4>
                    <Carousel cols={3} rows={1} gap={10} loop>
                        {serverGoods.filter(el => el.tags.includes("new")).map((g, i) => <Carousel.Item key={i}>
                            <Card
                                key={g._id}
                                {...g}
                                img={g.pictures}
                            />
                        </Carousel.Item>)
                        }
                    </Carousel>
                </div>}
                <div className="promo__container">
                    <p><Promo /></p>
                    <p><Promo /></p>
                </div>
                <div className="promo_big promo_none">
                    <Promo />
                </div>
                <div className="promo_big promo_none">
                    <Promo />
                </div>
                {token &&
                    <div className="carousel maxwidth">
                        <h4>Товары со скидкой</h4>
                        <Carousel cols={3} rows={1} gap={10} loop>
                            {serverGoods.filter(el => el.tags.includes("sale")).map((g, i) => <Carousel.Item key={i}>
                                <Card
                                    key={g._id}
                                    {...g}
                                    img={g.pictures}
                                />
                            </Carousel.Item>)
                            }
                        </Carousel>
                    </div>
                }
            </div>
        </>
    )
}

export default Main;