import { useState } from "react";
import "./PlayList.scss";
import { PlayerStatus } from "./Player/Player";

interface PlayListProps {
	playlist: {
		title: string;
		url: string;
	}[];
	setPlaylist: React.Dispatch<React.SetStateAction<{ title: string; url: string }[]>>;
	player: React.RefObject<HTMLAudioElement>;
	setStatus: React.Dispatch<React.SetStateAction<PlayerStatus>>;
}

export const PlayList = ({ playlist, setStatus, setPlaylist, player }: PlayListProps) => {
	const [activeSongUrl, setActiveSongUrl] = useState<string>("");
	const changeSong = (player: React.RefObject<HTMLAudioElement>, url: string) => {
		if (!player.current) return;
		player.current.src = url;
		player.current?.play();
		setStatus(PlayerStatus.PLAY);
		setActiveSongUrl(url);
	};

	const removeSong = (title: string) => {
		setPlaylist(playlist.filter(song => song.title !== title));
	};
	console.log(activeSongUrl);

	return (
		<div className="playlist-container">
			{playlist.map(song => (
				<div
					className={`playlist-item ${song.url === activeSongUrl ? "active" : ""}`}
					onClick={() => changeSong(player, song.url)}
					key={song.title}
				>
					<div
						onClick={e => {
							e.stopPropagation();
							removeSong(song.title);
						}}
						className="playlist-item__delete"
					></div>
					<div className="playlist-item__title">{song.title}</div>
				</div>
			))}
		</div>
	);
};
