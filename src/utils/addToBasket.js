// eslint-disable-next-line import/no-anonymous-default-export
export default (e, setInBasket, setBasket, _id, name, img, price, discount, wight) => {
    e.preventDefault();
    e.stopPropagation();
    setInBasket(true);
    setBasket(prev => [...prev, {
        id: _id,
        cnt: 1,
        name: name,
        img: img,
        price: price,
        discount: discount,
        wight: wight
    }])
}