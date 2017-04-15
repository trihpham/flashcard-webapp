import React from 'react';
import { Progress } from 'semantic-ui-react';

export default  ({score}) => {
	let message = null;
	let color = null;
	const formattedScore = Math.round(score);
	if (0 <= score && score <= 50){
		message = `You got ${formattedScore}. Keep Trying!`;
		color = 'red';
	} else if ( 50 <= score &&  score <= 80){
		message = `You got ${formattedScore}. There's still a bit of improvement to be made!`
		color = 'yellow';
	} else if (80 <= score && score <= 100){
		message = `You got ${formattedScore}. Good Work!`;
		color = 'green';
	}
	return(
		<div>
			<div className="quiz-result-progress-bar">
				<Progress fluid percent={formattedScore} progress color={color} />
			</div>
			<div>{message}</div>
		</div>
	);		 
}			