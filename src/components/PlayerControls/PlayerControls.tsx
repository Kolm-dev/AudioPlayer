import React from "react";
import "./PlayerControls.scss";
import { PlayerStatus } from "../Player/Player";
interface PlayerControlsProps {
	player: React.RefObject<HTMLAudioElement> | null;
	setStatus: React.Dispatch<React.SetStateAction<PlayerStatus>>;
	status: PlayerStatus;
	playListLength: number;
}

export const PlayerControls = (props: PlayerControlsProps) => {
	const { player, status, playListLength, setStatus } = props;

	const playAduio = () => {
		if (!player || !player.current) return;
		setStatus(PlayerStatus.PLAY);
		player.current.play();
	};

	const stopAduio = () => {
		if (!player || !player.current) return;
		setStatus(PlayerStatus.STOP);
		player.current.pause();
		player.current.currentTime = 0;
	};

	const pauseAduio = () => {
		if (!player) return;
		setStatus(PlayerStatus.PAUSE);
		player.current?.pause();
	};

	const buttonPlay: React.ReactElement = (
		<button
			className="button_control play"
			onClick={playAduio}
		></button>
	);

	const buttonStop: React.ReactElement = (
		<button
			className="button_control stop"
			onClick={stopAduio}
		></button>
	);

	const buttonPause: React.ReactElement = (
		<button
			className="button_control pause"
			onClick={pauseAduio}
		></button>
	);
	return (
		<div
			style={{ display: playListLength ? "flex" : "none" }}
			className="player_control"
		>
			{status === PlayerStatus.PLAY ? buttonPause : buttonPlay}
			{buttonStop}
		</div>
	);
};
