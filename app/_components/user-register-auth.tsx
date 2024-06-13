"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Icons } from "./icons";
import { Input } from "./ui/input";

interface IUser {
  name: string;
  email: string;
  password: string;
}

const UserRegisterAuth = () => {
  const router = useRouter();

  const [data, setData] = useState<IUser>({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<IUser> & { server?: string }>(
    {},
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();

    // Validação simples para verificar se os campos estão preenchidos
    const newErrors: Partial<IUser> = {};
    if (!data.name) newErrors.name = "Nome é obrigatório";
    if (!data.email) newErrors.email = "Email é obrigatório";
    if (!data.password) newErrors.password = "Senha é obrigatória";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    const request = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const response = await request.json();

    if (!request.ok) {
      if (response.error === "Existing email.") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "Este email já está registrado",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          server: response.error,
        }));
      }
    } else {
      router.push("/login");
    }

    setData({
      name: "",
      email: "",
      password: "",
    });
    setIsLoading(false);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
    setErrors((prev) => {
      return { ...prev, [e.target.name]: "" };
    });
  };

  return (
    <div className="flex flex-col justify-center">
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <label className="sr-only" htmlFor="name">
              Name
            </label>
            <Input
              id="name"
              placeholder="Nome"
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              name="name"
              value={data.name}
              onChange={handleChange}
            />
            {errors.name && (
              <span className="text-xs text-red-500">{errors.name}</span>
            )}
          </div>
          <div className="grid gap-1">
            <label className="sr-only" htmlFor="email">
              Email
            </label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              name="email"
              value={data.email}
              onChange={handleChange}
            />
            {errors.email && (
              <span className="text-xs text-red-500">{errors.email}</span>
            )}
          </div>
          <div className="grid gap-1">
            <label className="sr-only" htmlFor="password">
              Password
            </label>
            <Input
              id="password"
              placeholder="Senha"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              name="password"
              value={data.password}
              onChange={handleChange}
            />
            {errors.password && (
              <span className="text-xs text-red-500">{errors.password}</span>
            )}
          </div>
          <button
            className="group relative mt-5 flex w-full justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-red-400"
            disabled={isLoading}
          >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Registrar
          </button>
          {errors.server && (
            <span className="mt-2 text-xs text-red-500">{errors.server}</span>
          )}
        </div>
      </form>
    </div>
  );
};

export default UserRegisterAuth;
