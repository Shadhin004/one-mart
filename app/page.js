import ProductCategoryCard from '@/components/common/ProductCategoryCard'
import ServiceArea from '@/components/common/ServiceArea'
import Banner from '@/components/pageComponents/HomePage/Banner'
import BestSelling from '@/components/pageComponents/HomePage/BestSelling'
import DealsOfDay from '@/components/pageComponents/HomePage/DealsOfDay'
import FeaturedProducts from '@/components/pageComponents/HomePage/FeaturedProducts'
import MixedProducts from '@/components/pageComponents/HomePage/MixedProducts'
import Offer from '@/components/pageComponents/HomePage/Offer'
import React from 'react'

const Home = () => {
    return (
        <div className=''>
          <Banner />
          <ProductCategoryCard />
          <FeaturedProducts />
          <BestSelling />
          <ServiceArea />
          <DealsOfDay />
          <Offer />
          <MixedProducts />
        </div>
    )
}

export default Home