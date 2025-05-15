import React from 'react';
function VenueCards(){
    return (
        <>
      {/* Venue Cards Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Available Venues</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[
            {
              title: 'Hall A-12',
              desc: 'Lecture • 80 seats',
            },
            {
              title: 'Lab B-05',
              desc: 'Computer • 24 seats',
            },
            {
              title: 'Room C-33',
              desc: 'Conference • 12 seats',
            },
            {
              title: 'Auditorium',
              desc: 'Main • 200 seats',
            },
            {
              title: 'Seminar D-8',
              desc: 'Discussion • 30 seats',
            },
            {
              title: 'Studio E-15',
              desc: 'Media • 15 seats',
            },
          ].map((venue, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow text-center"
            >
              <div className="mb-3">
                <h3 className="text-lg font-semibold text-gray-900">{venue.title}</h3>
                <p className="text-sm text-gray-500">{venue.desc}</p>
              </div>
              <div className="flex flex-wrap justify-center gap-2 my-3">
                <span className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
                  Projector
                </span>
                <span className="text-xs bg-green-50 text-green-600 px-3 py-1 rounded-full">
                  SmartBoard
                </span>
                <span className="text-xs bg-purple-50 text-purple-600 px-3 py-1 rounded-full">
                  WiFi
                </span>
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 mt-4 rounded-full transition-colors">
                Quick Book
              </button>
            </div>
          ))}
        </div>
      </div>
      </>
    )
}
export default VenueCards;
    