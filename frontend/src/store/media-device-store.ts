import { create } from "zustand";
import { persist } from "zustand/middleware";

interface MediaDeviceStoreStateProps {
	audio: string | null;
	video: string | null;
}

interface MediaDeviceStoreAddDeviceProps {
	type: "video" | "audio";
	value: string | null;
}

interface MediaDeviceStore {
	state: MediaDeviceStoreStateProps;
	addDevice: ({ type, value }: MediaDeviceStoreAddDeviceProps) => void;
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
