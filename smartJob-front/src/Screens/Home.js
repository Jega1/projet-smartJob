import React from "react";
//import CandidatLogin from './Candidature/CandidatLogin'
import CandidatInscription from "./Candidature/CandidatInscription";
import Footer from "../Components/Footer";

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
					<Footer />
				</div>
			</div>
		);
	}
}
