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
  const { push } = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: "/",
    });

    if (result?.error) {
    } else {
      push("/");
    }
  };

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <div>
      <form className="px-5 lg:px-10 " onSubmit={handleSubmit}>
        <div className="-space-y-px   rounded-md shadow-sm">
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
            className="group relative flex w-1/2 justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-red-400 "
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
