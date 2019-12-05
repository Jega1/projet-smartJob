// import React, { Component } from "react";
// import Grid from "@material-ui/core/Grid";
// import TextField from "@material-ui/core/TextField";
// //import * as contentful from "contentful";
// import Offers from "./Offers";

// export default class AllAnnounce extends Component {
// 	render() {
// 		return (
// 			<div>
// 				<TextField
// 				// style={{ padding: 24 }}
// 				// id=""
// 				// placeholder="search par ville"
// 				// margin="normal"
// 				// onChange={}
// 				/>

// 				<Grid container spacing={24} style={{ padding: 24 }}>
// 					{/* {this.state.AllOffers.map()} */}
// 					<Grid item xs={12} sm={6} lg={4} xl={3}>
// 						taratatatatatatttta
// 					</Grid>
// 				</Grid>
// 			</div>
// 		);
// 	}
// }

import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";


export default class AllAnnounce extends Component {
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
