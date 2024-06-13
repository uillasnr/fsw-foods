import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import ProductImagem from "./_components/product-image";
import ProductDetails from "./_components/product-details";
import ProductList from "@/app/_components/product-list";
import Header from "@/app/_components/header";

interface ProductPageProps {
  params: {
    id: string;
  };
}

const ProductPage = async ({ params: { id } }: ProductPageProps) => {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      restaurant: true,
    },
  });

  if (!product) {
    return notFound();
  }

  const juices = await db.product.findMany({
    where: {
      OR: [
        { category: { name: "Sucos" } },
        { category: { name: "Sobremesas" } },
      ],
      restaurant: {
        id: product?.restaurant.id,
      },
    },
    include: {
      restaurant: true,
    },
  });
  // Embaralhe o array de sucos em ordem aleatória
  juices.sort(() => Math.random() - 0.74);

  return (
    <>
      <div className="hidden md:block ">
        <Header />
      </div>

      <div>
        <div className="flex flex-col gap-4 p-0 md:flex-row md:gap-10 md:p-5 md:px-10 ">
          <div className="w-full rounded-lg md:w-3/6 ">
            <ProductImagem product={product} />
          </div>

          {/* TITULO e PREÇO */}
          <div className="flex w-full flex-col rounded-lg border border-solid shadow-sm md:w-3/6 md:p-6">
            <div className="flex-grow">
              <ProductDetails
                product={product}
                complementaryProducts={juices}
              />
            </div>
          </div>
        </div>

        <div className="hidden md:block md:px-5">
          <h3 className="px-5 font-semibold">Recomendados</h3>
          <ProductList products={juices} />
        </div>
      </div>
    </>
  );
};

export default ProductPage;
