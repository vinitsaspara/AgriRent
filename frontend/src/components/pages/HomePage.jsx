import React from 'react'
import { Navbar } from './Navbar'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <Navbar/>
      
      {/* Clean Hero Section */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 py-20 px-4">
        <div className="container mx-auto max-w-5xl flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
              Modern <span className="text-emerald-600">Agricultural</span> Equipment Rental
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Access premium farming equipment without the premium price tag
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-6 rounded-md cursor-pointer transition-colors"
              onClick={()=>navigate("/admin/all-equipment")}>
                Browse Equipment
              </button>
              <button className="border border-emerald-600 text-emerald-600 hover:bg-emerald-50 font-medium py-3 px-6 rounded-md transition-colors cursor-pointer">
                How It Works
              </button>
            </div>
          </div>
          <div className="md:w-1/2">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/0/08/Agricultural_machinery.jpg" 
              alt="Modern tractor in field" 
              className="rounded-lg shadow-xl w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
      
      {/* Featured Categories */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Premium Equipment Categories</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Category 1 */}
            <div
            onClick={()=>navigate("/admin/all-equipment")}
            className="group relative overflow-hidden rounded-lg bg-gray-100 cursor-pointer">
              <img 
                src="https://images.unsplash.com/photo-1589923188651-268a9765e432?ixlib=rb-4.0.3&auto=format&fit=crop&w=987&q=80" 
                alt="Tractor" 
                
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-xl font-bold text-white mb-2">Tractors</h3>
                <p className="text-white/80 text-sm mb-3">15+ models available</p>
                <span className="inline-block text-sm text-white font-medium bg-emerald-600 py-1 px-3 rounded-full">
                  View Selection
                </span>
              </div>
            </div>
            
            {/* Category 2 */}
            <div 
            onClick={()=>navigate("/admin/all-equipment")}
            className="group relative overflow-hidden rounded-lg bg-gray-100 cursor-pointer">
              <img 
                src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80" 
                alt="Harvester" 
               
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-xl font-bold text-white mb-2">Harvesters</h3>
                <p className="text-white/80 text-sm mb-3">8+ models available</p>
                <span className="inline-block text-sm text-white font-medium bg-emerald-600 py-1 px-3 rounded-full">
                  View Selection
                </span>
              </div>
            </div>
            
            {/* Category 3 */}
            <div 
            onClick={()=>navigate("/admin/all-equipment")}
            className="group relative overflow-hidden rounded-lg bg-gray-100 cursor-pointer">
              <img 
                src="https://images.unsplash.com/photo-1621628898826-8956e10449eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80" 
                alt="Irrigation" 
                
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-xl font-bold text-white mb-2">Irrigation</h3>
                <p className="text-white/80 text-sm mb-3">12+ systems available</p>
                <span className="inline-block text-sm text-white font-medium bg-emerald-600 py-1 px-3 rounded-full">
                  View Selection
                </span>
              </div>
            </div>
            
            {/* Category 4 */}
            <div 
            onClick={()=>navigate("/admin/all-equipment")}
            
            className="group relative overflow-hidden rounded-lg bg-gray-100 cursor-pointer">
              <img 
                src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80" 
                alt="Seeders" 
                
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-xl font-bold text-white mb-2">Seeders</h3>
                <p className="text-white/80 text-sm mb-3">10+ models available</p>
                <span className="inline-block text-sm text-white font-medium bg-emerald-600 py-1 px-3 rounded-full">
                  View Selection
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">How AgriRent Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-emerald-600 text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Browse & Select</h3>
              <p className="text-gray-600">Choose from our wide range of well-maintained agricultural equipment</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-emerald-600 text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Book & Pay</h3>
              <p className="text-gray-600">Select your rental dates and complete payment securely online</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-emerald-600 text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Pickup & Use</h3>
              <p className="text-gray-600">Collect your equipment and get farming with our support team on standby</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonial */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl bg-emerald-50 rounded-2xl p-8 md:p-12">
          <div className="flex flex-col items-center text-center">
            <svg className="w-12 h-12 text-emerald-300 mb-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 italic">
              "AgriRent has transformed how we manage our seasonal equipment needs. The quality of machinery and the ease of rental process have saved us both time and money."
            </p>
            <div>
              <h4 className="text-lg font-bold text-gray-900">Michael Thompson</h4>
              <p className="text-gray-600">Owner, Thompson Family Farms</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 px-4 bg-emerald-600">
        <div className="container mx-auto max-w-5xl text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to optimize your farming operations?</h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-3xl mx-auto">Join thousands of farmers who trust AgriRent for their equipment needs</p>
          <button className="bg-white text-emerald-600 hover:bg-emerald-50 font-bold py-3 px-8 rounded-md text-lg transition-colors">
            Get Started Today
          </button>
        </div>
      </section>
    </div>
  )
}

export default HomePage