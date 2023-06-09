import React, { useEffect } from "react";
import { Button, Table, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { productConstants } from "../actions/constant";
import { deleteProduct, getAllProducts } from "../actions/productAction";

import Loader from "../components/Loader";
import Message from "../components/Message";
import  from "../HOC/";

const ProductListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading, error, successDelete } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    if (successDelete) {
      toast.error("Disabled product success !");
      dispatch({ type: productConstants.ADD_PRODUCT_RESET });
    }
    dispatch(getAllProducts());
  }, [dispatch, successDelete]);
  const createProductHandler = () => {
    navigate("/admin/product/add");
  };
  const deleteHandler = (productId) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteProduct(productId));
    }
  };
  return (
    <>
      <>
        <Row className="align-items-center">
          <Col>
            <h1>Products</h1>
          </Col>
          <Col className="text-right">
            <Button className="my-3" onClick={createProductHandler}>
              <i className="fas fa-plus"></i> Create Product
            </Button>
          </Col>

          <Col className="text-right">
            <Button
              className="my-3"
              onClick={() => navigate("/admin/product/disable")}
            >
              <i class="fa-solid fa-user-slash"></i> Disabled Products
            </Button>
          </Col>
        </Row>

        {loading ? (
          <Loader></Loader>
        ) : error ? (
          <Message>{error}</Message>
        ) : (
          <>
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>PRICE</th>
                  <th>CATEGORY</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {products &&
                  products?.map((product) => (
                    <tr key={product._id}>
                      <td>{product._id}</td>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td>{}</td>
                      <td>
                        <LinkContainer
                          to={`/admin/product/${product.slug}/edit`}
                        >
                          <Button variant="light" className="btn-sm">
                            <i className="fas fa-edit"></i>
                          </Button>
                        </LinkContainer>
                        <Button
                          variant="danger"
                          className="btn-sm"
                          onClick={() => deleteHandler(product._id)}
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
            {/* <Paginate pages={pages} page={page} isAdmin={true}></Paginate> */}
          </>
        )}
      </>
    </>
  );
};

export default ProductListPage;
