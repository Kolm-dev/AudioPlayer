import { useRef, useState } from "react";
import { PlayerControls } from "../PlayerControls/PlayerControls";
import { PlayerProgress } from "../PlayerProgress/PlayerProgress";

import "./Player.scss";
import { PlayList } from "../PlayList";
import { InputAddSong } from "../InputAddSong";

interface Song {
	title: string;
	url: string;
}

export enum PlayerStatus {
	PLAY = "play",
	STOP = "stop",
	PAUSE = "pause",
}

export const Player = () => {
	const audio = useRef<HTMLAudioElement>(null);
	const [isModalVisible] = useState(true);
	const [status, setStatus] = useState<PlayerStatus>(PlayerStatus.STOP);
	const [playlist, setPlaylist] = useState<Song[]>([
		{
			title: "Sound 1",
			url: "songs/2.mp3",
		},
		{
			title: "Sound 2",
			url: "songs/1.mp3",
		},
		{
			title: "Tremory Mega",
			url: "songs/Tremory Mega.mp3",
		},
		{ title: "A call the soul", url: "songs/A call the soul.mp3" },
		{ title: "Forest Lullaby", url: "songs/Forest Lullaby.mp3" },
		{ title: "Weeknds", url: "songs/Weeknds.mp3" },
	]);

	const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;
		if (!files) return;

		const newSong: Song = {
			title: files[0].name,
			url: URL.createObjectURL(files[0]),
		};

		setPlaylist([...playlist, newSong]);
	};

	return (
		<div className="player-container">
			<PlayerControls
				setStatus={setStatus}
				status={status}
				player={audio}
			/>
			<PlayerProgress player={audio} />
			<audio
				ref={audio}
				src={playlist[1].url}
				preload="metadata"
			></audio>

			<PlayList
				setPlaylist={setPlaylist}
				setStatus={setStatus as React.Dispatch<React.SetStateAction<PlayerStatus>>}
				player={audio}
				playlist={playlist}
			/>

			<InputAddSong
				isModalVisible={isModalVisible}
				handleFileUpload={handleFileUpload}
			/>
		</div>
	);
};
