import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProduct } from '../../actions/product';

const CreateProduct = ({ createProduct, history }) => {
  const [previewSource, setPreviewSource] = useState()
  const [formData, setFormData] = useState({
    name: '',
    photo: '',
    description: '',
    category: '',
    location: '',
    shipping: '',
    price: '',
    shippingPrice: ''
  });

  const {
    name,
    photo,
    description,
    category,
    location,
    shipping,
    price,
    shippingPrice
  } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

  const onChangeImage = e => {
    const file = e.target.files[0]
    previewFile(file);
  }

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    }
  }

  const onSubmit = e => {
    e.preventDefault();
    const formDataWithImage = { ...formData, photo: previewSource }
    createProduct(formDataWithImage, history);
  }

  return (
    <Fragment>
      <form encType='multipart/form-data' onSubmit={e => onSubmit(e)}> 
        <div className="field">
            <label>Image</label>
            <input 
              type="file"
              placholder="Photo"
              name="photo"
              value={photo}
              onChange={e => onChangeImage(e)}
              multiple
            />
            <div className="form-group">
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={e => onChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Description"
              name="description"
              value={description}
              onChange={e => onChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Category"
              name="category"
              value={category}
              onChange={e => onChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Location"
              name="location"
              value={location}
              onChange={e => onChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Shipping"
              name="shipping"
              value={shipping}
              onChange={e => onChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Price"
              name="price"
              value={price}
              onChange={e => onChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="ShippingPrice"
              name="shippingPrice"
              value={shippingPrice}
              onChange={e => onChange(e)}
            />
          </div>
        </div>
        <input type="submit" className="btn" value="Product" />
      </form>
      {previewSource && (
        <img src={previewSource} alt="chosen" style={{height: '300px'}}/>
      )}
    </Fragment>
  )
}

CreateProduct.propTypes = {
  createProduct: PropTypes.func.isRequired
}

export default connect(null, { createProduct })(withRouter(CreateProduct));
