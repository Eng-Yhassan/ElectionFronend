import React from "react";
import { Link } from "react-router-dom";
import Features from "../../components/ui/Features";

const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Benadir University Election System
        </h1>
        <p className="max-w-2xl text-base md:text-lg mb-6">
          Codkaaga waa muhiim! Halkan waxaad kaga qayb qaadan kartaa
          doorashooyinka gudiyada ardayda iyo tartamada kala duwan ee
          Jaamacadda Benadir. Nidaam casri ah oo hufnaan iyo cadaalad lagu
          hubinayo.
        </p>
        <Link to="/candidates">
          <button className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-gray-100 transition">
            Billaaw Codkaaga
          </button>
        </Link>
      </section>

      {/* Features Section */}
      <section className="flex-1 px-6 py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-10">
          About us
        </h2>
        <div className="flex justify-center items-center flex-wrap gap-10">
          {/* Feature components  */}
          <Features
            title="Doorashooyinka Gudiyada"
            desc="Codkaaga ku dhiib si aad u doorato hogaamiyeyaasha ardayda."
          />
          <Features
            title="Tartamada & Gudiyada kale"
            desc=" Ka qayb qaado codbixinta tartamada kala duwan ee jaamacadda lagu
              qabto."
          />
          <Features
            title="Natiijo Degdeg ah"
            desc=" Isla markiiba ku arag guuleystayaasha doorashooyinka."
          />
        </div>
      </section>

      {/* Warning Section */}
      <section className="px-6 py-8">
        <div className="max-w-4xl mx-auto bg-red-100 border-l-4 border-red-600 text-red-800 p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold flex items-center gap-2 mb-2">
            ⚠️ Digniin Muhiim ah
          </h2>
          <p className="text-base md:text-lg leading-relaxed">
            Fadlan si aad u codeyso waa inaad tagtaa <span className="font-semibold">xarumaha is-diiwaangelinta </span>
            oo aad iska diiwaangelisaa. Kaliya ardayda <span className="font-semibold">Jamacda Benadir</span> ayaa xaq u leh codbixinta.
          </p>
        </div>
      </section>

    </div>
  );
};

export default Home;
