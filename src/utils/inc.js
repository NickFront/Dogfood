export default (id, setBasket) => {
    setBasket(prev => prev.map(el => {
        if (el.id === id) {
            el.cnt++;
        }
        return el;
    }))
}