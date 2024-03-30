import "./PlayList.scss";

interface PlayListProps {
	playlist: {
		title: string;
		url: string;
	}[];
	setPlaylist: React.Dispatch<React.SetStateAction<{ title: string; url: string }[]>>;
	player: React.RefObject<HTMLAudioElement>;
}

export const PlayList = ({ playlist, setPlaylist, player }: PlayListProps) => {
	const changeSong = (player: React.RefObject<HTMLAudioElement>, url: string) => {
		if (!player.current) return;
		player.current.src = url;
		player.current?.play();
	};

	const removeSong = (title: string) => {
		setPlaylist(playlist.filter(song => song.title !== title));
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
