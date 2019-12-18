import React from "react";
import ClientInscription from "./Client/ClientInscription";
import Footer from "../Components/Footer";
import Carousel from "../Components/Carousel";
import MediaList from "../Components/MediaList";
import AllAnnounce from "../Components/AllAnnounce";
import NavBar from "../Components/NavBar";



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
