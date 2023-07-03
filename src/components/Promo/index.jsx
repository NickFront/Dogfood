import "./style.css";
// import promoImg from "../../assets/imagas/реклама1.jpeg";
import promoList from "../../assets/promolist.json";

const Promo = ({}) => {
    let promoImg= promoList[Math.floor(Math.random() * promoList.length)].img;
    return (
        <img src={promoImg} className="promo__img"></img>
    )
}

export default Promo;