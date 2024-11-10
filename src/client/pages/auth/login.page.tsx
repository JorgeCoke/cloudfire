import { Flame, MoveLeft } from "lucide-react";
import { router, ROUTES } from "../../router";
import { $doLogin } from "../../services/auth.service";
import { useStore } from "@nanostores/react";
import { Input } from "../../components/ui/form";
import { AnchorButton, Button } from "../../components/ui/buttons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostLogInDto } from "../../../server/routes/auth/auth.dtos";
import { redirectPage } from "@nanostores/router";
import { http } from "../../lib/http";
import toast from "react-hot-toast";

export const LoginPage = () => {
  const login = useStore($doLogin);
  const { register, handleSubmit, formState } = useForm<PostLogInDto>({
    resolver: zodResolver(PostLogInDto),
  });
  return (
    <section className="w-full h-[100vh] lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="hidden bg-neutral-950 lg:flex justify-center">
        <div className="flex flex-col gap-4 items-center justify-center text-white text-3xl font-bold">
          <Flame className="w-24 h-24 " />
          Cloudfire
        </div>
      </div>
      <div className="flex items-center justify-center py-12">
        <AnchorButton
          variant="ghost"
          href={ROUTES.HOME}
          className="flex gap-2 absolute right-4 top-4 md:right-8 md:top-8"
        >
          <MoveLeft />
          Homepage
        </AnchorButton>
        <div className="mx-auto grid w-[350px] gap-6 p-2">
          <div className="flex flex-col gap-2 text-center">
            <div className="flex lg:hidden justify-center py-6">
              <Flame className="w-12 h-12" />
            </div>
            <h1 className="text-3xl font-bold">Log In</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <form
            className="space-y-4"
            onSubmit={handleSubmit(async (data) => {
              const res = await login.mutate(data);
              if (res.jwt) {
                toast.success("Welcome back!");
                localStorage.setItem("jwt", res.jwt);
                return redirectPage(router, "DASHBOARD");
              }
            })}
          >
            <Input
              type="text"
              label="Email"
              placeholder="example@mail.com"
              required
              error={formState.errors.email?.message}
              {...register("email")}
            />
            <Input
              type="password"
              label="Password"
              placeholder="********"
              required
              error={formState.errors.password?.message}
              {...register("password")}
            />
            <Button type="submit" className="w-full" disabled={login.loading}>
              Login
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <a href={ROUTES.AUTH_SIGNUP} className="underline">
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
