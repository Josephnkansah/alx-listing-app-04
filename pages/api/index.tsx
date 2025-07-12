// pages/index.tsx

import React from 'react';

interface Property {
  id: number;
  name: string;
  location: string;
  price: string;
  image: string;
}

interface Props {
  properties: Property[];
}

const Home = ({ properties }: Props) => {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Available Properties</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div key={property.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src={property.image} alt={property.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{property.name}</h2>
              <p className="text-gray-600">{property.location}</p>
              <p className="text-blue-500 font-bold">{property.price}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

// Fetch data from the API
export async function getServerSideProps() {
  try {
    const res = await fetch('http://localhost:3001/properties'); // Update with your actual API URL
    const properties = await res.json();

    return {
      props: { properties },
    };
  } catch (error) {
    console.error('Error fetching properties:', error);
    return {
      props: { properties: [] },
    };
  }
}

export default Home;
