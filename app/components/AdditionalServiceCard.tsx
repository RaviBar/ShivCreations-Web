'use client';
import React from 'react';
import Image from 'next/image';

interface AdditionalServiceCardProps {
  title: string;
  imageUrl: string;
}

const AdditionalServiceCard: React.FC<AdditionalServiceCardProps> = ({ title, imageUrl }) => {
  return (
    <div className="bg-white rounded-t-full text-center hover:shadow-lg transition-shadow duration-300 cursor-pointer overflow-hidden h-[30rem]">  
      <div className="relative w-full h-[85%] overflow-hidden rounded-t-full">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-4 h-[15%] flex items-center justify-center">
        <h3 className="text-xl font-semibold text-black mb-2">{title}</h3>
      </div>
    </div>
  );
};

export default AdditionalServiceCard;