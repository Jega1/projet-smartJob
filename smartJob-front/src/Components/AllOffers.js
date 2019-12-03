import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
//import * as contentful from "contentful";
import Offers from "./Offers"

export default class AllOffers extends Component {
	render() {
		return (
			<div>
				<TextField
				// style={{ padding: 24 }}
				// id=""
				// placeholder="search par ville"
				// margin="normal"
				// onChange={}
				/>

				<Grid container spacing={24} style={{ padding: 24 }}>
					{/* {this.state.AllOffers.map()} */}
					<Grid item xs={12} sm={6} lg={4} xl={3}>
						taratatatatatatttta
					</Grid>
				</Grid>
			</div>
		);
	}
}
