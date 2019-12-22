import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Api from "../../Services/Api";

export default class AllAnnounce extends Component {
	constructor(props) {
		super(props);
		this.api = new Api();
		this.state = {
			annonces: []
		};
	}

	render() {
		return (
			<div>
				<Card>
					<CardMedia
						style={{ height: 0, paddingTop: "5%" }}
						// image={this.}
						// title={this}
					/>
					<CardContent>
						<Typography gutterBottom variant="headline" componant="h2">
							{/* {this.props.} */}
						</Typography>
						<Typography componant="p">
							{/* {this.props.discription} */}
						</Typography>
					</CardContent>

					<CardActions>
						<Button size="small" color="primary" href="" target="_blank">
							go to shop
						</Button>
					</CardActions>
				</Card>
			</div>
		);
	}
}
