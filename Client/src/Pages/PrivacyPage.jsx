import { CLINICA } from '../config/clinica';
import useTituloPagina from '../hooks/useTituloPagina';

export default function PrivacyPage() {
  useTituloPagina('Aviso de Privacidad');
  return (
    <main className="flex-1 max-w-3xl mx-auto px-6 py-16 w-full">
      <meta name="robots" content="noindex" />

      <h1 className="text-3xl sm:text-4xl font-serif font-bold text-ink mb-8">Aviso de privacidad</h1>

      <div className="space-y-6 text-slate-600 leading-relaxed">
        <p>
          En <strong className="text-ink">{CLINICA.nombreCompleto}</strong> cuidamos los datos personales que nos compartes al
          solicitar una cita a través de este sitio web.
        </p>

        <section>
          <h2 className="text-lg font-serif font-bold text-ink mb-2">¿Qué datos recopilamos?</h2>
          <p>
            Tu nombre, número de teléfono o WhatsApp, correo electrónico (opcional), el servicio que solicitas y la fecha y hora
            elegidas.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-serif font-bold text-ink mb-2">¿Para qué los usamos?</h2>
          <p>
            Únicamente para gestionar tu cita: registrarla, confirmarla, reprogramarla o avisarte de cualquier cambio. No los
            vendemos ni los compartimos con terceros con fines publicitarios.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-serif font-bold text-ink mb-2">¿Quién puede verlos?</h2>
          <p>
            Solo el personal autorizado de la clínica, mediante un panel protegido con usuario y contraseña. Los datos se guardan
            en un servicio de base de datos en la nube con reglas de acceso que impiden que otras personas los consulten.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-serif font-bold text-ink mb-2">Tus derechos</h2>
          <p>
            Puedes pedir que corrijamos o eliminemos tus datos en cualquier momento escribiendo a{' '}
            <a href={`mailto:${CLINICA.email}`} className="text-brand font-semibold underline">
              {CLINICA.email}
            </a>{' '}
            o al WhatsApp {CLINICA.telefonoVisible}.
          </p>
        </section>
      </div>
    </main>
  );
}
