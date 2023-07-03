export default (e, state, setIsLike, setServerGoods, _id, api) => {
    e.stopPropagation();
    e.preventDefault();
    setIsLike(state);
    // fetch(`https://api.react-learning.ru/products/likes/${_id}`, {
    //     method: isLike ? "DELETE" : "PUT",
    //     headers: {
    //         "Authorization": `Bearer ${token}`
    //     }
    // })
    //     .then(res => res.json())
    api.setLike(_id, state)
        .then(data => {
            setServerGoods(function (old) {
                const arr = old.map(el => {
                    if (el._id === _id) {
                        return data;
                    } else {
                        return el
                    }
                });
                return arr;
            })
        })
}