export default (id, cnt, setBasket) => {
    if (cnt === 1) {
        setBasket(prev => prev.filter(el => el.id !== id))
    } else {
        setBasket(prev => prev.map(el => {
            if (el.id === id) {
                el.cnt--;
            }
            return el;
        }))
    }
}