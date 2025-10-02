import React, { useState } from 'react';

// Tipos
type ItineraryPeriod = {
  period: string;
  activity: string;
  details: string;
};

type Itinerary = {
  title: string;
  description: string;
  itinerary: ItineraryPeriod[];
};

type Preferences = {
  company: string;
  interests: string[];
  duration: string;
};

// Dados para as etapas do assistente
const STEPS = [
  {
    step: 1,
    title: "Com quem você vai viajar?",
    key: "company",
    options: ["Sozinho(a)", "Casal", "Família", "Amigos"],
    multiple: false,
  },
  {
    step: 2,
    title: "Quais são seus interesses?",
    key: "interests",
    options: ["Natureza", "Aventura", "Gastronomia", "Cultura", "Relaxar"],
    multiple: true,
  },
  {
    step: 3,
    title: "Quanto tempo você tem?",
    key: "duration",
    options: ["Meio Período", "Dia Inteiro", "Mais de um dia"],
    multiple: false,
  },
];

const App: React.FC = () => {
  const [step, setStep] = useState(0); // 0 = tela inicial
  const [preferences, setPreferences] = useState<Preferences>({
    company: '',
    interests: [],
    duration: ''
  });
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [error, setError] = useState('');

  const handleSelection = (key: keyof Preferences, value: string, multiple: boolean) => {
    const isLastStep = step === STEPS.length;
    if (multiple) {
      setPreferences(prev => ({
        ...prev,
        [key]: prev[key].includes(value)
          ? (prev[key] as string[]).filter(item => item !== value)
          : [...prev[key], value]
      }));
    } else {
      setPreferences(prev => ({ ...prev, [key]: value }));
      if (!isLastStep) {
        setTimeout(() => setStep(s => s + 1), 300); // Avança automaticamente, exceto na última etapa
      }
    }
  };

  const generateItinerary = async () => {
    setLoading(true);
    setError('');
    setItinerary(null);
    setStep(STEPS.length + 1); // Move para a tela de carregamento/resultado

    try {
      const response = await fetch('/api/generate-itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(preferences),
      });

      if (!response.ok) {
        throw new Error('Falha ao gerar o roteiro. Tente novamente.');
      }

      const data: Itinerary = await response.json();
      setItinerary(data);
    } catch (e: any) {
      setError(e.message || 'Ocorreu um erro desconhecido.');
    } finally {
      setLoading(false);
    }
  };
  
  const reset = () => {
    setStep(0);
    setPreferences({ company: '', interests: [], duration: '' });
    setItinerary(null);
    setError('');
  };

  const renderContent = () => {
    if (step === 0) {
      return (
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-500">
            Viva Guaramiranga
          </h1>
          <p className="text-lg text-gray-300 mb-8">
            Seu guia de turismo inteligente. Vamos criar um passeio inesquecível para você!
          </p>
          <button
            onClick={() => setStep(1)}
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-8 rounded-full transition-transform transform hover:scale-105"
          >
            Criar Meu Passeio
          </button>
        </div>
      );
    }

    if (step > 0 && step <= STEPS.length) {
      const currentStep = STEPS[step - 1];
      const isLastStep = step === STEPS.length;
      return (
        <div className="w-full">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-200">{currentStep.title}</h2>
          <div className={`grid ${currentStep.multiple ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-2 md:grid-cols-4'} gap-4`}>
            {currentStep.options.map(option => {
              const isSelected = Array.isArray(preferences[currentStep.key as keyof Preferences])
                ? (preferences[currentStep.key as keyof Preferences] as string[]).includes(option)
                : preferences[currentStep.key as keyof Preferences] === option;

              return (
                <button
                  key={option}
                  onClick={() => handleSelection(currentStep.key as keyof Preferences, option, currentStep.multiple)}
                  className={`p-6 rounded-lg text-center font-semibold border-2 transition-all duration-200 ${
                    isSelected
                      ? 'bg-cyan-500 border-cyan-400 text-white scale-105 shadow-lg shadow-cyan-500/20'
                      : 'bg-gray-700 border-gray-600 hover:bg-gray-600 hover:border-cyan-500'
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
          {currentStep.multiple && (
            <div className="text-center mt-8">
              <button
                onClick={() => setStep(s => s + 1)}
                disabled={preferences.interests.length === 0}
                className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-6 rounded-full disabled:bg-gray-500 disabled:cursor-not-allowed"
              >
                Próximo
              </button>
            </div>
          )}
          {isLastStep && (
             <div className="text-center mt-8">
                <button
                  onClick={generateItinerary}
                  disabled={!preferences.duration}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-8 rounded-full transition-transform transform hover:scale-105 disabled:bg-gray-600 disabled:cursor-not-allowed"
                >
                  Gerar Meu Roteiro!
                </button>
            </div>
          )}
        </div>
      );
    }

    if (loading) {
      return (
        <div className="text-center">
            <svg className="animate-spin h-12 w-12 text-emerald-400 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          <h2 className="text-3xl font-bold text-gray-200">Criando sua aventura...</h2>
          <p className="text-gray-400 mt-2">Nossa IA está montando o roteiro perfeito para você!</p>
        </div>
      );
    }

    if (error) {
       return (
        <div className="text-center">
          <h2 className="text-3xl font-bold text-red-500">Oops! Algo deu errado.</h2>
          <p className="text-gray-400 mt-2">{error}</p>
          <button onClick={reset} className="mt-6 bg-emerald-500 text-white font-bold py-2 px-6 rounded-full">
            Tentar Novamente
          </button>
        </div>
      );
    }
    
    if(itinerary) {
        return (
            <div className="w-full text-left animate-fade-in">
                <h2 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-500 text-center">{itinerary.title}</h2>
                <p className="text-gray-300 mb-8 text-center">{itinerary.description}</p>
                <div className="space-y-6">
                    {itinerary.itinerary.map((item, index) => (
                        <div key={index} className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                            <h3 className="text-2xl font-bold text-cyan-400 mb-2">{item.period}</h3>
                            <h4 className="text-xl font-semibold text-gray-100">{item.activity}</h4>
                            <p className="text-gray-400 mt-1">{item.details}</p>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-10">
                    <button onClick={reset} className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-8 rounded-full">
                        Criar Novo Roteiro
                    </button>
                </div>
            </div>
        )
    }

    return null;
  };
  
  const isFinalStep = step > STEPS.length;
  const showBackButton = step > 1 && step <= STEPS.length;

  return (
    <main className="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-white p-4 font-sans">
      <div className={`relative transition-all duration-500 ease-in-out w-full max-w-4xl p-8 border border-gray-700 bg-gray-800/50 rounded-xl shadow-2xl shadow-cyan-500/10 ${isFinalStep ? 'max-w-4xl' : 'max-w-2xl'}`}>
         {showBackButton && (
             <button onClick={() => setStep(s => s - 1)} className="absolute top-4 left-4 text-gray-400 hover:text-white">
                &larr; Voltar
             </button>
         )}
        {renderContent()}
      </div>
       {step > 0 && step <= STEPS.length && (
           <div className="flex justify-center gap-2 mt-8">
            {STEPS.map(s => <div key={s.step} className={`w-3 h-3 rounded-full transition-colors ${step >= s.step ? 'bg-cyan-500' : 'bg-gray-600'}`}></div>)}
           </div>
       )}
    </main>
  );
};

export default App;