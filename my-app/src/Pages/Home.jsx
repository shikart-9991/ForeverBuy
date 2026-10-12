import React from 'react'
import Hero from '../Componets/Hero'
import LatestCollections from '../Componets/LatestCollection'
import BestSeller from '../Componets/BestSeller'
import Policies from '../Componets/Policies'
import Newsletter from '../Componets/Newsletter'

const Home = () => {
  return (
    <>
      <Hero />
      <LatestCollections/>
      <BestSeller/>
      <Policies/>
      <Newsletter/>
    </>
  )
}

export default Home
