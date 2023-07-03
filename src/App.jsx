import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Ctx from "./context";
import Api from "./api";
// компоненты
import { Header, Footer } from "./components/General";
import Modal from "./components/Modal";
import ModalEditProd from "./components/ModalEditProd";
// страницы
import Main from "./pages/Main";
import Catalog from "./pages/Catalog";
import Profile from "./pages/Profile";
import Product from "./pages/Product";
import Favorites from "./pages/Favorites";
import Add from "./pages/AddProduct";
import Basket from "./pages/Basket";

const App = () => {
    const [user, setUser] = useState(localStorage.getItem("rockUser"));
    const [token, setToken] = useState(localStorage.getItem("rockToken"));
    const [userId, setUserId] = useState(localStorage.getItem("rockId"));
    const [modalActive, setModalActive] = useState(false);
    const [text, setText] = useState(""); //поиск по сайту
    const [serverGoods, setServerGoods] = useState([]); // товары из базы данных сервера
    const [goods, setGoods] = useState(serverGoods); //товары для поиска и фильтрации
    const [api, setApi] = useState(new Api(token));
    const [modalEdit, setModalEdit] = useState(false);


    let bStore = localStorage.getItem("rockBasket");
    if (bStore) {
        bStore = JSON.parse(bStore);
    } else {
        bStore = []
    }

    const [basket, setBasket] = useState(bStore);

    useEffect(() => {
        localStorage.setItem("rockBasket", JSON.stringify(basket));
    }, [basket])

    useEffect(() => {
        if (user) {
            setToken(localStorage.getItem("rockToken"));
            setUserId(localStorage.getItem("rockId"))
        } else {
            setToken("");
            setUserId("")
        }
    }, [user])

    // useEffect срабатывает каждый раз, когда компонент создался или перерисовался
    useEffect(() => {
        setApi(new Api(token))
    }, [token])


    useEffect(() => {
        if (api.token) {
            api.getProguct()
                .then(data => {
                    console.log(data);
                    setServerGoods(data.products);
                })
        }
    }, [api.token])

    useEffect(() => {
        setGoods(serverGoods);
    }, [serverGoods])

    return (
        <Ctx.Provider value={{
            user,
            setUser,
            token,
            userId,
            modalActive,
            setModalActive,
            text,
            setText,
            serverGoods,
            setServerGoods,
            goods,
            setGoods,
            api,
            basket,
            setBasket,
            modalEdit,
            setModalEdit
        }}>
            <Header
            />
            {/* <main> */}
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/add" element={<Add />} />
                <Route path="/profile" element={
                    <Profile color="blue" />
                } />
                <Route path="/product/:id" element={<Product />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/basket" element={<Basket />} />
            </Routes>
            {/* </main> */}
            <Footer />
            <Modal />
            {/* <ModalEditProd /> */}
        </Ctx.Provider>
    )
}

export default App;