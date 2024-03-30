import "./PlayList.scss";

interface PlayListProps {
	playlist: {
		title: string;
		url: string;
	}[];
	player: React.RefObject<HTMLAudioElement>;
}

export const PlayList = ({ playlist, player }: PlayListProps) => {
	const changeSong = (player: React.RefObject<HTMLAudioElement>, url: string) => {
		if (!player.current) return;
		player.current.src = url;
		player.current?.play();
	};

	return (
		<div className="playlist-container">
			{playlist.map(song => (
				<div
					className="playlist-item"
					onClick={() => {
						changeSong(player, song.url);
					}}
					key={song.title}
				>
					<div className="playlist-item__title">{song.title}</div>
				</div>
			))}
		</div>
	);
};
