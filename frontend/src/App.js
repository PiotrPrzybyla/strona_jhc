import React from "react";
import "./App.css";
import axios from "axios";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = { list: [], currentTask: "" };
	}
	componentDidMount() {
		axios.get("endpoint").then((res) => {
			const list = res.data;
			this.setState({ list });
		});
	}

	render() {
		return (
			<div>
				<h1>ToDoList</h1>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						let task = this.state.currentTask;
						axios.post("endpoint", task);
						this.setState({ currentTask: "" });
						axios.get("endpoint").then((res) => {
							const list = res.data;
							this.setState({ list });
						});
					}}
				></form>
				<input
					type="text"
					placeholder="add new task"
					value={this.state.currentTask}
					onChange={(e) => this.setState({ currentTask: e.target.value })}
				/>
				<button>add</button>
				<ul>
					{this.state.list.map((list) => {
						<li>
							<div>{list.content}</div>
							<button>Delete</button>
						</li>;
					})}
				</ul>
			</div>
		);
	}
}

export default App;
