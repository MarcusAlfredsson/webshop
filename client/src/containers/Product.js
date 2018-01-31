import React, { Component} from 'react';
import PropTypes from 'prop-types';

class Product extends Component {
    constructor() {
        super();
        this.state = {showDescription: false};
    }

    showDescription() {
        this.setState({
            showDescription: !this.state.showDescription
        })
    }

    render() {
        const {product, onAdd} = this.props;
        return (
            <div>
                <div>
                    <h3>{product.name}</h3>
                    <p>Pris: {product.price} {product.currency}</p>
                </div>
                {this.state.showDescription ? <div dangerouslySetInnerHTML={{ __html: product.description }} /> : <div />}
                <div>
                    <button className='btn btn-default' onClick={() => this.showDescription()}>Läs mer</button>
                    <button className='btn btn-primary add-button' onClick={() => onAdd(product)}>Lägg till vara i varukorg</button>
                </div>
            </div>
        );
    }
};

Product.propTypes = {
    product: PropTypes.shape({
        name: PropTypes.string,
        id: PropTypes.number,
        description: PropTypes.string,
        price: PropTypes.number,
        currency: PropTypes.string
    }),
    onAdd: PropTypes.func,
};

export default Product;
