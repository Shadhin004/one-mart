import React from 'react'
import FilterSidebar from './FilterSidebar'
import SearchResult from './SearchResult'

const PageWrapper = () => {
  return (
    <div className="shop-grid-sidebar-area rts-section-gap">
        <div className="container">
            <div className="row g-0">
                <div className="col-xl-3 col-lg-12 pr--70 pr_lg--10 pr_sm--10 pr_md--5 rts-sticky-column-item">
                    <FilterSidebar />
                </div>
                <div className="col-xxl-9">
                    <SearchResult />
                </div>
            </div>
        </div>
    </div>
  )
}

export default PageWrapper