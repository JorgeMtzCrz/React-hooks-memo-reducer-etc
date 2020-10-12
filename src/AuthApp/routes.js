import React from 'react'
import PageSection from '../components/PageSection'
import HeaderSection from './sections/HeaderSection'
import BannerSection from './sections/BannerSection'
import CardSection from './sections/CardSection'
import ProductsSection from './sections/ProductsSection'
import ProductUpdate from '../components/ProductUpdate'


export default [
  {
    path: '/app/header',
    label: 'Header',
    Component: () => (
      <PageSection>
        <HeaderSection/>
      </PageSection>
    )
  },
  {
    path: '/app/banner',
    label: 'Banner',
    Component: () => (
      <PageSection>
        <BannerSection/>
      </PageSection>
    )
  },
  {
    path: '/app/cards',
    label: 'Cards',
    Component: () =>(
      <PageSection>
        <CardSection/>
      </PageSection>
    )
  },
  {
    path: '/app/products',
    label: 'Products',
    Component: () => (
      <PageSection>
        <ProductsSection/>
      </PageSection>
    )
  },
  { 
    path: '/app/products/update/:id',
    Component: (props) => (
      <PageSection>
      <ProductUpdate {...props}/>
      </PageSection>
    )
  },
]