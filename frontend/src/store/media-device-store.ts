import { create } from "zustand";
import { persist } from "zustand/middleware";

interface MediaDeviceState {
	audio: string | null;
	video: string | null;
}

interface MediaDeviceStore {
	state: MediaDeviceState;
	addDevice: ({ type, value }: { type: "video" | "audio"; value: string | null }) => void;
}

const useMediaDeviceStore = create<MediaDeviceStore>()(
	persist(
		set => ({
			state: {
				audio: null,
				video: null
			},

			addDevice: ({ type, value }) =>
				set(state => ({
					state: {
						...state.state,
						[type]: value
					}
				}))
		}),
		{
			name: "media-device-storage",
			partialize: state => ({
				state: {
					audio: state.state.audio,
					video: state.state.video
				}
			})
		}
	)
);

export default useMediaDeviceStore;
