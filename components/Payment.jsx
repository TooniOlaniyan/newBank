const Payment = ({ payment }) => {
  return (
    <section 
      className='relative rounded-lg bg-cover bg-center bg-no-repeat h-[25vh] flex justify-center items-center'
      style={{ backgroundImage: `url("https://png.pngtree.com/thumb_back/fh260/background/20230705/pngtree-digitized-payment-3d-render-of-credit-card-and-contactless-nfc-transaction-image_3742456.jpg")` }}
    >
      <h2 className='absolute top-1 left-1 font-bold px-1 uppercase py-2 text-white'>
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
