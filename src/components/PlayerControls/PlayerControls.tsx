import React from "react";
import "./PlayerControls.scss";

interface PlayerControlsProps {
	player: React.RefObject<HTMLAudioElement> | null;
}

export const PlayerControls = (props: PlayerControlsProps) => {
	const { player } = props;

	const playAduio = () => {
		if (!player || !player.current) return;
		player.current.play();
	};

	const stopAduio = () => {
		if (!player || !player.current) return;
		player.current.pause();
		player.current.currentTime = 0;
	};

	const pauseAduio = () => {
		if (!player) return;
		player.current?.pause();
	};
	return (
		<div className="player_control">
			<button
				className="control_button play"
				onClick={playAduio}
			></button>
			<button
				className="control_button stop"
				onClick={stopAduio}
			></button>

			<button
				className="control_button pause"
				onClick={pauseAduio}
			></button>

			
		</div>
	);
};
