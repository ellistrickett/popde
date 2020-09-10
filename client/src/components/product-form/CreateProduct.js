import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const CreateProduct = props => {
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

  const onChangeImage = e => {
    this.setState({ image: e.target.files[0] });
    };

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

  return (
    <Fragment>
      <form encType='multipart/form-data'> 
        <div className="field">
            <label>Image</label>
            <input 
              type="file"
              placholder="Photo"
              name="photo"
              value={photo}
              onChange={e => onChangeImage(e)} 
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
      </form>
    </Fragment>
  )
}

CreateProduct.propTypes = {

}

export default CreateProduct
