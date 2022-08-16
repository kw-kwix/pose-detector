import React, { useState } from "react";
import Mediapipe from "./Mediapipe";
import { har } from "./service/model";
import Clock from "./Clock.js";
import Weather from "./Weather.js";
import { RealTimeChart } from "./components/Chart";

function App() {
	let [score, setScore]=useState(0);
	let [action, setAction]=useState('----');
	
	function poseName (e) {
		setPose(`LS_${e.target.value}_model_tfjs`)
		setAction(`${e.target.value}`)
	}
	
	
	const [pose, setPose] = React.useState(undefined);
	React.useEffect(() => {
		if (pose) {
			har.loadModel(pose);
			console.log("load model");
		}
	});

	setInterval(() => {
		setTimeout(() => {
			setScore(Math.round(har.result*100))
		}, 100)
	}, 100);

	return (
		<div className="App">
			<div className="line">
				<Clock/>
				<Weather/>
			</div>
			<br></br>
			<button className="w-btn w-btn-indigo" value="babel_curl" onClick={e=>poseName(e)}>babel curl</button>
			<button className="w-btn w-btn-indigo" value="deadlift" onClick={e=>poseName(e)}>deadlift</button>
			<button className="w-btn w-btn-indigo" value="knee_up" onClick={e=>poseName(e)}>knee up</button>
			<button className="w-btn w-btn-indigo" value="leg_raise" onClick={e=>poseName(e)}>leg raise</button>
			<button className="w-btn w-btn-indigo" value="over_head_press"onClick={e=>poseName(e)}>overhead press</button>
			<button className="w-btn w-btn-indigo" value="side_crunch" onClick={e=>poseName(e)}>side crunch</button>
			<button className="w-btn w-btn-indigo" value="side_lunge" onClick={e=>poseName(e)}>side lunge</button>
			<button className="w-btn w-btn-indigo" value="squat" onClick={e=>poseName(e)}>squat</button>
			<div>
				<Mediapipe></Mediapipe>
				<div className="detail">
					<a>	현재 운동 : { action }</a><br/>
					<a> 운동 횟수 : </a>
					<div>
						<div>정확도 : { score }%</div>  
						<progress value={score} max="100"></progress>
					</div>
					<div>
						<RealTimeChart></RealTimeChart>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
