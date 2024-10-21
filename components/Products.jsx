import { useRouter } from "next/navigation";

const Products = ({ products }) => {
  const router = useRouter();
  return (
    <section className="flex justify-between bg-gray-900 text-white drop-shadow-lg rounded-lg md:h-[30vh] p-4">
      {/* Product List */}
      <div className="w-full md:w-2/3">
        <div>
          <h1 className="uppercase font-bold">{products?.title}</h1>
        </div>
        <div>
          <ul className="mt-6 flex flex-col md:flex-row md:gap-x-4">
            {products?.product.map((item, index) => {
              if (index === 0) {
                return (
                  <button
                    key={index}
                    className="p-2 my-2 bg-gray-800 text-white border border-gray-700 rounded-md text-center hover:bg-gray-700 transition duration-300"
                  >
                    <p>{item}</p>
                  </button>
                );
              } else {
                return (
                  <button
                    onClick={() => router.push("/balance")}
                    key={index}
                    className="p-2 my-2 bg-gray-800 text-white border border-gray-700 rounded-md text-center hover:bg-gray-700 transition duration-300"
                  >
                    <p>{item}</p>
                  </button>
                );
              }
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Products;
