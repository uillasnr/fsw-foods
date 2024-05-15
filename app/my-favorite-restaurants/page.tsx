import { getServerSession } from "next-auth";
import { db } from "../_lib/prisma";
import { authOptions } from "../_lib/auth";
import { notFound } from "next/navigation";
import Header from "../_components/header";
import RestaurantItem from "../_components/restaurant-item";
import { Button } from "../_components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";

const MyFavoriteRestaurants = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return notFound();
  }

  const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      restaurant: true,
    },
  });

  return (
    <>
      <Header />

      <div className="px-5 py-6">
        <div className="mb-6 inline-flex items-center justify-center">
          <Button
            className=" rounded-full
            border border-solid border-muted-foreground  bg-[#F4F4F4] text-foreground"
            size="icon"
            asChild
          >
            <Link href="/">
              <ChevronLeftIcon />
            </Link>
          </Button>

          <h2 className=" pl-4 text-lg font-semibold ">
            Restaurantes Favoritos
          </h2>
        </div>

        {userFavoriteRestaurants.length === 0 ? (
          <div className="flex flex-col  items-center justify-center ">
            <h3 className="mt-64 text-center font-medium">
              Você ainda não marcou nenhum restaurante como favorito.
            </h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {userFavoriteRestaurants.map(({ restaurant }) => (
              <RestaurantItem
                key={restaurant.id}
                restaurant={restaurant}
                className="min-w-full max-w-full"
                userFavoriteRestaurants={userFavoriteRestaurants}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MyFavoriteRestaurants;
