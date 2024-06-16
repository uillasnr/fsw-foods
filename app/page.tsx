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
    take: 15,
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
      <div className="flex-row items-center px-6 py-2 pt-5 md:flex md:h-[350px] md:bg-[#EA1D2C] md:py-2">
        <div className=" flex flex-row items-center justify-between md:mt-5 md:w-full lg:gap-20 xl:gap-48 ">
          <div className="w-full flex-col justify-center md:w-2/4">
            <h1 className="hidden text-3xl font-extrabold text-white md:block lg:text-4xl xl:text-5xl">
              Está com fome?
            </h1>
            <p className="mb-2 hidden text-sm text-muted-foreground text-white md:block">
              Com apenas alguns cliques, encontre refeições acessíveis perto de
              você.
            </p>

            <div className="flex h-0 w-full items-center justify-center rounded-md bg-white p-0 md:h-24 md:w-full md:p-6">
              <Search isHomePage={true} />
            </div>
          </div>

          <div className="hidden pr-0 md:flex lg:pr-28">
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

      <div className="px-5 pt-5">
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
