import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-16 bg-gradient-to-r from-indigo-600 to-blue-700 text-white">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          About Our Election System
        </h1>
        <p className="max-w-2xl text-base md:text-lg">
          Nidaamka Doorashada ee Jaamacadda Benadir waxaa loogu talagalay in uu
          si casri ah u fududeeyo habka doorashooyinka iyo tartamada ardayda,
          iyadoo la hubinayo hufnaan, cadaalad iyo kalsooni.
        </p>
      </section>

      {/* Vision & Mission Section */}
      <section className="px-6 py-12 md:py-16 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-blue-600 mb-3">
              🎯Vision
            </h2>
            <p className="text-gray-600">
              In la helo nidaam doorasho oo casri ah oo dhisaya kalsoonida
              ardayda, loona diyaariyo hoggaan tayo leh.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-blue-600 mb-3">
              🚀Mission
            </h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>In ardaydu si fudud codkooda u dhiibtaan meel kasta.</li>
              <li>In tartamada lagu maamulo si hufan oo casri ah.</li>
              <li>In natiijooyinka si degdeg ah oo daahfuran loo bandhigo.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="px-6 py-12 bg-gray-100">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-10">
          Qiimayaasha Nidaamka
        </h2>
        <div className="flex justify-center items-center flex-wrap gap-10 ">
          <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition text-center w-[290px] h-36">
            <h3 className="font-semibold text-lg text-blue-600 mb-2">
              🤝 Daahfurnaan
            </h3>
            <p className="text-gray-600 text-sm">
              Doorasho kasta oo si cad u dhisan.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition text-center w-[290px] h-36">
            <h3 className="font-semibold text-lg text-blue-600 mb-2">
              ⚖️ Cadaalad
            </h3>
            <p className="text-gray-600 text-sm">
              Cod walba wuxuu leeyahay qiimo isku mid ah.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition text-center w-[290px] h-36">
            <h3 className="font-semibold text-lg text-blue-600 mb-2">
              🎓 Ka qaybgal Ardayda
            </h3>
            <p className="text-gray-600 text-sm">
              Arday kasta fursad buuxda ayuu leeyahay.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          Ku Biir Nidaamka
        </h2>
        <p className="text-gray-600 mb-6">
          Adiguna ka mid noqo codka dhisaya mustaqbalka ardayda Jaamacadda
          Benadir.
        </p>
        <Link to="/candidates">
          <button className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition">
            Billaaw Codkaaga
          </button>
        </Link>
      </section>
    </div>
  );
};

export default About;
