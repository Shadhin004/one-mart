import React from 'react'

const NavigationSection = () => {
  return (
    <div>
        <div className="rts-navigation-area-breadcrumb">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="navigator-breadcrumb-wrapper">
                            <a href="index.html">Home</a>
                            <i className="fa-regular fa-chevron-right"></i>
                            <a className="current" href="index.html">Shop Grid Sidebar</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>        
        <div className="section-seperator">
            <div className="container">
                <hr className="section-seperator"/>
            </div>
        </div>
    </div>
  )
}

export default NavigationSection