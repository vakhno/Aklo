export const convertObjToRedisHset = <T extends object>(obj: T): { [K in keyof T]: string } => {
	const convertedObj = {} as { [K in keyof T]: string };

	for (const field in obj) {
		if (typeof (obj[field]) === "number") {
			convertedObj[field] = String(obj[field]);
		}
		else if (typeof (obj[field]) === "boolean") {
			convertedObj[field] = String(obj[field]);
		}
		else {
			convertedObj[field] = String(obj[field]);
		}
	}

	return convertedObj;
};
