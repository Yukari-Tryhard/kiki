import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllCategory } from "../actions/categoryAction";
import { addProduct } from "../actions/productAction";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { productConstants } from "../actions/constant";
import { toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import  from "../HOC/";
import DatePicker from "react-datepicker";

const ProductAddPage = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [description, setDescription] = useState("");
  const { categories } = useSelector((state) => state.category);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [language, setLanguage] = useState("");
  const [publisher, setPublisher] = useState("");
  const [forms, setForms] = useState("");
  const [pages, setPages] = useState(0);
  const [author, setAuthor] = useState("");
  const dateNow = new Date();
  const [publishYear, setPublishYear] = useState(0);
  const [publishDate, setPublishDate] = useState(dateNow.toISOString());

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { success, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getAllCategory());
    if (success) {
      toast.success("Product Created Successfully");
      navigate("/admin/productlist");
      dispatch({ type: productConstants.ADD_PRODUCT_RESET });
    }
  }, [dispatch, navigate, success]);

  const submitHandler = (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("name", name);
    form.append("price", price);
    form.append("publishingYear", publishYear);
    form.append("publishingDate", publishDate);
    form.append("language", language);
    form.append("pages", pages);
    form.append("publisher", publisher);
    form.append("form", forms);
    form.append("author", author);
    form.append("quantity", quantity);
    form.append("description", description);
    form.append("category", category);

    for (let pic of images) {
      form.append("productPictures", pic);
    }

    dispatch(addProduct(form));
  };

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([...files]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };
  console.log("images", images);

  return (
    <>
      <>
        <Link to="/admin/productlist" className="my-3 btn btn-light">
          Quay lại
        </Link>
        <FormContainer>
          <h1>Thêm sản phẩm</h1>
          {loading ? (
            <Loader></Loader>
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="username">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="publishyear">
                <Form.Label>Publish Year</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="Enter publish year"
                  isInvalid={!(parseInt(price) > 0) && price.length}
                  value={publishYear}
                  onChange={(e) => setPublishYear(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="publishingdate">
                <Form.Label>Publish Date</Form.Label>
                <DatePicker
                  selected={new Date(publishDate)}
                  onChange={(date) => setPublishDate(date.toString())}
                />
              </Form.Group>

              <Form.Group controlId="language">
                <Form.Label>Language</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter language"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="publishyear">
                <Form.Label>Pages</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="Enter publish year"
                  isInvalid={!(parseInt(price) > 0) && price.length}
                  value={pages}
                  onChange={(e) => setPages(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="language">
                <Form.Label>Publisher</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter publisher"
                  value={publisher}
                  onChange={(e) => setPublisher(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="language">
                <Form.Label>Form</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter form"
                  value={forms}
                  onChange={(e) => setForms(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="language">
                <Form.Label>Author</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="price" className="my-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="Enter price"
                  isInvalid={!(parseInt(price) > 0) && price.length}
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="images" className="my-3">
                <Form.Control
                  required
                  type="file"
                  className="mb-3"
                  accept="image/x-png,image/gif,image/jpeg"
                  onChange={updateProductImagesChange}
                  multiple
                ></Form.Control>

                <div id="createProductFormImage">
                  {imagesPreview.map((image, index) => (
                    <img key={index} src={image} alt="Product Preview" />
                  ))}
                </div>
              </Form.Group>

              <Form.Group controlId="category" className="my-3">
                <select
                  className="form-control"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option>select category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </Form.Group>

              <Form.Group controlId="countInStock" className="my-3">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="Enter Quantity"
                  value={quantity}
                  isInvalid={!(parseInt(quantity) > 0) && quantity.length}
                  onChange={(e) => setQuantity(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="description" className="my-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Button type="submit" variant="primary">
                Thêm
              </Button>
            </Form>
          )}
        </FormContainer>
      </>
    </>
  );
};

export default ProductAddPage;
