import type { Meta, StoryObj } from "@storybook/react";
import { Form } from "./form";

const meta = {
  title: "UI/Form",
  component: Form,
  tags: ["autodocs"],
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

import { useForm } from "react-hook-form";

export const Default: Story = {
  args: {} as any,
  render: () => {
    const form = useForm();
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(() => {})}>
          Form content
        </form>
      </Form>
    );
  },
};
