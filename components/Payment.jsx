const Payment = ({ payment }) => {
  return (
    <section 
      className='relative rounded-lg bg-cover bg-center bg-no-repeat h-[25vh] flex justify-center items-center'
      style={{ backgroundImage: `url("https://files.oaiusercontent.com/file-BoxF8xcu3ExYys8ohIsLW7N8?se=2024-10-12T08%3A45%3A52Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3Dbe96e450-730f-4564-9409-f5988a1e553e.webp&sig=gKvDYyl8ec0myTBOsfP56x56S/jcUWKVl/f%2BPqVN%2BQ0%3D")` }}
    >
      <h2 className='absolute top-1 left-1 font-bold px-1 uppercase py-2'>
        {payment?.title}
      </h2>
      <section>
        <div className='flex justify-center items-center h-full'>
          <div className='bg-slate-300 px-12 py-2 rounded-lg'>  
            <p className='font-semibold text-xl'>${payment?.amount}</p>
          </div>
        </div>
      </section>
    </section>
  )
}

export default Payment
