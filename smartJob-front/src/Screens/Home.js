import React from "react";
//import CandidatLogin from './Candidature/CandidatLogin'
import CandidatInscription from "./Candidature/CandidatInscription";
import Footer from "../Components/Footer";
import AllOffers from  "../Components/AllOffers"

export default class Home extends React.Component {
	// constructor(props){
	//         super(props)
	// }

	render() {
		return (
			<div className="Home">
				<div>
					{/* <CandidatLogin /> */}
					{/* <CandidatInscription /> */}
					<AllOffers/>
					<Footer />
				</div>
			</div>
		);
	}
}
