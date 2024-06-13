"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Icons } from "./icons";
import { Input } from "./ui/input";

const UserLoginAuth = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({});
  const { push } = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { email?: string; password?: string; general?: string } =
      {};

    if (!email) newErrors.email = "Email é obrigatório";
    if (!password) newErrors.password = "Senha é obrigatória";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: "/",
    });

    setIsLoading(false);

    if (result?.error) {
      setErrors({ ...errors, general: "Dados inválidos" });
    } else {
      push("/");
    }
  };

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <div>
      {errors.general && (
        <div className="my-2 text-center text-sm text-red-500">
          {errors.general}
        </div>
      )}
      <form className="px-5 lg:px-10" onSubmit={handleSubmit}>
        <div className="-space-y-px rounded-md shadow-sm">
          <div>
            <label htmlFor="email" className="sr-only">
              Endereço de email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Email"
              className="my-5"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <span className="text-xs text-red-500">{errors.email}</span>
            )}
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Senha
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <span className="text-xs text-red-500">{errors.password}</span>
            )}
          </div>
        </div>

        <Link href="/Register">
          <p className="py-2 text-xs text-muted-foreground hover:text-primary">
            Criar cadastro
          </p>
        </Link>

        <div className="flex space-x-4">
          <Button
            type="submit"
            className="group relative flex w-1/2 justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-red-400"
          >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Entrar
          </Button>

          <Button
            type="button"
            className="group relative flex w-1/2 justify-center rounded-md border 
            border-[#7e8390] bg-white  px-4  py-2 text-[10px] font-medium text-[#7e8390] hover:border-red-600 hover:bg-accent hover:text-red-600  lg:text-sm"
            onClick={handleGoogleSignIn}
          >
            <Icons.google className="mr-2 h-4 w-4" />
            Entrar com Google
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UserLoginAuth;
