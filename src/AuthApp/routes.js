import React from 'react'
import PageSection from '../components/PageSection'
import HeaderSection from './sections/HeaderSection'


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
        <HeaderSection/>
      </PageSection>
    )
  },
  {
    path: '/app/promos',
    label: 'Promos',
    Component: () => <p>component</p>
  },
  {
    path: '/app/products',
    label: 'Products',
    Component: () => <p>component</p>
  },
]