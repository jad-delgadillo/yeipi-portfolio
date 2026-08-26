"use client";

import { ArrowRight, ArrowUpRight, CalendarDays } from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";
import { brand } from "@/lib/site-content";

type ContactFields = {
  name: string;
  contact: string;
  business: string;
  project: string;
  date: string;
};

const initialFields: ContactFields = {
  name: "",
  contact: "",
  business: "",
  project: "",
  date: "",
};

export function ContactCta() {
  const [fields, setFields] = useState(initialFields);
  const [messagePrepared, setMessagePrepared] = useState(false);

  function updateField(field: keyof ContactFields, value: string) {
    setFields((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const subject = `Nuevo proyecto · ${fields.name}`;
    const body = [
      `Nombre: ${fields.name}`,
      `Contacto: ${fields.contact}`,
      `Negocio / Instagram: ${fields.business || "No especificado"}`,
      `Fecha aproximada: ${fields.date || "Por definir"}`,
      "",
      "Qué quiere producir:",
      fields.project,
    ].join("\n");

    setMessagePrepared(true);
    window.location.href = `mailto:${brand.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  const bookingHref = `mailto:${brand.email}?subject=${encodeURIComponent("Quiero agendar una llamada")}`;

  return (
    <section className="contact-cta-section" id="contact" aria-labelledby="contact-title">
      <div className="contact-cta-shell">
        <aside className="contact-cta-copy">
          <div className="contact-info-group contact-info-email">
            <p className="contact-cta-eyebrow">Escríbeme</p>
            <a href={`mailto:${brand.email}`}>
              {brand.email}
            </a>
          </div>

          <div className="contact-info-group">
            <p className="contact-cta-eyebrow">Hablemos</p>
            <a className="contact-info-action" href={bookingHref}>
              Agenda una llamada
              <ArrowUpRight aria-hidden="true" size={17} />
            </a>
            <span>15 minutos · sin compromiso</span>
          </div>

          <div className="contact-info-group">
            <p className="contact-cta-eyebrow">Encuéntrame</p>
            <strong>Guadalajara, MX</strong>
            <span>Disponible para proyectos en todo el mundo.</span>
          </div>

          <div className="contact-info-group contact-info-services">
            <p className="contact-cta-eyebrow">Podemos crear</p>
            <span>Contenido para negocios</span>
            <span>Eventos y experiencias</span>
            <span>Fotografía editorial</span>
          </div>
        </aside>

        <div className="contact-form-column">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-form-heading">
              <div>
                <h2 id="contact-title">Cuéntame tu proyecto</h2>
                <p>No necesitas tener la idea resuelta.</p>
              </div>
              <span>01—05</span>
            </div>

            <div className="contact-form-row">
              <label htmlFor="contact-name">Tu nombre <span>(requerido)</span></label>
              <input
                autoComplete="name"
                id="contact-name"
                name="name"
                onChange={(event) => updateField("name", event.target.value)}
                placeholder="¿Cómo te llamas?"
                required
                type="text"
                value={fields.name}
              />
            </div>

            <div className="contact-form-row">
              <label htmlFor="contact-business">Negocio o Instagram</label>
              <input
                id="contact-business"
                name="business"
                onChange={(event) => updateField("business", event.target.value)}
                placeholder="@tu_marca"
                type="text"
                value={fields.business}
              />
            </div>

            <div className="contact-form-row">
              <label htmlFor="contact-channel">Email o WhatsApp <span>(requerido)</span></label>
              <input
                id="contact-channel"
                name="contact"
                onChange={(event) => updateField("contact", event.target.value)}
                placeholder="¿Dónde te respondo?"
                required
                type="text"
                value={fields.contact}
              />
            </div>

            <div className="contact-form-row contact-form-row-message">
              <label htmlFor="contact-project">¿Qué quieres producir? <span>(requerido)</span></label>
              <textarea
                id="contact-project"
                name="project"
                onChange={(event) => updateField("project", event.target.value)}
                placeholder="Un lanzamiento, contenido mensual, un evento..."
                required
                rows={4}
                value={fields.project}
              />
            </div>

            <div className="contact-form-row">
              <label htmlFor="contact-date">Fecha aproximada</label>
              <input
                id="contact-date"
                name="date"
                onChange={(event) => updateField("date", event.target.value)}
                placeholder="Mes o fecha tentativa"
                type="text"
                value={fields.date}
              />
            </div>

            <div className="contact-form-actions">
              <p>
                {messagePrepared
                  ? "El mensaje está listo en tu aplicación de correo."
                  : "Tus datos están seguros. Respondo personalmente cada proyecto."}
              </p>
              <button type="submit">
                Enviar proyecto
                <ArrowRight aria-hidden="true" size={18} />
              </button>
            </div>
          </form>

          <div className="contact-booking-card">
            <CalendarDays aria-hidden="true" size={21} />
            <div>
              <span>¿Prefieres agendar directamente?</span>
              <p>15 minutos · sin compromiso</p>
            </div>
            <a href={bookingHref} aria-label="Agendar una llamada por correo">
              Agendar 15 min
              <ArrowRight aria-hidden="true" size={17} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
