import React, { useEffect, useState } from "react";
import { Link, useAuth } from "../hooks/useAuth";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import HowTo from "./HowTo";
import { MenuItems, MenuItem } from "../constants/MenuItems";
import { ToastContainer } from "react-toastify";
import { showToastErrorMessage, showToastSucessMessage } from "./Toast";

type Props = {
	link?: Link;
};

type FormValues = {
	devLinks: Link[];
};

const DevLinkDynamicForm: React.FC<Props> = () => {
	const { user, updateLinks } = useAuth();
	const [devlinkInputs, setDevLinkInputs] = useState(user?.links as any[]);
	const disabled = user?.links.length == 5;

	useEffect(() => {
		setDevLinkInputs(user?.links as any[]);
	}, [user?.links]);

	const {
		register,
		control,
		formState: { errors },
		handleSubmit,
		setValue,
		getValues,
	} = useForm<FormValues>({
		defaultValues: {
			devLinks: devlinkInputs,
		},
	});
	const { fields, remove, append } = useFieldArray({
		name: "devLinks",
		control,
	});

	function menuItemPlatformLookup(platform: string): MenuItem {
		let result = {} as MenuItem;
		for (let item of MenuItems) {
			if (item.platform === platform) {
				result = item;
			}
		}
		return result;
	}

	function validateURL(url: string, platform: string): boolean {
		const baseURL = menuItemPlatformLookup(platform)["baseURL"];
		return url.startsWith(baseURL);
	}

	const onSubmit: SubmitHandler<FormValues> = async (data) => {
		try {
			setDevLinkInputs(data.devLinks);
			updateLinks(data.devLinks);
			showToastSucessMessage("Succesfully updated links!")
		} catch (error: any) {
			showToastErrorMessage(error.message)
		}
		
	};

	const RenderFields: React.FC = () => {
		return fields.map((field, idx) => {
			return (
				<div
					key={field.id}
					className="flex flex-col bg-neutral w-full p-6 rounded-xl my-8"
				>
					<div className="flex justify-between">
						<div className="flex items-center space-between">
							<img
								src="/icon-drag-and-drop.svg"
								alt="drag and drop icon"
							></img>
							<h3 className="ml-2 font-bold text-gray">{`Link #${
								idx + 1
							}`}</h3>
						</div>

						<button
							onClick={() => remove(idx)}
							className="btn btn-ghost btn-sm text-gray font-light"
						>
							Remove
						</button>
					</div>
					<div className="form-control w-full">
						<label htmlFor="platform" className="label">
							<span className="label-text text-xs">Platform</span>
						</label>
						<div className="w-full relative">
							<select
								{...register(`devLinks.${idx}.platform`)}
								className="select select-bordered platform px-11 w-full"
								id={field.id}
								name={`devLinks.${idx}.platform`}
								onChange={(e) => {
									let platformLookup = menuItemPlatformLookup(
										e.target.value
									);
									setValue(
										`devLinks.${idx}.url`,
										platformLookup["baseURL"]
									);
									setValue(
										`devLinks.${idx}.iconPath`,
										platformLookup["iconPath"]
									);
								}}
							>
								{MenuItems.map((item, index) => (
									<option key={index}>{item.platform}</option>
								))}
							</select>
							<img
								className="absolute bottom-4 left-4"
								src={devlinkInputs[idx].iconPath}
								alt="platform icon"
							></img>
						</div>

						<div className="relative">
							<label htmlFor="link" className="label">
								<span className="label-text text-xs">Link</span>
							</label>
							<input
								{...register(`devLinks.${idx}.url`, {
									required: "Can't be empty",
									validate: (v) =>
										validateURL(
											v,
											getValues(
												`devLinks.${idx}.platform`
											)
										) || "Please check the URL",
								})}
								id={field.id}
								name={`devLinks.${idx}.url`}
								className={
									errors.devLinks?.[idx]?.url?.message
										? "input input-bordered w-full px-11 input-error"
										: "input input-bordered w-full px-11 focus:border-primary"
								}
							/>
							<span className="text-error text-sm absolute right-4 bottom-3">
								{errors.devLinks?.[idx]?.url?.message}
							</span>
							<img
								className="absolute bottom-4 left-4"
								src="./icon-link.svg"
								alt="platform icon"
							></img>
						</div>
					</div>
				</div>
			);
		});
	};

	return (
		<div>
			<ToastContainer />
			<form onSubmit={handleSubmit(onSubmit)}>
				<div>
					<h1 className="text-3xl font-bold">Customize your links</h1>
					<p className="text-gray mt-2">
						Add/edit/remove links below and then share all your
						profiles with the world!
					</p>
					<button
						onClick={(e) => {
							e.preventDefault();
							append({
								url: "https://",
								platform: "Custom",
								iconPath: "/logo-devlinks-small.svg",
								id: Date.now().toString(),
							});
						}}
						className="btn btn-outline btn-primary w-full mt-10"
						disabled={disabled}
					>
						+ Add new link
					</button>
				</div>
				{fields.length === 0 ? <HowTo /> : <RenderFields />}

				<div className="divider"></div>
				<div className="flex justify-end w-full">
					<button type="submit" className="btn btn-primary">
						Save
					</button>
				</div>
			</form>
		</div>
	);
};

export default DevLinkDynamicForm;
