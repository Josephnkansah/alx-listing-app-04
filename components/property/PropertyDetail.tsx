interface Property {
    id: number;
    name: string;
    location: string;
    price: string;
    image: string;
    description?: string;
    amenities?: string[];
  }
  
  interface PropertyDetailProps {
    property: Property;
  }
  
  export default function PropertyDetail({ property }: PropertyDetailProps) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <img src={property.image} alt={property.name} className="w-full h-96 object-cover rounded" />
        <h1 className="text-3xl font-bold mt-4">{property.name}</h1>
        <p className="text-gray-600">{property.location}</p>
        <p className="text-blue-500 font-semibold">{property.price}</p>
        <p className="mt-4 text-gray-700">{property.description}</p>
  
        {property.amenities && (
          <ul className="mt-4 list-disc list-inside text-sm">
            {property.amenities.map((amenity, index) => (
              <li key={index}>{amenity}</li>
            ))}
          </ul>
        )}
      </div>
    );
  }
  