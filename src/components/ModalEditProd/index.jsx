import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Ctx from "../../context";
import Modal from 'react-bootstrap/Modal';


const ModalEditProd = ({ desProd, disProd, nameProd, imgProd, priceProd,
    stockProd, tagsProd, wightProd, _id, setProduct }) => {
    const navigate = useNavigate();
    const { modalEdit, setModalEdit, api, setServerGoods } = useContext(Ctx);
    const [description, setDescription] = useState(desProd);
    const [discount, setDiscount] = useState(disProd);
    const [name, setName] = useState(nameProd);
    const [pictures, setPictures] = useState(imgProd);
    const [price, setPrice] = useState(priceProd);
    const [stock, setStock] = useState(stockProd);
    const [tag, setTag] = useState("");
    const [tags, setTags] = useState(tagsProd);
    const [wight, setWight] = useState(wightProd);



    const updTag = (val) => {
        // Привести к общему регистру
        const text = val.toLocaleLowerCase();
        // получить строку без последнего символа (вдруг там пробел или запятая)
        let cut = text.slice(0, text.length - 1);
        // Проверить строку на последний символ
        if (/[\s.,;!?]$/.test(text)) {
            // Если пробел или знак препинания - обрубить этот символ и записать в массив с тегами
            // Надо проверять насколько такого тега еще не существует
            setTags(prev => prev.includes(cut) ? prev : [...prev, cut]);
            // очистить инпут
            setTag("");
        } else {
            // идем дальше
            setTag(text);
        }
    }

    const delTag = (tag) => {
        setTags(prev => prev.filter(tg => tg !== tag))
    }

    const handleClose = (e) => {
        setModalEdit(false);
    }

    const formHandler = (e) => {
        e.preventDefault();
        const body = {
            name,
            price,
            pictures,
            discount,
            wight,
            stock,
            description,
            tags: tag.length && !tags.includes(tag) ? [...tags, tag] : tags
        }

        api.updProduct(_id, body)
            .then(data => {
                console.log(data);
                if (!data.err && !data.error) {
                    setServerGoods(prev => [data, ...prev]);
                    setModalEdit(false);
                    setProduct(data);
                    navigate(`/product/${data._id}`)
                }
            })
    }

    return (
        <div className="modal-wrapper" style={{ display: modalEdit ? "flex" : "none" }}>
            <Modal.Dialog
                className="bg-light text-dark rounded-1 p-4"
                centered
                size="lg"
            >
                <Modal.Header className="p-2">
                    <Modal.Title>Изменить товар</Modal.Title>
                    <Button variant="outline-secondary" onClick={handleClose}>
                        x
                    </Button>
                </Modal.Header>
                <Modal.Body>
                    < Container className="bs"
                    >
                        <Form
                            onSubmit={formHandler}
                        >
                            <Row>
                                <Col xs={12} sm={6}>
                                    <Form.Group className="my-3">
                                        <Form.Label htmlFor="name">Название товара</Form.Label>
                                        <Form.Control
                                            type="text"
                                            id="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label htmlFor="price">Цена</Form.Label>
                                        <Form.Control type="number"
                                            id="price"
                                            value={price}
                                            min={1}
                                            max={9999}
                                            onChange={(e) => setPrice(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label htmlFor="discount">Скидка</Form.Label>
                                        <Form.Select
                                            id="discount"
                                            defaultValue={discount}
                                            onChange={(e) => setDiscount(e.target.value)}
                                        >
                                            <option value={0}>Без скидки</option>
                                            <option value={5}>5 %</option>
                                            <option value={10}>10 %</option>
                                            <option value={15}>15 %</option>
                                            <option value={20}>20 %</option>
                                            <option value={25}>25 %</option>
                                            <option value={40}>40 %</option>
                                            <option value={60}>60 %</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label htmlFor="wight">Вес</Form.Label>
                                        <Form.Control
                                            type="text"
                                            id="wight"
                                            value={wight}
                                            onChange={(e) => setWight(e.target.value)}
                                        />
                                        <Form.Text>Вес прописывается с единицами измерения!</Form.Text>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label htmlFor="stock">Количество на складе</Form.Label>
                                        <Form.Control
                                            type="number"
                                            id="stock"
                                            step={1}
                                            min={10}
                                            max={1000}
                                            value={stock}
                                            onChange={(e) => setStock(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group className="my-3">
                                        <Form.Label htmlFor="tags">Теги</Form.Label>
                                        <Form.Control
                                            type="text"
                                            id="tags"
                                            value={tag}
                                            onChange={(e) => updTag(e.target.value)}
                                        />
                                        {tags.length > 0 && <Form.Text>
                                            {tags.map(t => <span
                                                className={`d-inline-block lh-1 ${t !== "df" ? "bg-info" : "bg-secondary"} text-light p-2 mt-2 me-2 rounded-1 `}
                                                key={t}
                                                onClick={() => delTag(t)}
                                                style={{
                                                    pointerEvents: t === "df" ? "none" : "auto"
                                                }}
                                            >{t}</span>)}
                                        </Form.Text>}
                                    </Form.Group>
                                </Col>
                                <Col xs={12} sm={6}>
                                    <div className="mb-4" style={{
                                        backgroundImage: `url(${pictures})`,
                                        backgroundSize: "cover",
                                        height: "16.05rem",
                                        backgroundPosition: "center",
                                        backgroundRepeat: "no-repeat"
                                    }}></div>
                                    <Form.Group className="my-4">
                                        <Form.Label htmlFor="pictures">Изображение товара</Form.Label>
                                        <Form.Control
                                            type="url"
                                            id="pictures"
                                            value={pictures}
                                            onChange={(e) => setPictures(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group className="my-4">
                                        <Form.Label htmlFor="description">Описание</Form.Label>
                                        <Form.Control as="textarea"
                                            id="description"
                                            value={description}
                                            rows={3}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Button variant={"outline-secondary"} type="submit" className="mt-2 transition">Изменить</Button>
                                </Col>
                            </Row>
                        </Form>
                    </Container>
                </Modal.Body>
            </Modal.Dialog>
        </div>
    )
}

export default ModalEditProd;