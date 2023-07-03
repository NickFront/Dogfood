import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Ctx from "../context";

const Add = () => {
    const { setServerGoods, api } = useContext(Ctx);
    const navigate = useNavigate();
    const [description, setDescription] = useState("Тут пусто");
    const [discount, setDiscount] = useState(0);
    const [name, setName] = useState("");
    const [pictures, setPictures] = useState("https://w7.pngwing.com/pngs/344/1018/png-transparent-animal-dog-astronaut-art-astronomy-cartoon-cosmos-thumbnail.png");
    const [price, setPrice] = useState(100);
    const [stock, setStock] = useState(200);
    const [tag, setTag] = useState("");
    const [tags, setTags] = useState(["df"]);
    const [wight, setWight] = useState("100 г");

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

    const clearForm = () => {
        setName("");
        setPrice(100);
        setPictures("https://w7.pngwing.com/pngs/344/1018/png-transparent-animal-dog-astronaut-art-astronomy-cartoon-cosmos-thumbnail.png");
        setDiscount(0);
        setDescription("Тут пусто");
        setWight("100 г");
        setStock(200);
        setTags(["df"]);
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
        // fetch("https://api.react-learning.ru/products", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //         "Authorization": `Bearer ${token}`
        //     },
        //     body: JSON.stringify(body)
        // })
        //     .then(res => res.json())
            api.addProduct(body)
            .then(data => {
                console.log(data);
                if (!data.err && !data.error) {
                    setServerGoods(prev => [data, ...prev]);
                    clearForm();
                    navigate(`/product/${data._id}`)
                }
            })
    }

    return (
        < Container className="bs bg-light text-dark rounded-1 p-4">
            <Row>
                <Col xs={12}>
                    <h1>Добавить товар</h1>
                </Col>
            </Row>
            <Form
                onSubmit={formHandler}>
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
                                onChange={(e) => setPrice(e.target.value)} />
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
                                onChange={(e) => setWight(e.target.value)} />
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
                                onChange={(e) => setStock(e.target.value)} />
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
                        <div className="mb-3" style={{
                            backgroundImage: `url(${pictures})`,
                            backgroundSize: "cover",
                            height: "16.05rem",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat"
                        }}></div>
                        <Form.Group className="my-3">
                            <Form.Label htmlFor="pictures">Изображение товара</Form.Label>
                            <Form.Control
                                type="url"
                                id="pictures"
                                value={pictures}
                                onChange={(e) => setPictures(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="my-3">
                            <Form.Label htmlFor="description">Описание</Form.Label>
                            <Form.Control as="textarea"
                                id="description"
                                value={description}
                                rows={3}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant={"outline-secondary"} type="submit" className="mt-2 transition">Добавить</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}

export default Add;