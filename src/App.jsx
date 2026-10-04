import { useEffect, useState } from 'react';
import './App.css';

function App() {
  



  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function viewData() {
      try {
        const productData = await fetch(
          'https://dragonball-api.com/api/characters?limit=100'
        );
        const dataAll = await productData.json();
        setData(dataAll.items || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    viewData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 md:p-12">
    
    


      <h2 className="text-3xl font-extrabold text-center mb-8 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
        Dragon Ball Characters
      </h2>


      {loading ? (
        <div className="text-center text-xl text-slate-400 py-12">
          Loading characters...
        </div>
      ) : (

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {data.map((item) => (
            <div
              key={item.id}
              className="group relative bg-slate-800/60 hover:bg-slate-800 rounded-2xl p-5 border border-slate-700/60 hover:border-amber-500/50 shadow-lg hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
         
              {item.race && (
                <span className="absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-full">
                  {item.race}
                </span>
              )}

              
              <div className="relative w-full h-52 my-3 flex items-center justify-center overflow-hidden rounded-xl bg-slate-900/50 p-2">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full object-contain filter drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform duration-300 ease-out"
                />
              </div>

            
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors duration-200">
                    {item.name}
                  </h3>
                  <p className="text-slate-400 text-sm mt-2 line-clamp-3 leading-relaxed">
                    {item.description || 'No description available.'}
                  </p>
                </div>

          
                <div className="mt-4 pt-3 border-t border-slate-700/50 flex justify-between items-center text-xs text-slate-400">
                  <span>
                    Ki: <strong className="text-amber-400">{item.ki}</strong>
                  </span>
                  <span>
                    Max Ki:{' '}
                    <strong className="text-orange-400">{item.maxKi}</strong>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;