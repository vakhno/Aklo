import type { Meta, StoryObj } from "@storybook/react";
import { Item } from "./item";

const meta = {
  title: "UI/Item",
  component: Item,
  tags: ["autodocs"],
} satisfies Meta<typeof Item>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
