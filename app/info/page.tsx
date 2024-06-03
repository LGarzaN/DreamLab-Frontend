import React from 'react'
import Navbar from '../components/Navbar'

const Page = () => {
  return (
    <div className='max-w-[100vw] bg-gradient-to-r from-[#120b1a] from-20%  to-gray-900 to-45% pb-20'>
        <Navbar />
        <div className='w-full pt-28 px-40'>
            <h1 className='text-white text-4xl font-semibold'>¿Cómo funciona?</h1>
            <p className='mt-5 text-gray-400 text-lg'>
                Nuestro sistema de reservaciones avanzado es muy eficiente y facil de usar, solo debes tomar en cuenta la siguiente información.
            </p>
            <p className='text-xl font-semibold mt-10'>Elige y reserva tu espacio</p>
            <ul className="list-disc text-lg list-inside pl-5 space-y-2 mt-4 text-gray-200">
                <li>Navega a través de nuestra página principal</li>
                <li>Preguntale a nuestro asistente de reservaciones</li>
                <li>Da click en algun espacio para ver mas información</li>
                <li>Reserva en el horario que mejor se te acomode</li>
            </ul>
            
            <p className='text-2xl font-semibold mt-10'>Pero, ¡Espera!</p>
            <p className='mt-5 text-gray-400 text-lg'>
                El que hayas reservado no significa que tu reservación ha sido confirmada, deberás esperar a que el DREAM Lab
                confirme tu reservación. Se te notificará por correo electrónico una vez que tu reservación haya sido confirmada.
            </p>
            <p className='text-2xl font-semibold mt-10'>¿Porqué pasa esto?</p>
            <p className='mt-5 text-gray-400 text-lg'>
                El DREAM Lab es un espacio muy solicitado, por lo que debemos asegurarnos de que todos tengan la oportunidad de
                reservar y usar el espacio. Por esta razón, las reservaciones son asignadas por fecha y por nivel prioridad. De esta
                manera, nos aseguramos que:
            </p>
            <div className='w-full flex flex-row h-20 mt-5 justify-around items-center'>
                <div className='w-1/4 bg-gray-800 flex h-3/4 rounded-lg items-center px-4 flex-row'>
                    <img src='/groups.svg' className='w-7 h-7 mr-3' alt='groups'/>
                    Todos participan
                </div>
                <div className='w-1/4 bg-gray-800 flex h-3/4 rounded-lg items-center px-4 flex-row'>
                    <img src='/justice2.svg' className='w-8 h-8 mr-3' alt='groups'/>
                    Asignación Justa
                </div>
                <div className='w-1/4 bg-gray-800 flex h-3/4 rounded-lg items-center px-4 flex-row'>
                    <img src='/abuse.svg' className='w-7 h-7 mr-3' alt='groups'/>
                    Evitar abusos
                </div>
            </div>
            <p className='text-2xl font-semibold mt-10'>Nivel de Prioridad? Que es eso?</p>
            <p className='mt-5 text-gray-400 text-lg'>
                El nivel de prioridad es un sistema que el DREAM Lab utiliza para asignar reservaciones. Los niveles de prioridad
                son asignados por el DREAM Lab y estan basados en diversos factores, como tu semestre, tu carrera, y tu historial de
                reservaciones.
            </p>
            <p className='text-white text-4xl font-semibold mt-20'>¿No sabes cómo llegar a tu reserva?</p>
            <p className='mt-5 text-gray-400 text-lg'>
                Utiliza nuestro mapa virtual para conocer la ruta hacia tu destino. 
            </p>
            <div className="w-[750px] h-[450px] bg-black bg-opacity-60 rounded-xl flex flex-col ml-40 mt-10">
                        <iframe
                            title="Mappedin Map"
                            src="https://app.mappedin.com/map/6654e029269972f02bf83dd1?embedded=true"
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            style={{ border: 0 }}
                        ></iframe>
                        
            </div>
        </div>
    </div>
  )
}

export default Page