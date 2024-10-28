import React, { useState } from 'react';
import { Settings, X, Upload, Sun, Type, Square, Circle, Palette } from 'lucide-react';

const QuizApp = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    name: '',
    email: ''
  });
  const [settings, setSettings] = useState({
    backgroundColor: '#f6f6f6',
    cardBackground: '#f3f3f3',
    titleColor: '#000000',
    textColor: '#4a5568',
    buttonColor: '#3b82f6',
    buttonTextColor: '#ffffff',
    cardOpacity: 1,
    backgroundImage: null,
    showShadow: true,
    cardBorderRadius: 16,
    controlsBorderRadius: 8
  });
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('colors');

  const questions = [
    {
      id: 'name',
      question: '¿Cuál es tu nombre?',
      type: 'text'
    },
    {
      id: 'email',
      question: '¿Cuál es tu correo electrónico?',
      type: 'email'
    }
  ];

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSettings(prev => ({
          ...prev,
          backgroundImage: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const renderSettingsContent = () => {
    switch (activeTab) {
      case 'colors':
        return (
          <div className="grid grid-cols-2 gap-2 p-2">
            <div>
              <label className="text-xs">Fondo</label>
              <input
                type="color"
                value={settings.backgroundColor}
                onChange={(e) => setSettings(prev => ({ ...prev, backgroundColor: e.target.value }))}
                className="w-full h-6"
              />
            </div>
            <div>
              <label className="text-xs">Tarjeta</label>
              <input
                type="color"
                value={settings.cardBackground}
                onChange={(e) => setSettings(prev => ({ ...prev, cardBackground: e.target.value }))}
                className="w-full h-6"
              />
            </div>
          </div>
        );
      case 'typography':
        return (
          <div className="grid grid-cols-2 gap-2 p-2">
            <div>
              <label className="text-xs">Títulos</label>
              <input
                type="color"
                value={settings.titleColor}
                onChange={(e) => setSettings(prev => ({ ...prev, titleColor: e.target.value }))}
                className="w-full h-6"
              />
            </div>
            <div>
              <label className="text-xs">Texto</label>
              <input
                type="color"
                value={settings.textColor}
                onChange={(e) => setSettings(prev => ({ ...prev, textColor: e.target.value }))}
                className="w-full h-6"
              />
            </div>
          </div>
        );
      case 'buttons':
        return (
          <div className="grid grid-cols-2 gap-2 p-2">
            <div>
              <label className="text-xs">Fondo botón</label>
              <input
                type="color"
                value={settings.buttonColor}
                onChange={(e) => setSettings(prev => ({ ...prev, buttonColor: e.target.value }))}
                className="w-full h-6"
              />
            </div>
            <div>
              <label className="text-xs">Texto botón</label>
              <input
                type="color"
                value={settings.buttonTextColor}
                onChange={(e) => setSettings(prev => ({ ...prev, buttonTextColor: e.target.value }))}
                className="w-full h-6"
              />
            </div>
          </div>
        );
      case 'layout':
        return (
          <div className="space-y-2 p-2">
            <div>
              <label className="text-xs block">Transparencia</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={settings.cardOpacity}
                onChange={(e) => setSettings(prev => ({ ...prev, cardOpacity: Number(e.target.value) }))}
                className="w-full"
              />
            </div>
            <div>
              <label className="text-xs block">Radio bordes</label>
              <input
                type="range"
                min="0"
                max="32"
                value={settings.cardBorderRadius}
                onChange={(e) => setSettings(prev => ({ ...prev, cardBorderRadius: Number(e.target.value) }))}
                className="w-full"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-xs">Sombra</label>
              <input
                type="checkbox"
                checked={settings.showShadow}
                onChange={(e) => setSettings(prev => ({ ...prev, showShadow: e.target.checked }))}
                className="w-4 h-4"
              />
            </div>
            <div>
              <label className="text-xs block">Imagen de fondo</label>
              <div className="flex gap-2">
                <label className="cursor-pointer px-2 py-1 bg-blue-500 text-white text-xs rounded">
                  <Upload size={12} className="inline mr-1" />
                  Subir
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
                {settings.backgroundImage && (
                  <button
                    onClick={() => setSettings(prev => ({ ...prev, backgroundImage: null }))}
                    className="text-red-500 text-xs"
                  >
                    Eliminar
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const handleSubmit = () => {
    console.log('Respuestas:', answers);
    setStep(questions.length + 1);
  };

  const renderStep = () => {
    if (step === 0) {
      return (
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4" style={{ color: settings.titleColor }}>
            ¡Bienvenido a nuestro cuestionario!
          </h1>
          <p className="mb-6" style={{ color: settings.textColor }}>
            Por favor, tómate un momento para responder estas preguntas.
          </p>
          <button
            onClick={() => setStep(1)}
            className="px-6 py-2"
            style={{ 
              backgroundColor: settings.buttonColor, 
              color: settings.buttonTextColor,
              borderRadius: `${settings.controlsBorderRadius}px`
            }}
          >
            Comenzar
          </button>
        </div>
      );
    }

    if (step > questions.length) {
      return (
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4" style={{ color: settings.titleColor }}>
            ¡Gracias por participar!
          </h1>
          <p className="mb-6" style={{ color: settings.textColor }}>
            Tus respuestas han sido guardadas.
          </p>
        </div>
      );
    }

    const currentQuestion = questions[step - 1];
    return (
      <div className="w-full">
        <h2 className="text-2xl font-bold mb-6" style={{ color: settings.titleColor }}>
          {currentQuestion.question}
        </h2>
        <div className="relative">
          <input
            type={currentQuestion.type}
            value={answers[currentQuestion.id] || ''}
            onChange={(e) => setAnswers(prev => ({ ...prev, [currentQuestion.id]: e.target.value }))}
            className="w-full bg-transparent border-b-2 border-gray-300 focus:border-blue-500 outline-none py-2"
            style={{ color: settings.textColor }}
          />
        </div>
        <div className="flex justify-between mt-8">
          <button
            onClick={() => setStep(prev => prev - 1)}
            style={{ 
              backgroundColor: settings.buttonColor, 
              color: settings.buttonTextColor,
              borderRadius: `${settings.controlsBorderRadius}px`
            }}
            className="px-6 py-2"
          >
            Anterior
          </button>
          <button
            onClick={() => step === questions.length ? handleSubmit() : setStep(prev => prev + 1)}
            style={{ 
              backgroundColor: settings.buttonColor, 
              color: settings.buttonTextColor,
              borderRadius: `${settings.controlsBorderRadius}px`
            }}
            className="px-6 py-2"
          >
            {step === questions.length ? 'Enviar' : 'Siguiente'}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        backgroundColor: settings.backgroundColor,
        backgroundImage: settings.backgroundImage ? `url(${settings.backgroundImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div
        className={`w-full max-w-4xl p-8 ${settings.showShadow ? 'shadow-xl' : ''}`}
        style={{
          backgroundColor: `${settings.cardBackground}${Math.round(settings.cardOpacity * 255).toString(16).padStart(2, '0')}`,
          borderRadius: `${settings.cardBorderRadius}px`
        }}
      >
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <img 
              src="/api/placeholder/100/100" 
              alt="Gym Logo" 
              className="w-16 h-16 object-contain"
            />
            <h1 
              className="text-3xl font-bold ml-4"
              style={{ color: settings.titleColor }}
            >
              Nombre del GYM
            </h1>
          </div>
          <div 
            className="text-sm"
            style={{ color: settings.textColor }}
          >
            Horario: Lunes a Viernes 6:00 AM - 10:00 PM | Sábados 8:00 AM - 6:00 PM
          </div>
          <div 
            className="mt-4 text-sm italic"
            style={{ color: settings.textColor }}
          >
            Nota especial del gimnasio aquí
          </div>
        </div>

        <div 
          className="w-full h-2 bg-gray-200 mb-8"
          style={{ borderRadius: `${settings.controlsBorderRadius}px` }}
        >
          <div
            className="h-full transition-all duration-300"
            style={{
              width: `${(step / (questions.length + 1)) * 100}%`,
              backgroundColor: settings.buttonColor,
              borderRadius: `${settings.controlsBorderRadius}px`
            }}
          />
        </div>

        <div className="relative">
          {renderStep()}
        </div>
      </div>

      {/* Menú flotante inferior */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2">
        <div 
          className="bg-white rounded-full shadow-lg p-2 flex items-center gap-2"
          style={{ borderRadius: `${settings.controlsBorderRadius}px` }}
        >
          <button
            onClick={() => {
              setIsSettingsOpen(!isSettingsOpen);
              setActiveTab('colors');
            }}
            className={`p-2 rounded-full ${isSettingsOpen ? 'bg-gray-100' : ''}`}
          >
            <Settings size={20} />
          </button>
          
          {isSettingsOpen && (
            <>
              <button
                onClick={() => setActiveTab('colors')}
                className={`p-2 rounded-full ${activeTab === 'colors' ? 'bg-gray-100' : ''}`}
              >
                <Palette size={20} />
              </button>
              <button
                onClick={() => setActiveTab('typography')}
                className={`p-2 rounded-full ${activeTab === 'typography' ? 'bg-gray-100' : ''}`}
              >
                <Type size={20} />
              </button>
              <button
                onClick={() => setActiveTab('buttons')}
                className={`p-2 rounded-full ${activeTab === 'buttons' ? 'bg-gray-100' : ''}`}
              >
                <Circle size={20} />
              </button>
              <button
                onClick={() => setActiveTab('layout')}
                className={`p-2 rounded-full ${activeTab === 'layout' ? 'bg-gray-100' : ''}`}
              >
                <Square size={20} />
              </button>
            </>
          )}
        </div>

        {/* Panel de configuración */}
        {isSettingsOpen && (
          <div 
            className="absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg w-72"
            style={{ borderRadius: `${settings.controlsBorderRadius}px` }}
          >
            {renderSettingsContent()}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizApp;