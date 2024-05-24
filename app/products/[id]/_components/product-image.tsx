"use client";

import { Button } from "@/app/_components/ui/button";
import { Product } from "@prisma/client";
import { ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductImageProps {
  product: Pick<Product, "name" | "imageUrl">;
}

const ProductImagem = ({ product }: ProductImageProps) => {
  const router = useRouter();

  const hendleBackClick = () => router.back();

  return (
    <div className="relative h-[360px] w-full rounded-lg border border-solid shadow-sm md:h-full">
      <Image
        src={product.imageUrl}
        alt={product.name}
        object-fit="contain"
        fill
        className="object-cover md:rounded-lg"
      />

      <Button
        className="absolute left-2 top-2 rounded-full bg-white text-foreground hover:text-white"
        size="icon"
        onClick={hendleBackClick}
      >
        <ChevronLeftIcon />
      </Button>
    </div>
  );
};

export default ProductImagem;
