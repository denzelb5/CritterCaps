import React from 'react';
import './SingleProduct.scss';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import ProductData from '../../../helpers/data/ProductData';

class SingleProduct extends React.Component {
  state = {
    product: {},
  }

  componentDidMount() {
    // console.log('I was triggered during componentDidMount');
    const { productId } = this.props.match.params;
    // eslint-disable-next-line no-console
    ProductData.getSingleProduct(productId)
      .then((product) => this.setState({ product }))
      .catch((error) => console.error(error, 'error from single product'));
  }

  render() {
    const { product } = this.state;
    const price = Number(product.price).toLocaleString('en-US', { style: 'currency', currency: 'USD' });

    return (
      <div className="SingleProductCard m-2">
       < div className="d-flex justify-content-center">
            <Card style={{ width: '18rem' }} id={product} className="h-100" border="primary">
            <Card.Img variant="top" src={product.imageUrl} />
            <Card.Title>{product.title}</Card.Title>
            <Card.Body>
              <Card.Text>
                Description: {product.description}
              </Card.Text>
              <Card.Text>
                Quantity: {product.quantity}
              </Card.Text>
            </Card.Body>
            <Card.Footer className="mb-0">
              <Card.Text>
                Price: {price}
              </Card.Text>
              <Link to="/" className="btn btn-info m-2">Back</Link>
              <Link to={`/products/${product}`} className="btn btn-info m-2">Add To Cart</Link>
            </Card.Footer>
          </Card>
      </div>
      </div>
    );
  }
}

export default SingleProduct;
