import React from "react";
import {TbApps} from "react-icons/tb";
import {Button} from "@/components/ui/button";
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {useDispatch, useSelector} from "react-redux";
import {applicationCreate} from "@/Redux/Slices/Application.Slice";
import {toast} from "@/components/ui/use-toast";
import {CgSpinner} from "react-icons/cg";

const formSchema = z.object({
  name: z.string().trim().nonempty(),
  title: z.string().trim().nonempty(),
  description: z.string().default("No description").optional(),
});

export default function CreateBtn() {
  const [open, setOpen] = React.useState(false);
  const {status} = useSelector((state) => state.Application);
  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      title: "",
      description: "",
    },
  });

  const {handleSubmit, control, formState, reset} = form;
  React.useEffect(() => {
    if (formState.isSubmitSuccessful) {
      if (status === "OK")
        toast({
          variant: "success",
          title: "Success",
          description: "New application created successfully",
        });
      setOpen((pre) => !pre);
      reset();
    }
  }, [status, reset, formState.isSubmitSuccessful]);
  const dispatch = useDispatch();
  const submit = async (data) => {
    await dispatch(applicationCreate(data));
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant={"outline"}
            className="group border border-primary/20 h-40 items-center justify-center flex flex-col hover:border-primary hover:cursor border-dashed gap-4"
          >
            <TbApps className="h-8 w-8 text-muted-foreground group-hover:text-primary" />
            <p className="font-bold text-lg text-muted-foreground group-hover:text-primary">
              Create new application
            </p>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <Form {...form}>
            <form
              onSubmit={handleSubmit(submit)}
              className="flex flex-col gap-3 w-full"
            >
              <FormField
                name="name"
                control={control}
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="title"
                control={control}
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="description"
                control={control}
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button>
                {formState?.isSubmitting ? <CgSpinner /> : "Create"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
