import React from 'react'

const FilterSidebar = () => {
  return (
    <div className="sidebar-filter-main theiaStickySidebar">
        <div className="single-filter-box">
            <h5 className="title">Widget Price Filter</h5>
            <div className="filterbox-body">
                <form action="#" className="price-input-area">
                    <div className="half-input-wrapper">
                        <div className="single">
                            <label htmlFor="min">Min price</label>
                            <input id="min" type="text" value="0"/>
                        </div>
                        <div className="single">
                            <label htmlFor="max">Max price</label>
                            <input id="max" type="text" value="150"/>
                        </div>
                    </div>
                    <input type="range" className="range"/>
                    <div className="filter-value-min-max">
                        <span>Price: $10 — $90</span>
                        <button className="rts-btn btn-primary">Filter</button>
                    </div>
                </form>
            </div>
        </div>
        <div className="single-filter-box">
            <h5 className="title">Product Categories</h5>
            <div className="filterbox-body">
                <div className="category-wrapper ">
                    <div className="single-category">
                        <input id="cat1" type="checkbox"/>
                        <label htmlFor="cat1">Beverages
                        </label>
                    </div>
                    <div className="single-category">
                        <input id="cat2" type="checkbox"/>
                        <label htmlFor="cat2">Biscuits & Snacks

                        </label>
                    </div>
                    <div className="single-category">
                        <input id="cat3" type="checkbox"/>
                        <label htmlFor="cat3">Breads & Bakery
                        </label>
                    </div>
                    <div className="single-category">
                        <input id="cat4" type="checkbox"/>
                        <label htmlFor="cat4">Breakfast & Dairy
                        </label>
                    </div>
                    <div className="single-category">
                        <input id="cat7" type="checkbox"/>
                        <label htmlFor="cat7">Grocery & Staples
                        </label>
                    </div>
                    <div className="single-category">
                        <input id="cat6" type="checkbox"/>
                        <label htmlFor="cat6">Fruits & Vegetables

                        </label>
                    </div>
                    <div className="single-category">
                        <input id="cat8" type="checkbox"/>
                        <label htmlFor="cat8">Household Needs

                        </label>
                    </div>
                    <div className="single-category">
                        <input id="cat10" type="checkbox"/>
                        <label htmlFor="cat10">Meats & Seafood

                        </label>
                    </div>
                    <div className="single-category">
                        <input id="cat80" type="checkbox"/>
                        <label htmlFor="cat80">Grocery & Staples
                        </label>
                    </div>
                </div>
            </div>
        </div>
        <div className="single-filter-box">
            <h5 className="title">Product Status</h5>
            <div className="filterbox-body">
                <div className="category-wrapper">
                    <div className="single-category">
                        <input id="cat11" type="checkbox"/>
                        <label htmlFor="cat11">In Stock
                        </label>
                    </div>
                    <div className="single-category">
                        <input id="cat12" type="checkbox"/>
                        <label htmlFor="cat12">On Sale

                        </label>
                    </div>
                </div>
            </div>
        </div>
        <div className="single-filter-box">
            <h5 className="title">Select Brands</h5>
            <div className="filterbox-body">
                <div className="category-wrapper">
                    <div className="single-category">
                        <input id="cat13" type="checkbox"/>
                        <label htmlFor="cat13">Frito Lay
                        </label>
                    </div>
                    <div className="single-category">
                        <input id="cat14" type="checkbox"/>
                        <label htmlFor="cat14">Nespresso
                        </label>
                    </div>
                    <div className="single-category">
                        <input id="cat15" type="checkbox"/>
                        <label htmlFor="cat15">Oreo
                        </label>
                    </div>
                    <div className="single-category">
                        <input id="cat16" type="checkbox"/>
                        <label htmlFor="cat16">Quaker
                        </label>
                    </div>
                    <div className="single-category">
                        <input id="cat17" type="checkbox"/>
                        <label htmlFor="cat17">Welch's
                        </label>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FilterSidebar