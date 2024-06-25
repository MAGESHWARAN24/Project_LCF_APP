import React from "react";
import {Button} from "@/components/ui/button";
import {RxCross2} from "react-icons/rx";
import {FaEdit} from "react-icons/fa";
import {useDesginer} from "@/Hooks/DesignerProvider";
import {useDispatch, useSelector} from "react-redux";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {useFieldArray, useForm} from "react-hook-form";
import {Input} from "@/components/ui/input";
import {Switch} from "@/components/ui/switch";
import {Checkbox} from "@/components/ui/checkbox";
import {IoMdAddCircle, IoMdRemoveCircle} from "react-icons/io";
import {FiPlus} from "react-icons/fi";
import {Label} from "@/components/ui/label";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {ScrollArea} from "@/components/ui/scroll-area";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {UpdateProperty} from "@/Redux/Slices/Builder.Sclice";

const schema = (type) => {
  switch (type) {
    case "Textarea":
    case "Textbox":
    case "Number":
      return z.object({
        Name: z.string().trim(),
        Label: z.string().trim(),
        Placeholder: z.string().trim(),
        Required: z.boolean().optional(),
        Helpertext: z.string().trim().optional(),
        ForeignKey: z.boolean().optional(),
        Min: z
          .string()
          .trim()
          .transform((val) => parseInt(val))
          .pipe(z.number().gt(1).nonnegative())
          .optional(),
        Max: z
          .string()
          .transform((val) => parseInt(val))
          .pipe(z.number().gt(1).nonnegative())
          .optional(),
      });
    case "Datepicker":
      return z.object({
        Name: z.string().trim(),
        Label: z.string().trim(),
        Placeholder: z.string().trim(),
        Required: z.boolean().optional(),
        Helpertext: z.string().trim().optional(),
        ForeignKey: z.boolean().optional(),
      });
    case "Checkbox":
      return z.object({
        Name: z.string().trim(),
        Label: z.string().trim(),
        Required: z.boolean().optional(),
        Helpertext: z.string().trim().optional(),
        ForeignKey: z.boolean().optional(),
      });
    case "Select":
      return z.object({
        Name: z.string().trim(),
        Label: z.string().trim(),
        Placeholder: z.string().trim().trim(),
        Required: z.boolean().optional(),
        SelectType: z.enum(["static", "dynamic"]),
        Options: z
          .array(
            z.object({
              value: z.string().nonempty({message: "Required"}).trim(),
            })
          )
          .min(1, {message: "Atleast minimum one options required"}),
        Helpertext: z.string().trim().trim().optional(),
        ForeignKey: z.boolean().optional(),
      });
    case "Radio":
      return z.object({
        Name: z.string().trim(),
        Label: z.string().trim(),
        Placeholder: z.string().trim().trim(),
        Required: z.boolean().optional(),
        Options: z
          .array(
            z.object({
              value: z.string().nonempty({message: "Required"}).trim(),
            })
          )
          .min(1, {message: "Atleast minimum one options required"}),
        Helpertext: z.string().trim().trim().optional(),
        ForeignKey: z.boolean().optional(),
      });
    case "Attachment":
      return z.object({
        Name: z.string().trim(),
        Label: z.string().trim(),
        Required: z.boolean().optional(),
        Helpertext: z.string().trim().optional(),
        ForeignKey: z.boolean().optional(),
      });
  }
};

