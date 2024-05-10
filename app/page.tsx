import CategoryList from "./_components/category-list";
import Header from "./_components/header";
import Search from "./_components/search";
import ProductList from "./_components/product-list";
import { Button } from "./_components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import { db } from "./_lib/prisma";
import PromoBanner from "./_components/promo-banner";
import RestaurantList from "./_components/restaurante-list";
import Link from "next/link";
import Image from "next/image";

const Home = async () => {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 10, //Pegar apenas 10 produtos
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <>
      <Header />
      <div className="flex-row items-center bg-none px-5 pt-6 md:flex md:h-[350px] md:bg-[#EA1D2C] md:pt-0">
        <div className="mt-5 flex flex-row items-center justify-between md:w-full lg:gap-20 xl:gap-48 ">
          <div className="w-full flex-col justify-center  md:w-2/4">
            <h1 className="text-3xl font-extrabold text-white lg:text-4xl xl:text-5xl">
              Está com fome?
            </h1>
            <p className="mb-2 text-sm text-muted-foreground text-white">
              Com apenas alguns cliques, encontre refeições acessíveis perto de
              você.
            </p>

            <Search />
          </div>

          <div className="hidden pr-28 md:flex">
            <Image
              src="/pngwing.com.png"
              alt="Foods"
              height={300}
              width={300}
              className="object-cover "
            />
          </div>
        </div>
      </div>

      <div className="px-5 pt-6">
        <CategoryList />
      </div>

      <div className="w-full px-5 pt-6 md:hidden">
        <PromoBanner
          src="/promo-banner-01.png"
          alt="Até 30% de desconto em pizzas!"
        />
      </div>

      <div className="space-y-4 pt-6">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-semibold">Pedidos Recomendados</h2>

          <Button
            variant="ghost"
            asChild
            className="h-fit p-0 text-primary hover:bg-transparent"
          >
            <Link href="/products/recommended">
              Ver todos
              <ChevronRightIcon size={16} />
            </Link>
          </Button>
        </div>
        <ProductList products={products} />
      </div>

      <div className="justify-between gap-4 px-6 pt-6 md:flex">
        <PromoBanner
          src="/promo-banner-01.png"
          alt="Até 30% de desconto em pizzas!"
          className="mt-4 hidden  w-full md:mt-0 md:block md:w-1/2"
        />
        <PromoBanner
          src="/promo-banner-02.png"
          alt="A partir de R$17,90 em lanches"
          className="w-full md:w-1/2 "
        />
      </div>

      <div className="space-y-4 py-6">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-semibold">Restaurantes Recomendados</h2>

          <Button
            asChild
            variant="ghost"
            className="h-fit p-0 text-primary hover:bg-transparent"
          >
            <Link href="/restaurants/recommended">
              Ver todos
              <ChevronRightIcon size={16} />
            </Link>
          </Button>
        </div>
        <RestaurantList />
      </div>
    </>
  );
};
export default Home;
