import React from 'react'
import Link from 'next/link'

const ProductCard = ({ product }) => {
  return (
    <div className="single-shopping-card-one">
                
        <div className="image-and-action-area-wrapper">
            <a href="shop-details.html" className="thumbnail-preview">
                <div className="badge">
                    <span>5% <br/> 
                        Off
                    </span>
                    <i className="fa-solid fa-bookmark"></i>
                </div>
                <img src={product.primary_image} style={{ width: '100%', height: '200px' }} alt="grocery"/>
            </a>
            <div className="action-share-option">
                <div className="single-action openuptip message-show-action" data-flow="up" title="Add To Wishlist">
                    <i className="fa-light fa-heart"></i>
                </div>
                <div className="single-action openuptip" data-flow="up" title="Compare" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <i className="fa-solid fa-arrows-retweet"></i>
                </div>
                <div className="single-action openuptip cta-quickview product-details-popup-btn" data-flow="up" title="Quick View">
                    <i className="fa-regular fa-eye"></i>
                </div>
            </div>
        </div>


        <div className="body-content">
            <Link href={`/search/products/${product.product_id}`}>
                <h4 className="title">{product.product_name}</h4>
            </Link>
            <span className="availability">{product.stock_quantity} Available</span>
            <div className="price-area">
                <span className="current">${product.price}</span> / {product.unit_name}
                {/* <div className="previous">$36.00</div> */}
            </div>
            <div className="cart-counter-action">
                <div className="quantity-edit">
                    <input type="text" className="input" defaultValue="1"/>
                    <div className="button-wrapper-action">
                        <button className="button"><i className="fa-regular fa-chevron-down"></i></button>
                        <button className="button plus">+<i className="fa-regular fa-chevron-up"></i></button>
                    </div>
                </div>
                <a href="#" className="rts-btn btn-primary radious-sm with-icon">
                    <div className="btn-text">
                        Add To Cart
                    </div>
                    <div className="arrow-icon">
                        <i className="fa-regular fa-cart-shopping"></i>
                    </div>
                    <div className="arrow-icon">
                        <i className="fa-regular fa-cart-shopping"></i>
                    </div>
                </a>
            </div>
        </div>
    </div>
  )
}

export default ProductCard