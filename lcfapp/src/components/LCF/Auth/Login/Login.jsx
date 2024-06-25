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
import {toast} from "@/components/ui/use-toast";
import {HiEye, HiEyeOff} from "react-icons/hi";
import {loginPost} from "@/Redux/Slices/Auth.Slice";
import {useNavigate} from "react-router-dom";

const formSchema = z.object({
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

export default function Login() {
  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {handleSubmit, control, formState, reset} = form;
  const dispatch = useDispatch();
  const {isLogged} = useSelector((state) => state.Auth);
  const [pswToggle, setPswToggle] = React.useState("password");
  const navigate = useNavigate();

  const onSubmit = async (payload) => {
    const res = await dispatch(loginPost(payload));
    if (res.type.includes("Authentication/login/fulfilled")) {
      toast({
        variant: "success",
        title: "Login",
        description: "User logged in successfully",
      });
      reset();
      navigate("/applicationlist");
    }
  };

  return (
    <main className="h-screen w-full flex items-center justify-center">
      <section className="h-fit w-96 flex flex-col items-center justify-center border py-5 rounded-xl shadow-sm shadow-primary">
        <div className="w-full flex flex-col items-center">
          <h1 className="text-2xl font-semibold">Login</h1>
          <Form {...form}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="h-full w-full flex flex-col gap-5 px-5"
            >
              <FormField
                name="email"
                control={control}
                render={({field}) => (
                  <FormItem>
                    <FormLabel>
                      Email <span className="text-destructive ml-1">*</span>
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
                      Password <span className="text-destructive ml-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="flex relative">
                        <Input
                          type={pswToggle}
                          placeholder="Password"
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
              <Button>
                {formState.isSubmitting ? (
                  <ImSpinner6 size={"24"} className="animate-spin" />
                ) : (
                  "Login"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </section>
    </main>
  );
}
