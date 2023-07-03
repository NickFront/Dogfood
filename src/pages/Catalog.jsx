import { useContext, useEffect } from "react";

import Card from "../components/Card";
import Pagination from "../components/Pagination";
import usePagination from "../hooks/usePagination";

import Ctx from "../context";

const Catalog = () => {
    const { goods, text } = useContext(Ctx);
    const paginate = usePagination(goods, 20);

useEffect(() => {
    paginate.step(1);
}, [text])

    return (
        <div className="container maxwidth">
            <div className="container__pagination"><Pagination hk={paginate}/></div>
            {paginate.setDataPerPage().map(g => <Card
                key={g._id}
                {...g}
                img={g.pictures}
            />)}
        </div>
    )
}

export default Catalog;