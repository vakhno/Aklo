import type { Meta, StoryObj } from "@storybook/react";
import { LiveWaveform } from "./live-waveform";

const meta = {
  title: "UI/LiveWaveform",
  component: LiveWaveform,
  tags: ["autodocs"],
} satisfies Meta<typeof LiveWaveform>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
