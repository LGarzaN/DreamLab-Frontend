import React from 'react'
import { data } from "@/data/areas_data";

interface Reservation {
    Username: string;
    Day: string;
    StartHour: string;
    EndHour: string;
    SpaceName: string;
    SpaceId: number;
    RequirementsId: string;
    RequirementsQuantity: string;
    GroupCode: string;
}

interface props {
    reservation: Reservation
}

export default function ReservationCard({ reservation }: props) {
    const image = getImage(reservation.SpaceId)!;
  return (
    <div 
    className='flex flex-row gap-10 h-[240px] bg-[#09091e] rounded-xl bg-opacity-0'
    >
        <div className='w-[50%]'>
            <img 
            src={image} 
            alt="" 
            className='h-full w-auto opacity-85 object-cover rounded-xl'/>
        </div>
        <div className='w-[50%] py-5'>
            <div>
                <p className='text-white text-3xl font-semibold'>{reservation.SpaceName}</p>
            </div>
            <div className='mt-10'>
                <p className='text-white text-3xl font-semibold mb-2'>{reservation.Username}</p>
                <p className='text-white text-3xl'>{reservation.StartHour} - {reservation.EndHour}</p>
            </div>
            
        </div>
    </div>
  )
}


function getImage(id: number) {
    const area = data.find((area) => area.id === id);
    return area ? area.image : null;
  }