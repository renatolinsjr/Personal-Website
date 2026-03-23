import { type Dictionary } from "../dictionaries";
import { ContactFormWrapper } from "./ContactFormWrapper";
import { Mail, MapPin } from "lucide-react";

export function Contact({ dict }: { dict: Dictionary }) {
  return (
    <section className="max-w-7xl mx-auto px-8" id="contato">
      <div className="bg-surface-container-lowest p-8 md:p-16 rounded-2xl ambient-shadow border border-outline-variant/10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl font-headline font-extrabold text-on-surface tracking-tight mb-6">
              {dict.contact.title.split(" ").slice(0, 3).join(" ")} <br />
              <span className="text-primary">{dict.contact.title.split(" ").slice(3).join(" ")}</span>
            </h2>
            <p className="text-on-surface-variant text-lg mb-10 leading-relaxed">
              {dict.contact.description}
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 flex-shrink-0 bg-surface-container-low rounded-full flex items-center justify-center group-hover:bg-primary-fixed transition-colors">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <span className="font-bold">{dict.contact.email}</span>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 flex-shrink-0 bg-surface-container-low rounded-full flex items-center justify-center group-hover:bg-primary-fixed transition-colors">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <span className="font-bold">{dict.contact.location}</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-1 min-h-[500px]">
            <ContactFormWrapper dict={dict} />
          </div>
        </div>
      </div>
    </section>
  );
}
