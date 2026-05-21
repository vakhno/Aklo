import type { Meta, StoryObj } from "@storybook/react";
import { Empty } from "./empty";

const meta = {
  title: "UI/Empty",
  component: Empty,
  tags: ["autodocs"],
} satisfies Meta<typeof Empty>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
