import React, { useState } from 'react';
import { Lock, User, ArrowRight } from 'lucide-react';

interface AdminLoginViewProps {
  onLoginSuccess: () => void;
  onBack: () => void;
}

const AdminLoginView: React.FC<AdminLoginViewProps> = ({ onLoginSuccess, onBack }) => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (user === 'luna' && pass === 'fmst9') {
      onLoginSuccess();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="bg-white rounded-[3rem] p-10 shadow-2xl border border-gray-100 text-center">
        <div className="w-20 h-20 bg-[#003366] rounded-3xl flex items-center justify-center text-white mx-auto mb-6 shadow-xl">
          <Lock size={32} />
        </div>
        
        <h2 className="text-3xl font-black text-[#003366] mb-2 tracking-tighter">Área Restrita</h2>
        <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-8">Acesso exclusivo ao administrador</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text"
              placeholder="Utilizador"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="w-full bg-gray-50 p-4 pl-12 rounded-2xl border border-gray-100 outline-none focus:border-[#D4A017] font-bold transition-all"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="password"
              placeholder="Senha"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className="w-full bg-gray-50 p-4 pl-12 rounded-2xl border border-gray-100 outline-none focus:border-[#D4A017] font-bold transition-all"
            />
          </div>

          {error && <p className="text-red-500 text-[10px] font-black uppercase tracking-tighter animate-bounce">Credenciais Inválidas</p>}

          <button 
            type="submit"
            className="w-full bg-[#003366] text-white p-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-lg hover:bg-[#D4A017] hover:text-[#003366] transition-all flex items-center justify-center gap-2"
          >
            Entrar no Painel <ArrowRight size={16} />
          </button>
        </form>

        <button onClick={onBack} className="mt-8 text-gray-400 font-black text-[10px] uppercase tracking-widest hover:text-[#003366] transition-colors">
          Voltar ao Portal
        </button>
      </div>
    </div>
  );
};

export default AdminLoginView;