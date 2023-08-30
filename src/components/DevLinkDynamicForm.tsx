import React, { useEffect, useState } from "react";
import { Link, useAuth } from "../hooks/useAuth";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import HowTo from "./HowTo";
import { MenuItems } from "../constants/MenuItems";

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

	function getPlatformURL(platform: string): string {
		let result = "";
		for (let item of MenuItems) {
			if (item.platform === platform) {
				result = item.baseURL;
			}
		}
		return result;
	}

	function validateURL(url: string, platform: string): boolean {
		const baseURL = getPlatformURL(platform);
		return url.startsWith(baseURL);
	}

	const onSubmit: SubmitHandler<FormValues> = (data) => {
		setDevLinkInputs(data.devLinks);
		updateLinks(data.devLinks);
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
						<select
							{...register(`devLinks.${idx}.platform`)}
							className="select select-bordered platform"
							id={field.id}
							name={`devLinks.${idx}.platform`}
							onChange={(e) =>
								setValue(
									`devLinks.${idx}.url`,
									getPlatformURL(e.target.value)
								)
							}
						>
							{MenuItems.map((item, index) => (
								<option key={index}>{item.platform}</option>
							))}
						</select>
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
										? "input input-bordered w-full input-error"
										: "input input-bordered w-full focus:border-primary"
								}
							/>
							<span className="text-error text-sm absolute right-4 bottom-3">
								{errors.devLinks?.[idx]?.url?.message}
							</span>
						</div>
					</div>
				</div>
			);
		});
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div>
				<h1 className="text-3xl font-bold">Customize your links</h1>
				<p className="text-gray mt-2">
					Add/edit/remove links below and then share all your profiles
					with the world!
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
	);
};

export default DevLinkDynamicForm;
