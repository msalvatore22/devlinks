import React from "react";
import { Link } from "../hooks/useAuth";

type Props = {
	link: Link;
};

type JSONValue = string;

interface JSONObject {
	[x: string]: JSONValue;
}

const platformColors: JSONObject = {
	github: "#1a1a1a",
	frontendmentor: "#3e52a3",
	twitter: "#42b7e9",
	linkedin: "#2d68ff",
	youtube: "#ef3938",
	facebook: "#2442ac",
	twitch: "#ee3fc8",
	"dev.to": "#333333",
	codewars: "#8a1a50",
	freecodecamp: "#302267",
	gitlab: "#eb4924",
	hashnode: "#0430d1",
	stackoverflow: "#ec7100",
	custom: "#33333",
};

const LinkButton: React.FC<Props> = ({ link }) => {
	const platformColorLookup: string =
		platformColors[link.platform.toLowerCase().split(" ").join("")];

	return (
		<a
			href={link.url}
			style={{ backgroundColor: platformColorLookup }}
			className="btn flex text-base-100 justify-between w-full mt-4"
		>
			<div className="flex items-center">
				<img
					className="mr-2"
					style={{
						filter: "brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(13%) hue-rotate(261deg) brightness(104%) contrast(103%)",
					}}
					src={link.iconPath}
					alt="platform icon"
				/>
				{link.platform}
			</div>
			<img src="/icon-arrow-right.svg" alt="right arrow" />
		</a>
	);
};

export default LinkButton;
