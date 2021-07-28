import React from 'react';
import MatchRequest from '../../src/components/matchRequest/matchRequest.jsx';
import AllRequest from '../../src/components/allRequest/allRequest.jsx';
import ResultsBanner from '../components/resultBanner/banner.jsx';
import Navbar from '../components/navbar/navbar.jsx';
import TopBanner from './exploreBanner/topBanner.jsx';



//for route '/explore'
const ExplorePage = (props) =>{
    return (
        
          <>
          <style>{'body { background-color: #EDE3FA; }'}</style>
          <Navbar />
          <TopBanner />
          <ResultsBanner>
            <MatchRequest />
            <AllRequest />
          </ResultsBanner>

            </>
        
    )
}

export default ExplorePage;