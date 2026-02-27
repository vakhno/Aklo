export type UserType = {
	id: string;
	email: string;
	name?: string | null;
	image?: string | null;
	emailVerified?: boolean;
	role?: string;
	createdAt?: Date;
	updatedAt?: Date;
};

export type ListUsersResponse = {
	users: UserType[];
	total?: number;
	limit?: number;
	offset?: number;
};
