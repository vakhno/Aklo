import { z } from "zod";

import { CATEGORY_LIST } from "../constants/category-list";
import { LANGUAGE_LIST } from "../constants/language-list";

export const NewRoomSchema = z.object({
	title: z.string({ required_error: "Title is required", invalid_type_error: "Title is invalid" }).min(10, "Title is too short").max(50, "Title is too long"),
	isCameraRequired: z.boolean({ required_error: "Camera is required", invalid_type_error: "Camera is invalid" }),
	isMicRequired: z.boolean({ required_error: "Mic is required", invalid_type_error: "Mic is invalid" }),
	language: z.enum(Object.keys(LANGUAGE_LIST) as [string, ...string[]], {
		errorMap: (issue) => {
			switch (issue.code) {
				case "invalid_type":
					if (issue.received === "undefined") {
						return { message: "Language is required" };
					}
					return { message: "Language is invalid" };
				case "invalid_enum_value":
					return { message: "Language is mismatch" };
				default:
					return { message: "Language unexpected error" };
			}
		},
	}),
	category: z.enum(Object.keys(CATEGORY_LIST) as [string, ...string[]], {
		errorMap: (issue) => {
			switch (issue.code) {
				case "invalid_type":
					if (issue.received === "undefined") {
						return { message: "Category is required" };
					}
					return { message: "Category is invalid" };
				case "invalid_enum_value":
					return { message: "Category is mismatch" };
				default:
					return { message: "Category unexpected error" };
			}
		},
	}),
});
