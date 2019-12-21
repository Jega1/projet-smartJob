import React, { Component } from "react";

import { Media, Button } from "reactstrap";

export default class AnnonceDetaille extends Component {

	constructor(props){
		super(props)
		this.state = {
			...this.props.annonce
		}
	}


	render() {
		return (

			<Media>
				<Media left href="#">
					<Media
						object
						data-src="holder.js/64x64"
						alt="Generic placeholder image"
					/>
				</Media>
				<Media body>
					<Media heading>détailles</Media>
                         <p className="pdText">
                        		Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
                                  scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in
                                 vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi
                                 vulputate fringilla. Donec lacinia congue felis in faucibus.
                         </p>

                         <h5>Prix </h5>
                    <h5>Taille </h5>

                    <Button
                        color="primary"
                        // onClick={() => this.ajouterAuPanier(annonce)}
                    >
                        Ajouter au panier
							</Button>
                    <Button 
                    color="success" 
                    padding-left="2rem"
                    // onClick={this.ProduitDetaille}
                    >
                        continuer vos achats
							</Button>
				</Media>
			</Media>
		);
	}
}
