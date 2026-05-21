import type { Meta, StoryObj } from "@storybook/react";
import { ResizablePanelGroup as Resizable } from "./resizable";

const meta = {
  title: "UI/Resizable",
  component: Resizable,
  tags: ["autodocs"],
} satisfies Meta<typeof Resizable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    direction: "horizontal",
  },
};
