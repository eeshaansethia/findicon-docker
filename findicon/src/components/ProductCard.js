import React from 'react'
import '../styles/productCard.css'

const ProductCard = (props) => {
    return (
        <div className='product-card'>
            <h5 className='product-card-title'>
                {props.name}
            </h5>
            <ul className='product-card-features'>
                {props.features.map((feature, index) => {
                    return <li key={index} className='product-card-item'>{feature}</li>
                })}
            </ul>

        </div>
    )
}

export default ProductCard
