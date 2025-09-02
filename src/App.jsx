
function App() {

  return (
    <>
      <title>Jully Fest 2025</title>
      <div className="flex justify-between">



        <div className="flex flex-col justify-around  w-[6%] bg-black">
          <div className="bg-[#3d0707] lg:w-[85%] w-[75%] h-[80px]"></div>
          <div className="bg-[#3d0707] lg:w-[85%] w-[75%] h-[80px]"></div>
          <div className="bg-[#3d0707] lg:w-[85%] w-[75%] h-[80px]"></div>
          <div className="bg-[#3d0707] lg:w-[85%] w-[75%] h-[80px]"></div>
          <div className="bg-[#3d0707] lg:w-[85%] w-[75%] h-[80px]"></div>
        </div>
        <div className=" w-[1%] bg-[#3d0707]"></div>

        {/* Hero */}
        <div className="flex flex-col flex-1 bg-white border-20 border-[#3d0707] ">
          <div className="p-[2%]">
            <div className="gap-2">
              <p className="text-7xl leading-[90px] sm:text-8xl text-[#6d0605] font-bold font-anton sm:leading-[115px]">
                <span>Jully Fest</span>
                <span className=""> 2025</span>
                <p className="inline  ml-[15px] -mt-[1px] lg:m-0 lg:block text-4xl text-[#6d0605] font-poppins font-light">15 ANOS</p>
              </p>
         
            </div>
          </div>


          <div className="flex flex-col lg:flex-row -mt-[4%] p-[5%] lg:p-[4%] h-auto ">

            <div className='bg-[url(./assets/bg.jpeg)] bg-center h-[500px] w-[100%] lg:h-auto bg-cover lg:w-[55%] '></div>

            <div className='flex flex-col mt-[8%] lg:w-[45%] lg:mt-0 ml-[2%] gap-[30px]'>
              <p className='leading-[55px] text-5xl font-bebas text-[#3d0707]'>Separe seu melhor papel cinematográfico e venha participar da maior premiação da América:</p>
              <p className='text-4xl font-alice  text-[#3d0707]'>A edição 2025 da festa mais aguardada do ano traz em seu menu a presença das maiores figuras do cinema!
                VAI ENCARAR? Nesta página, os ilustres convidados deverão inserir os registros digitais da festa para melhor funcionamento da divulgação. </p>
              <p className='font-bebas text-[#3d0707] font-light text-4xl'>fonte: oliveira, c.b.</p>
            </div>
          </div>

          <div class="flex items-center pb-[4%] -mt-[1%]">
            <div class="flex-1 h-px bg-black"></div>
            <div class="mx-4 w-4 h-4 bg-black rotate-45"></div>
            <div class="flex-1 h-px bg-black"></div>
          </div>
          <div className='grid grid-cols-2  lg:grid-cols-4 gap-4 bg-[#3d0707] p-[2%]'>
            <div className='text-white'>
              <p className='font-alice text-3xl'>Local:</p>
              <a href="https://maps.app.goo.gl/qZjZrz9zsiVT7ugo6?g_st=aw" target='_blank' className='underline font-bebas text-4xl sm:text-5xl'>
                ESPAÇO FLOR <br /> NUNES
              </a>
            </div>

            <div className='text-white'>
              <p className='font-alice text-3xl'>Data:</p>
              <p className='font-bebas text-4xl sm:text-5xl'>01.11.2025</p>
            </div>

            <div className='text-white'>
              <p className='font-alice text-3xl'>Hora:</p>
              <p className='font-bebas text-4xl sm:text-5xl'>19:00 - <br />CREPÚSCULO</p>
            </div>

            <div className='text-white'>
              <a href='https://forms.gle/B6jAaGv1zE1iYAuY6' target='_blank' className='font-alice text-3xl'>
                Clique para realizar a<br />
              </a>
              <a href='https://forms.gle/B6jAaGv1zE1iYAuY6' target='_blank' className='font-bebas text-4xl sm:text-5xl'>
                CONFIRMAÇÃO
              </a>
            </div>
          </div>

          <hr className='mt-[4%]' />

        </div>

        {/* fim do hero*/}


        <div className="w-[1%] bg-[#3d0707]"></div>
        <div className="flex flex-col items-end justify-around w-[6%] bg-black">
          <div className="bg-[#3d0707] lg:w-[85%] w-[75%] h-[80px]"></div>
          <div className="bg-[#3d0707] lg:w-[85%] w-[75%] h-[80px]"></div>
          <div className="bg-[#3d0707] lg:w-[85%] w-[75%] h-[80px]"></div>
          <div className="bg-[#3d0707] lg:w-[85%] w-[75%] h-[80px]"></div>
          <div className="bg-[#3d0707] lg:w-[85%] w-[75%] h-[80px]"></div>
        </div>


      </div>
    </>
  )
}

export default App
