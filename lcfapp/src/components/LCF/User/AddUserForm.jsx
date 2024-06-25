import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/ui/button";
import {ImSpinner6} from "react-icons/im";
import {useDispatch, useSelector} from "react-redux";
import {registerPost} from "@/Redux/Slices/Auth.Slice";
import {toast} from "@/components/ui/use-toast";
import {HiEye, HiEyeOff} from "react-icons/hi";

const formSchema = z.object({
  name: z.string().trim().nonempty(),
  email: z.string().trim().email().nonempty(),
  password: z
    .string()
    .trim()
    .min(8)
    .regex(/[A-Z]/, "Uppercase required")
    .regex(/[a-z]/, "Lowercase required")
    .regex(/[0-9]/, "Number required")
    .regex(/[@$!%*?&#]/, "Special character required"),
});

export default function AddUserForm() {
  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmpassword: "",
    },
  });
  const {handleSubmit, control, formState} = form;
  const dispatch = useDispatch();
  const {status} = useSelector((state) => state.Auth);
  const [pswToggle, setPswToggle] = React.useState("password");
  const [cfPswToggle, setCfPswToggle] = React.useState("password");

  const register = async (payload) => {
    await dispatch(registerPost(payload));
    if (formState.isSubmitSuccessful) {
      if (status === "success") {
        toast({
          variant: "success",
          title: "Registration",
          description: "New user registered successfully",
        });
        form.reset();
      }
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(register)}
        className="h-full w-full flex flex-col gap-5 px-5"
      >
        <FormField
          name="name"
          control={control}
          render={({field}) => (
            <FormItem>
              <FormLabel>
                Name <span className=" text-destructive ml-1">*</span>
              </FormLabel>
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
              <FormLabel>
                Email <span className=" text-destructive ml-1">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="password"
          control={control}
          render={({field}) => (
            <FormItem>
              <FormLabel>
                Password <span className=" text-destructive ml-1">*</span>
              </FormLabel>
              <FormControl>
                <div className="flex relative">
                  <Input
                    type={pswToggle}
                    placeholder="Password"
                    autocomplete="new-password"
                    {...field}
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() =>
                      setPswToggle((pre) =>
                        pre === "password" ? "text" : "password"
                      )
                    }
                    className="rounded-tl-none flex w-fit h-9 absolute right-0 rounded-bl-none"
                  >
                    {pswToggle === "password" ? (
                      <HiEye size={"24"} />
                    ) : (
                      <HiEyeOff size={"24"} />
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          name="confirmpassword"
          control={control}
          render={({field}) => (
            <FormItem>
              <FormLabel>
                Confirm password{" "}
                <span className=" text-destructive ml-1">*</span>
              </FormLabel>
              <FormControl>
                <div className="flex relative">
                  <Input type={cfPswToggle} placeholder="Password" {...field} />
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() =>
                      setCfPswToggle((pre) =>
                        pre === "password" ? "text" : "password"
                      )
                    }
                    className="rounded-tl-none flex w-fit h-9 absolute right-0 rounded-bl-none"
                  >
                    {cfPswToggle === "password" ? (
                      <HiEye size={"24"} />
                    ) : (
                      <HiEyeOff size={"24"} />
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <Button>
          {(formState.isSubmitting && <ImSpinner6 size={"24"} />) || "Register"}
        </Button>
      </form>
    </Form>
  );
}
