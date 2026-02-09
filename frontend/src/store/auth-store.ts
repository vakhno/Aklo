import { create } from "zustand";

import type { Session } from "@/queries/auth";

interface AuthState {
	session: Session | null;
	setSession: (session: Session) => void;
	clearSession: () => void;
	showLoginModal: boolean;
	openLoginModal: () => void;
	closeLoginModal: () => void;
}

export const useAuthStore = create<AuthState>(set => ({
	session: null,
	setSession: session => set({ session }),
	clearSession: () => set({ session: null }),
	showLoginModal: false,
	openLoginModal: () => set({ showLoginModal: true }),
	closeLoginModal: () => set({ showLoginModal: false })
}));
