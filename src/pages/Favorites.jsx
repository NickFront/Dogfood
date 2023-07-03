import Card from "../components/Card";
import { useContext } from "react";
import Ctx from "../context";

const Favorites = () => {
    const { goods, setServerGoods, userId } = useContext(Ctx);
    return (
        <div className="container">
            <h1 className="container__title">Избранное</h1>
            {goods.filter(el => el.likes.includes(userId)).map(g => <Card
                {...g}
                key={g._id}
                img={g.pictures}
                setServerGoods={setServerGoods}
            />)}
        </div>
    )
}

export default Favorites;