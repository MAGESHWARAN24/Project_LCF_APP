import React from "react";
import {useForm} from "react-hook-form";
import {Button} from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

export default function EditUserForm() {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
    },
  });
  const {handleSubmit, control, formState} = form;
  return (
    <>
      <Form {...form}>
        <form
          className="flex flex-col justify-center gap-5 px-5"
          onSubmit={handleSubmit((data) => console.log(data))}
        >
          <FormField
            name="name"
            control={control}
            render={({field}) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="email"
            control={control}
            render={({field}) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button>Update</Button>
        </form>
      </Form>
    </>
  );
}
