import React from 'react';
import './EditProduct.scss';
import ProductData from '../../../helpers/data/ProductData';
import productTypesData from '../../../helpers/data/productTypesData';
import animalTypeData from '../../../helpers/data/animalTypeData';

class EditProduct extends React.Component {
  state = {
    productTypes: [],
    animalTypes: [],
    productId: '',
    hatName: '',
    description: '',
    quantity: 0,
    price: 0,
    imageUrl: '',
    inStock: true,
    productTypeId: 0,
    animalTypeId: 0,
  }

  componentDidMount() {
    this.getSingleProduct();
    this.getAllProductTypes();
    this.getAllAnimalTypes();
  }

  getSingleProduct = () => {
    const { productId } = this.props.match.params;
    // eslint-disable-next-line radix
    this.setState({ productId: parseInt(productId) });
    ProductData.getSingleProduct(productId)
      .then((product) => this.setState({
        hatName: product.title,
        description: product.description,
        quantity: product.quantity,
        price: product.price,
        imageUrl: product.imageUrl,
        category: product.category,
        animalType: product.animalType,
        singleProduct: product,
        inStock: product.inStock,
        productTypeId: product.productTypeId,
        animalTypeId: product.animalTypeId,
      }))
      .catch((error) => console.error(error, 'error from edit product'));
  }

  getAllProductTypes = () => {
    productTypesData.getAllProductTypes()
      .then((productTypes) => {
        this.setState({ productTypes });
      })
      .catch((errFromAllProductTypes) => console.error(errFromAllProductTypes));
  }

  getAllAnimalTypes = () => {
    animalTypeData.getAllAnimalTypes()
      .then((animalTypes) => {
        this.setState({ animalTypes });
      })
      .catch((errFromAllAnimalTypes) => console.error(errFromAllAnimalTypes));
  }

  updateProductEvent = (e) => {
    e.preventDefault();
    const {
      hatName,
      description,
      quantity,
      price,
      imageUrl,
      productId,
      inStock,
      productTypeId,
      animalTypeId,
    } = this.state;
    const newProduct = {
      productId,
      title: hatName,
      description,
      // eslint-disable-next-line radix
      quantity: parseInt(quantity),
      price: parseFloat(price),
      imageUrl,
      inStock,
      // eslint-disable-next-line radix
      productTypeId: parseInt(productTypeId),
      // eslint-disable-next-line radix
      animalTypeId: parseInt(animalTypeId),
    };
    ProductData.updateSingleProduct(productId, newProduct)
      .then(() => this.props.history.push('/products'))
      .catch((error) => console.error('err', error));
  }

  pictureChange = (e) => {
    e.preventDefault();
    this.setState({ imageUrl: e.target.value });
  }

  nameChange = (e) => {
    e.preventDefault();
    this.setState({ hatName: e.target.value });
  }

  descriptionChange = (e) => {
    e.preventDefault();
    this.setState({ description: e.target.value });
  }

  quantityChange = (e) => {
    this.setState({ quantity: e.target.value });
  }

  priceChange = (e) => {
    e.preventDefault();
    this.setState({ price: e.target.value });
  }

  categoryChange = (e) => {
    e.preventDefault();
    this.setState({ productTypeId: e.target.value });
  }

  animalTypeChange = (e) => {
    e.preventDefault();
    this.setState({ animalTypeId: e.target.value });
  }

  render() {
    const {
      productTypes,
      animalTypes,
      hatName,
      description,
      quantity,
      imageUrl,
      price,
      productTypeId,
      animalTypeId,
    } = this.state;

    return (
      <form className="EditProduct">
      <div className="container editCompostForm">
        <div className="form-group">
          <label htmlFor="hat-image"><strong>Image URL</strong></label>
          <input
            input="text"
            className="form-control"
            id="hat-image"
            placeholder="Place Image"
            value={imageUrl}
            onChange={this.pictureChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="hat-name"><strong>Name</strong></label>
          <input
            input="text"
            className="form-control"
            id="hat-name"
            placeholder="Name hat"
            value={hatName}
            onChange={this.nameChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="hat-description"><strong>Description</strong></label>
          <input
            input="text"
            className="form-control"
            id="hat-description"
            placeholder="Enter Description"
            value={description}
            onChange={this.descriptionChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="hat-quantity"><strong>Quantity</strong></label>
          <input
            input="number"
            className="form-control"
            id="hat-quantity"
            placeholder="Enter quantity"
            value={quantity}
            onChange={this.quantityChange}
          />
        </div>
        <div>
          <label htmlFor="hat-price"><strong>Price</strong></label>
            <input
              input="number"
              className="form-control"
              id="hat-price"
              placeholder="Enter price"
              value={price}
              onChange={this.priceChange}
            />
        </div>
        <div className="form-group">
              <label htmlFor="category-name"><strong>Category</strong></label>
              <select
                  input="text"
                  className="form-control"
                  id="category-name"
                  value={productTypeId}
                  onChange={this.categoryChange}
                  >
                  <option>Choose One</option>
                  {
                    productTypes.length > 0
                      ? productTypes.map((productType) => <option key={productType.productTypeId} value={productType.productTypeId} >{productType.category}</option>)
                      : ('')
                  }
              </select>
        </div>
        <div className="form-group">
            <label htmlFor="animalType"><strong>Animal Type</strong></label>
            <select
              input="text"
              className="form-control"
              id="animalType"
              value={animalTypeId}
              onChange={this.animalTypeChange}
            >
              <option>Choose One</option>
                  {
                    animalTypes.length > 0
                      ? animalTypes.map((animalType) => <option key={animalType.animalId} value={animalType.animalId} >{animalType.animalType}</option>)
                      : ('')
                  }
            </select>
        </div>
      </div>
      <button className="btn btn-outline-dark updateButton" onClick={this.updateProductEvent}>Update</button>
    </form>
    );
  }
}

export default EditProduct;
