import type { Meta, StoryObj } from "@storybook/react";
import Video from "./video";

const meta = {
  title: "UI/Video",
  component: Video,
  tags: ["autodocs"],
} satisfies Meta<typeof Video>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
