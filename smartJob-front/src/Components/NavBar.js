import React, { Component } from "react";
import { Link } from "react-router-dom";



export default class NavBar extends Component {
	render() {
		return (

			<nav id='menu' class="navbar navbar-expand-lg navbar-dark ">
				<Link to="/" class="navbar-brand" >
					<i class="fas fa-home"></i>
				</Link>
			

				<button
					class="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarNavDropdown"
					aria-controls="navbarNavDropdown"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span class="navbar-toggler-icon"></span>
				</button>

				<div class="collapse navbar-collapse" id="navbarNavDropdown">
					<ul class="navbar-nav">
						<li class="nav-item">
							<Link to="/" className="nav-link">
								Home
							</Link>
						</li>
						<li class="nav-item">
							<Link className="nav-link" to=" ">
								contact
							</Link>
						</li>



						
						<li class="nav-item dropdown">
							<a
								class="nav-link dropdown-toggle"
								href="#"
								id="navbarDropdownMenuLink"
								data-toggle="dropdown"
								aria-haspopup="true"
								aria-expanded="false"
							>
								Dashboard
							</a>
							<div
								class="dropdown-menu"
								aria-labelledby="navbarDropdownMenuLink"
							>
								<Link to="/AddPhone" class="dropdown-item" >
									Ajouter produit
								</Link>
								<Link to="/AllPhone" class="dropdown-item">
									List de produit
								</Link>
								<Link to="/Edit" class="dropdown-item" >
									Change produit
								</Link>
							</div>
						</li>
					</ul>

					<ul class="collapse navbar-collapse flex-grow-1 text-right" id="myNavbar" class="navbar-nav ml-auto flex-nowrap">
															
						<li className="menu__list-item">
							<Link className="menu__link" to="/about">
								Accès recruter
								</Link>
						</li>
						<li class="nav-item">
							<a href="#" class="nav-link m-2 menu-item">Inscrire</a>
						</li>
						<li class="nav-item">
							<Link to="/Basket" class="nav-link m-2 menu-item nav-active"><i class="fas fa-shopping-basket"></i></Link>
						</li>
					</ul>

				</div>
			</nav>
		);
	}
}