export default function ElementCustomizer() {
  const {toggle, SetToggle} = useDesginer();
  const dispatch = useDispatch();
  const {content} = useSelector((state) => state.Builder);
  const [properties, setProperties] = React.useState([]);
  const [elementType, setElementType] = React.useState(null);
  React.useEffect(() => {
    const props = content.find((x) => x?.id === toggle?.id);
    if (props) {
      const {properties, type} = props;
      setElementType(type);
      setProperties(properties);
    }
  }, [toggle?.id, properties]);

  const form = useForm({
    mode: "onChange",
    defaultValues: content.find((x) => x?.id === toggle?.id).properties,
    resolver: zodResolver(schema(elementType)),
  });

  const {handleSubmit, control} = form;
  const OptionsField = useFieldArray({
    control,
    name: "Options",
  });
  const {fields, append, remove} = OptionsField;
  const handleModifiedProperty = (data) => {
    const index = [...content].findIndex((x) => x.id === toggle.id);
    dispatch(UpdateProperty({index, modified: data}));
  };
  return (
    <>
      <header className="h-14 w-full flex items-center justify-between shadow-sm border">
        <nav className="h-14 w-full flex flex-row items-center justify-between px-5">
          <p className="text-xl flex items-center gap-2">
            <FaEdit /> Edit
          </p>
          <div className="flex flex-row items-center gap-5">
            <Button onClick={handleSubmit(handleModifiedProperty)}>
              Update
            </Button>
            <div
              variant="outline"
              className="size-fit cursor-pointer hover:border border-primary rounded-lg "
              onClick={() =>
                SetToggle((pre) => {
                  return {
                    id: null,
                    state: false,
                  };
                })
              }
            >
              <RxCross2 size={"24"} />
            </div>
          </div>
        </nav>
      </header>
      <main className="h-[80%] w-full px-5">
        <Form {...form}>
          <form className="w-full flex flex-col gap-3 justify-center items-start">
            {Object.entries(properties).map(([key, value], i) => {
              switch (key) {
                case "Required":
                  return (
                    <FormField
                      key={key}
                      name={key}
                      control={control}
                      render={({field}) => (
                        <FormItem>
                          <div className="flex items-center gap-2">
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel>{key}</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  );
                case "Options":
                  return (
                    <div key={key} className="h-full w-full flex flex-col">
                      <div className="flex flex-col">
                        <div className="flex flex-row">
                          <Label className="text-lg">{key}</Label>
                          <FiPlus
                            size={"30"}
                            className="cursor-pointer"
                            onClick={() => {
                              append({value: `Option - ${fields.length + 1}`});
                            }}
                          />
                        </div>
                        <FormField
                          name="Options"
                          control={control}
                          render={({field}) => (
                            <FormItem>
                              <FormControl>
                                <ScrollArea className="h-40 w-full">
                                  {fields.map((option, index) => (
                                    <FormField
                                      key={option.id}
                                      name={`Options.${index}.value`}
                                      control={control}
                                      render={({field}) => (
                                        <FormItem>
                                          <FormControl>
                                            <div className="h-10 flex items-center px-5 gap-1 mb-1">
                                              <Input
                                                value={field.value}
                                                {...field}
                                              />
                                              <IoMdRemoveCircle
                                                size={"40"}
                                                color="red"
                                                className="cursor-pointer"
                                                onClick={() => remove(index)}
                                              />
                                              <FormMessage />
                                            </div>
                                          </FormControl>
                                        </FormItem>
                                      )}
                                    />
                                  ))}
                                </ScrollArea>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  );
                case "ForeignKey":
                  return (
                    <FormField
                      key={key}
                      name={key}
                      control={control}
                      render={({field}) => (
                        <FormItem>
                          <div className="h-10 w-full flex items-center text-center gap-2">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel>
                              Display as foreign key element
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  );

                case "Min":
                case "Max":
                  return (
                    <FormField
                      key={key}
                      name={key}
                      control={control}
                      render={({field}) => (
                        <FormItem>
                          <FormLabel>{key}</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              value={field.value}
                              placeholder={value}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  );
                case "ShowInGrid":
                  return (
                    <FormField
                      key={key}
                      name={key}
                      control={control}
                      render={({field}) => (
                        <FormItem>
                          <div className="h-10 w-full flex items-center text-center gap-2">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel>Show in Grid</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  );
                case "SelectType":
                  return (
                    <FormField
                      key={key}
                      name={key}
                      control={control}
                      render={({field}) => {
                        console.log(field?.value);
                        return (
                          <FormItem>
                            <FormLabel>Option type</FormLabel>
                            <FormControl>
                              <RadioGroup
                                defaultValues={field.value}
                                onValueChange={field.onChange}
                                className="flex flex-col items-start"
                              >
                                <FormItem>
                                  <FormControl>
                                    <div className="flex flex-row items-center gap-2">
                                      <RadioGroupItem value="static" />
                                      <FormLabel>Static</FormLabel>
                                    </div>
                                  </FormControl>
                                </FormItem>
                                <FormItem>
                                  <FormControl>
                                    <div className="flex flex-row items-center gap-2">
                                      <RadioGroupItem value="dynamic" />
                                      <FormLabel>Dynamic</FormLabel>
                                    </div>
                                  </FormControl>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                  );
                default:
                  return (
                    <FormField
                      key={key}
                      name={key}
                      control={control}
                      render={({field}) => (
                        <FormItem>
                          <FormLabel>{key}</FormLabel>
                          <FormControl>
                            <Input placeholder={value} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  );
              }
            })}
          </form>
        </Form>
      </main>
    </>
  );
}
