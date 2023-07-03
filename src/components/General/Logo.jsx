import image from "../../assets/imagas/logo.png";
import { Link } from "react-router-dom";

const Logo = () => {
    return <Link to="/" className="logo">
        <img src={image} alt= "DogFood" />
        <span>DogFood</span>
    </Link>
}

export default Logo;