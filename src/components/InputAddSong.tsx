/* eslint-disable no-unused-vars */
type Props = {
	handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
	isModalVisible: boolean;
};

export const InputAddSong = (props: Props) => {
	const { handleFileUpload, isModalVisible } = props;
	const inputContainer = {
		display: isModalVisible ? "flex" : "none",
		marginTop: "20px",
		justifyContent: "center",
	};

	return (
		<>
			<div
				style={inputContainer}
				className="file-input-container"
			>
				<input
					type="file"
					id="file"
					onChange={handleFileUpload}
					accept="audio/*"
				/>
				<label htmlFor="file">Add music from the device 🎵</label>
			</div>
		</>
	);
};
