import type { Meta, StoryObj } from "@storybook/react";
import { Combobox } from "./combobox";

const meta = {
  title: "UI/Combobox",
  component: Combobox,
  tags: ["autodocs"],
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
