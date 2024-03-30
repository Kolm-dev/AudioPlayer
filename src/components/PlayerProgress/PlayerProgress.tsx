import React, { useEffect, useState } from "react";
import "./PlayerProgress.scss";
import { Line } from "rc-progress";

interface PlayerProgressProps {
	player: React.RefObject<HTMLAudioElement>;
}

type Time = number;

export const PlayerProgress = ({ player }: PlayerProgressProps) => {
	const [progress, setProgress] = useState(0);
	const [isReady, setIsReady] = useState(false);
	const [duration, setDuration] = useState(0);
	const [currentTime, setCurrentTime] = useState(0);

	const setAudioData = () => {
		if (player.current) {
			setDuration(player.current.duration);
			setCurrentTime(player.current.currentTime);
		}
	};

	const updateTime = () => {
		if (player.current) {
			setCurrentTime(player.current.currentTime);
			const newProgress = (player.current.currentTime / player.current.duration) * 100;
			setProgress(newProgress);
		}
	};

	const formatTime = (time: Time) => {
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time % 60);
		return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
	};

	useEffect(() => {
		const audioElement = player.current;

		if (audioElement) {
			audioElement.addEventListener("loadedmetadata", setAudioData);
			audioElement.addEventListener("timeupdate", updateTime);

			setIsReady(true);
		}

		return () => {
			if (audioElement) {
				audioElement.removeEventListener("loadedmetadata", setAudioData);
				audioElement.removeEventListener("timeupdate", updateTime);
			}
		};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [player]);

	return (
		<div>
			{isReady ? (
				<div>
					<div className="progress_time">
						{formatTime(currentTime)} / {formatTime(duration)}
					</div>
					<Line
						percent={progress}
						strokeWidth={3}
						strokeColor="pink"
						trailWidth={3}
						trailColor="lightgray"
						strokeLinecap="butt"
						className="progress_line"
					/>
				</div>
			) : (
				<div>Loading...</div>
			)}
		</div>
	);
};
