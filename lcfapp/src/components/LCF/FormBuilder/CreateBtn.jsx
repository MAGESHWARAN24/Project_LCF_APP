import React from "react";
import {LuFilePlus} from "react-icons/lu";
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

const formSchema = z.object({
  name: z.string().trim().nonempty(),
  title: z.string().trim().nonempty(),
  description: z.string().trim().optional(),
  formType: z
    .number()
    .transform((val) => val.toString())
    .pipe(z.string().nonempty()),
  layoutType: z
    .string()
    .transform((val) => val.toString())
    .pipe(z.string().nonempty()),
});

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {CaretSortIcon, CheckIcon} from "@radix-ui/react-icons";
import {cn} from "@/lib/utils";

const FormOptions = [
  {key: 1, value: "Standarded form"},
  {key: 2, value: "Grid view"},
  {key: 3, value: "Search dialog"},
  {key: 4, value: "Card view"},
  {key: 5, value: "Complex view"},
];
//form type standarded form,grid view,search dialog,card view,complex form
const LayoutOptions = [{key: 1, value: "Standard layout"}];
export default function CreateBtn() {
  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      title: "",
      description: "",
      formType: "", //drop down
      layoutType: "",
    },
  });

  const [formTypeOpen, setFormTypeOpen] = React.useState(false);
  const [formLayOutOpen, setFormLayOutOpen] = React.useState(false);
  const {handleSubmit, control, setValue} = form;
  const submit = async (data) => {
    console.log(data);
  };
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant={"outline"}
            className="group border border-primary/20 h-40 items-center justify-center flex flex-col hover:border-primary hover:cursor border-dashed gap-4"
          >
            <LuFilePlus className="h-8 w-8 text-muted-foreground group-hover:text-primary" />
            <p className="font-bold text-lg text-muted-foreground group-hover:text-primary">
              Create new form
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
                    <FormLabel>Name *</FormLabel>
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
                    <FormLabel>Title *</FormLabel>
                    <FormControl>
                      <Input placeholder="Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="formType"
                control={control}
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Form type *</FormLabel>
                    <br />
                    <FormControl>
                      <Popover
                        open={formTypeOpen}
                        onOpenChange={setFormTypeOpen}
                      >
                        <PopoverTrigger asChild>
                          <div className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 cursor-pointer">
                            {field.value ? (
                              FormOptions[field.value - 1].value
                            ) : (
                              <div className="h-9 w-full flex flex-row items-center justify-between">
                                {"Select the form type"}
                              </div>
                            )}
                            <CaretSortIcon className="h-4 w-4 opacity-50" />
                          </div>
                        </PopoverTrigger>
                        <PopoverContent>
                          <Command>
                            <CommandInput placeholder="Search the form type" />
                            <CommandList>
                              <CommandEmpty>No form type found.</CommandEmpty>
                              <CommandGroup>
                                {FormOptions.map((types) => (
                                  <CommandItem
                                    key={types.key}
                                    value={types.value}
                                    onSelect={() => {
                                      setValue("formType", types.key);
                                      setFormTypeOpen(false);
                                    }}
                                    className="flex items-center justify-between"
                                  >
                                    {types.value}
                                    <CheckIcon
                                      className={cn(
                                        field.value === types.key
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="layoutType"
                control={control}
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Layout type *</FormLabel>
                    <FormControl>
                      <Popover
                        open={formLayOutOpen}
                        onOpenChange={setFormLayOutOpen}
                      >
                        <PopoverTrigger asChild>
                          <div className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 cursor-pointer">
                            {field.value ? (
                              FormOptions[field.value - 1].value
                            ) : (
                              <div className="h-9 w-full flex flex-row items-center justify-between">
                                {"Select the layout"}
                              </div>
                            )}
                            <CaretSortIcon className="h-4 w-4 opacity-50" />
                          </div>
                        </PopoverTrigger>
                        <PopoverContent>
                          <Command>
                            <CommandInput placeholder="Search the form type" />
                            <CommandList>
                              <CommandEmpty>No form type found.</CommandEmpty>
                              <CommandGroup>
                                {LayoutOptions.map((types) => (
                                  <CommandItem
                                    key={types.key}
                                    value={types.value}
                                    onSelect={() => {
                                      setValue("layoutType", types.key);
                                      setFormLayOutOpen(false);
                                    }}
                                    className="flex items-center justify-between"
                                  >
                                    {types.value}
                                    <CheckIcon
                                      className={cn(
                                        field.value === types.key
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
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
                    <FormLabel>Description *</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button>Create</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
