import React from "react";
//import CandidatLogin from './Candidature/CandidatLogin'
import CandidatInscription from "./Candidature/CandidatInscription";
import Footer from "../Components/Footer";
import AllOffers from "../Components/AllAnnounce";
import Carousel from "../Components/Carousel";
import MediaList from "../Components/MediaList";
import ToastOne from "../Components/ToastOne";
import TabsBlock from "../Components/TabsBlock";
import Parallax from "../Components/Parallax";
import Header from "../Components/Header";

export default class Home extends React.Component {
	// constructor(props){
	//         super(props)
	// }

	render() {
		return (
			<div className="Home">
				<div>
					{/* <Header/> */}
					<Carousel />
					<MediaList />
					<Parallax/>
					<ToastOne />
					<TabsBlock/>
					<Footer />
					{/* <CandidatLogin /> */}
					{/* <CandidatInscription /> */}
				</div>
			</div>
		);
	}
}
