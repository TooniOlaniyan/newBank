import Image from 'next/image'

const Products = ({ products }) => {
  return (
    <section className='flex justify-between drop-shadow bg-slate-100 rounded-lg h-[23vh] md:h-[30vh]'>
      <div className='py-1 px-2'>
        <div>
          <h1 className='uppercase font-bold'>{products?.title}</h1>
        </div>
        <div>
          <ul className='mt-8'>
            {products?.product.map((item, index) => {
              return (
                <li
                  key={index}
                  className='p-2 bg-pink-200 text-gray-800 border border-pink-300 rounded-none text-center hover:bg-pink-400 hover:text-white transition duration-300'
                >
                  <p>{item}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className='rounded-lg'>
        <Image
          src="/images/lip.jpg"
          alt='product'
          width={100}
          height={100}
        />
      </div>
    </section>
  )
}

export default Products;
