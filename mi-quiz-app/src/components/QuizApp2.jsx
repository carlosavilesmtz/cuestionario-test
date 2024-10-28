import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, X, Upload } from 'lucide-react';

const QuizApp2 = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    name: '',
    email: ''
  });
  const [settings, setSettings] = useState({
    backgroundColor: '#f3f3f3',
    cardBackground: '#ffffff',
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

  const transitions = [
    {
      initial: { opacity: 0, x: 100 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -100 }
    },
    {
      initial: { opacity: 0, y: 100 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -100 }
    },
    {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 1.2 }
    }
  ];

  const getRandomTransition = () => {
    return transitions[Math.floor(Math.random() * transitions.length)];
  };

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

  const handleSubmit = () => {
    console.log('Respuestas:', answers);
    setStep(questions.length + 1);
  };

  const renderStep = () => {
    if (step === 0) {
      return (
        <motion.div {...getRandomTransition()} className="text-center">
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
        </motion.div>
      );
    }

    if (step > questions.length) {
      return (
        <motion.div {...getRandomTransition()} className="text-center">
          <h1 className="text-4xl font-bold mb-4" style={{ color: settings.titleColor }}>
            ¡Gracias por participar!
          </h1>
          <p className="mb-6" style={{ color: settings.textColor }}>
            Tus respuestas han sido guardadas.
          </p>
        </motion.div>
      );
    }

    const currentQuestion = questions[step - 1];
    return (
      <motion.div {...getRandomTransition()} className="w-full">
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
      </motion.div>
    );
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundColor: settings.backgroundColor,
        backgroundImage: settings.backgroundImage ? `url(${settings.backgroundImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Botón de configuración */}
      <button
        onClick={() => setIsSettingsOpen(true)}
        style={{ borderRadius: `${settings.controlsBorderRadius}px` }}
        className={`fixed top-4 right-4 p-2 bg-white ${settings.showShadow ? 'shadow-lg' : ''}`}
      >
        <Settings size={24} />
      </button>

      {/* Panel de configuración */}
      <AnimatePresence>
        {isSettingsOpen && (
          <motion.div
            initial={{ x: 300 }}
            animate={{ x: 0 }}
            exit={{ x: 300 }}
            className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg p-4 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Configuración</h3>
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Color de fondo</label>
                <input
                  type="color"
                  value={settings.backgroundColor}
                  onChange={(e) => setSettings(prev => ({ ...prev, backgroundColor: e.target.value }))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Color de tarjeta</label>
                <input
                  type="color"
                  value={settings.cardBackground}
                  onChange={(e) => setSettings(prev => ({ ...prev, cardBackground: e.target.value }))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Transparencia de tarjeta</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={settings.cardOpacity}
                  onChange={(e) => setSettings(prev => ({ ...prev, cardOpacity: e.target.value }))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Radio de bordes - Tarjeta</label>
                <input
                  type="range"
                  min="0"
                  max="32"
                  value={settings.cardBorderRadius}
                  onChange={(e) => setSettings(prev => ({ ...prev, cardBorderRadius: Number(e.target.value) }))}
                  className="w-full"
                />
                <span className="text-sm text-gray-500">{settings.cardBorderRadius}px</span>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Radio de bordes - Controles</label>
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={settings.controlsBorderRadius}
                  onChange={(e) => setSettings(prev => ({ ...prev, controlsBorderRadius: Number(e.target.value) }))}
                  className="w-full"
                />
                <span className="text-sm text-gray-500">{settings.controlsBorderRadius}px</span>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Mostrar sombra</label>
                <input
                  type="checkbox"
                  checked={settings.showShadow}
                  onChange={(e) => setSettings(prev => ({ ...prev, showShadow: e.target.checked }))}
                  className="w-4 h-4"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Color de títulos</label>
                <input
                  type="color"
                  value={settings.titleColor}
                  onChange={(e) => setSettings(prev => ({ ...prev, titleColor: e.target.value }))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Color de texto</label>
                <input
                  type="color"
                  value={settings.textColor}
                  onChange={(e) => setSettings(prev => ({ ...prev, textColor: e.target.value }))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Color de botones</label>
                <input
                  type="color"
                  value={settings.buttonColor}
                  onChange={(e) => setSettings(prev => ({ ...prev, buttonColor: e.target.value }))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Color de texto de botones</label>
                <input
                  type="color"
                  value={settings.buttonTextColor}
                  onChange={(e) => setSettings(prev => ({ ...prev, buttonTextColor: e.target.value }))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Imagen de fondo</label>
                <div className="flex items-center gap-2">
                  <label 
                    className="cursor-pointer px-4 py-2 bg-blue-500 text-white"
                    style={{ borderRadius: `${settings.controlsBorderRadius}px` }}
                  >
                    <Upload size={16} className="inline mr-2" />
                    Subir imagen
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
                      className="text-red-500"
                    >
                      Eliminar
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contenido principal */}
      <div
        className={`w-full max-w-4xl p-8 ${settings.showShadow ? 'shadow-xl' : ''}`}
        style={{
          backgroundColor: `${settings.cardBackground}${Math.round(settings.cardOpacity * 255).toString(16).padStart(2, '0')}`,
          borderRadius: `${settings.cardBorderRadius}px`
        }}
      >
        {/* Header del gimnasio */}
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
              Nombre del gimnasio
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

        {/* Barra de progreso */}
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

        {/* Contenido del formulario */}
        <div className="relative">
          {renderStep()}
          <style jsx global>{`
            input {
              border-bottom-color: ${settings.buttonColor} !important;
            }
            input:focus {
              border-bottom-color: ${settings.buttonColor} !important;
            }
          `}</style>
        </div>
      </div>
    </div>
  );
};

export default QuizApp2;