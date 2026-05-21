import type { Meta, StoryObj } from "@storybook/react";
import { BarVisualizer } from "./bar-visualizer";

const meta = {
  title: "UI/BarVisualizer",
  component: BarVisualizer,
  tags: ["autodocs"],
} satisfies Meta<typeof BarVisualizer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
