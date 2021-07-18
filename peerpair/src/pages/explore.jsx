import React from 'react';
import MatchRequest from '../../src/components/matchRequest/matchRequest.jsx';
import AllRequest from '../../src/components/allRequest/allRequest.jsx';



//for route '/explore'
const ExplorePage = (props) =>{
    return (
        <>
            <MatchRequest/>
            <AllRequest/>
        </>
    )
}

export default ExplorePage;