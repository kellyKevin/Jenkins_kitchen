"use client";

import { MapPin, Phone, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LocationPage() {
  const locations = [
    {
      name: "Downtown Flagship",
      address: "123 Kitchen Lane, Food City",
      phone: "+1 (555) 123-4567",
      hours: "Mon-Sun: 10am - 11pm"
    },
    {
      name: "Flavor Town Branch",
      address: "456 Meal Avenue, Flavor Town",
      phone: "+1 (555) 987-6543",
      hours: "Mon-Sat: 11am - 10pm"
    },
    {
      name: "Tasteville Express",
      address: "789 Dish Road, Tasteville",
      phone: "+1 (555) 456-7890",
      hours: "Mon-Fri: 9am - 9pm"
    }
  ];

  return (
    <div className="bg-gray-50 py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="font-playfair text-5xl font-bold mb-4">Our Locations</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find the nearest JENIKS KITCHEN and come experience our hospitality in person.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white p-4 rounded-[2.5rem] border border-gray-100 shadow-sm h-[500px] overflow-hidden"
          >
             <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345098437!2d144.9556513156821!3d-37.81720997975161!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f5f709d%3A0xa2c8d2a8e4f7cf5b!2sJENIKS%20KITCHEN!5e0!3m2!1sen!2sus!4v1605113605185!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                className="rounded-[2rem]"
            ></iframe>
          </motion.div>

          <div className="space-y-6">
            {locations.map((loc, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-3xl border border-gray-100 hover:shadow-md transition-shadow group"
              >
                <h3 className="text-2xl font-bold font-playfair mb-4 group-hover:text-orange-600 transition-colors">{loc.name}</h3>
                <div className="space-y-3 text-gray-600">
                  <div className="flex items-center gap-3">
                    <MapPin size={18} className="text-orange-600" />
                    <span>{loc.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={18} className="text-orange-600" />
                    <span>{loc.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock size={18} className="text-orange-600" />
                    <span>{loc.hours}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
