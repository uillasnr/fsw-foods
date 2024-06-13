"use client";

import Image from "next/image";
import Link from "next/link";
import UserRegisterAuth from "../_components/user-register-auth";

const Register = () => {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <div className="hidden w-full items-center justify-center bg-[#e6232d] p-6 md:flex md:w-1/2">
        <div className="flex w-full max-w-md items-center justify-center space-y-8">
          <div>
            <Image
              width={300}
              height={300}
              src="/logo1.png"
              alt="FSW food"
              layout="fixed"
              objectFit="cover"
              quality={100}
            />
          </div>
        </div>
      </div>

      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-white md:w-1/2">
        <Image src="/logo.png" alt="Side Image" width={150} height={150} />
        <h2 className="pt-1 text-center text-base font-extrabold text-muted-foreground lg:text-lg">
          Criar Conta
        </h2>

        <div className="w-full p-6">
          <UserRegisterAuth />
        </div>

        <div className="flex w-2/4 min-w-72 justify-center text-center">
          <p className="px-8 text-center text-sm text-muted-foreground">
            Ao clicar em continuar, você concorda com nossos{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Termos de Serviço
            </Link>{" "}
            e{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Política de Privacidade
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
