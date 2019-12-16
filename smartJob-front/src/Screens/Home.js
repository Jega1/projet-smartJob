import React from "react";
import ClientInscription from "./Client/ClientInscription";
import Footer from "../Components/Footer";
import AllOffers from "../Components/AllAnnounce";
import Carousel from "../Components/Carousel";
import MediaList from "../Components/MediaList";


export default class Home extends React.Component {


	render() {
		return (
			<div className="Home">
				<div>
				
					<Carousel />
					<MediaList />
					
					<Footer />

				</div>
			</div>
		);
	}
}
