import { getYearsOfExperience, getCurrentYear } from "./lib/date-utils";

const yearsOfExp = getYearsOfExperience();
const currentYear = getCurrentYear();
const email = "contato@renatolinsjr.com.br";

export const dictionaries = {
  "en-US": {
    metadata: {
      title: "Renato Lins | Portfolio",
      description: "Senior Software Engineer | Scalable Frontend & Microfrontends Expert.",
    },
    hero: {
      title: "Renato Lins",
      subtitle: "Senior Software Engineer | Scalable Frontend & Microfrontends Expert.",
      description: `With over ${yearsOfExp} years of technical journey, I transform complexity into fluid interfaces. Consolidated experience in high-impact architectures at big companies.`,
      location: "Based in Brazil • Available for Remote",
      experienceLabel: "Experience",
      frontendLabel: "Frontend",
      link: "Experience",
      code: "Tech Stack",
      years: `${yearsOfExp}+ YEARS`,
      stack: "Main Stack",
      cvLink: "/resume/RENATO_ENGLISH.pdf",
    },
    experience: {
      title: "Professional Journey.",
      seeMore: "Explore more on LinkedIn",
      linkedIn: "https://www.linkedin.com/in/renatolinsjr/",
      github: "https://github.com/renatolinsjr",
      metrics: {
        users: "160M+",
        usersLabel: "Users Impacted",
        savings: "$300k+",
        savingsLabel: "Annual Savings",
      },
      jobs: [
        {
          period: "MAY 2025 — CURRENT",
          company: "Mercado Libre",
          role: "Senior Software Engineer",
          description: [
            "Develop Growth Tooling Platforms serving 160M+ monthly users across Latin America.",
            "Design administrative interfaces for campaign configuration and microfrontends (Module Federation).",
            "Maintain high-throughput Node.js/Go services processing 84k+ daily requests.",
            "Implemented robust E2E testing with Playwright for banking and promotional flows.",
            "Supported large events like Big Brother Brasil, Brazil Football Championship and Meli+.",
          ]
        },
        {
          period: "JAN 2021 — MAY 2025",
          company: "Hurb",
          role: "Tech Lead | Sr. II Software Engineer",
          description: [
            "Led a team of 8 engineers for web platforms serving 25M+ registered travelers.",
            "Reduced $300k/year in operational costs through SAP-integrated automation and self-service tools.",
            "Optimized infra costs by $66k/year by migrating high-volume messaging from AWS SNS to NSQ.",
            "Increased engineering productivity by 25% via CI/CD workflows (GitHub Actions).",
            "Defined frontend architecture standards and acted as a technical consultant for multiple squads.",
          ]
        }
      ]
    },
    skills: {
      title: "Architecture & Skills.",
      frontend: "Frontend Engineering",
      backend: "Backend & APIs",
      devops: "DevOps",
      devopsDetails: ["Docker & K8s", "CI/CD Pipelines", "AWS / GCP"],
      differentials: "Differentials",
      differentialsDetails: [
        "Technical leadership and mentoring of agile teams.",
        "Focus on Performance (Core Web Vitals).",
        "Scalable and atomic Design Systems.",
        "Event-driven microservices architecture.",
      ],
      tags: ["Leadership", "Systems Architecture", "Result Oriented"]
    },
    contact: {
      title: "Shall we create the next chapter?",
      description: "I'm always open to discussing new opportunities, talks or high-level technical collaborations.",
      location: "Rio de Janeiro, Brasil (Remote friendly)",
      education: "Education",
      educationDetails: "Computer Science\nFederal University — 2018",
      languages: "Languages",
      languagesDetails: "PT Native\nEN C1 (Advanced)",
      email: email,
      form: {
        name: "Name",
        phone: "Phone Number",
        email: "Email",
        message: "Message",
        submit: "Send Message",
        success: "Message sent successfully!",
        successDescription: "I'll get back to you soon.",
        error: "Failed to send message. Please try again later.",
        errorDescription: "Something went wrong. Please try again.",
        validation: {
          nameRequired: "Name is required",
          emailInvalid: "Invalid email address",
          messageRequired: "Message is required",
        },
        placeholders: {
          name: "John Doe",
          email: "john@example.com",
          message: "Tell me about your project...",
        },
        cooldown: "Wait",
        sending: "Sending",
      }
    },
    nav: {
      about: "About",
      skills: "Skills",
      experience: "Experience",
      contact: "Contact",
    },
    footer: {
      copy: `© ${currentYear} Renato Lins`,
    }
  },
  "pt-BR": {
    metadata: {
      title: "Renato Lins | Portfólio",
      description: "Engenheiro de Software Sênior | Especialista em Frontend Escalável e Microfrontends.",
    },
    hero: {
      title: "Renato Lins",
      subtitle: "Senior Software Engineer | Especialista em Frontend Escalável & Microfrontends.",
      description: `Com mais de ${yearsOfExp} anos de jornada técnica, transformo complexidade em interfaces fluidas. Experiência consolidada em arquiteturas de alto impacto para grandes empresas.`,
      location: "Baseado no Brasil • Disponível para Remoto",
      experienceLabel: "Experiência",
      frontendLabel: "Frontend",
      link: "Experiência",
      code: "Tech Stack",
      years: `${yearsOfExp}+ ANOS`,
      stack: "Stack Principal",
      cvLink: "/resume/RENATO_PTBR.pdf",
    },
    experience: {
      title: "Jornada Profissional.",
      seeMore: "Explorar mais no LinkedIn",
      linkedIn: "https://www.linkedin.com/in/renatolinsjr/",
      github: "https://github.com/renatolinsjr",
      metrics: {
        users: "160M+",
        usersLabel: "Usuários Impactados",
        savings: "$300k+",
        savingsLabel: "Economia Anual",
      },
      jobs: [
        {
          period: "MAI 2025 — ATUAL",
          company: "Mercado Livre",
          role: "Senior Software Engineer",
          description: [
            "Desenvolvimento de plataformas de Growth Tooling servindo mais de 160 milhões de usuários.",
            "Design de interfaces administrativas para orquestração de campanhas e microfrontends (Module Federation).",
            "Manutenção de serviços de alta performance em Node.js e Go processando 84k+ reqs diárias.",
            "Implementação de sistemas de testes E2E com Playwright para fluxos bancários e promocionais.",
            "Fomento técnico para eventos como Big Brother Brasil, Campeonato Brasileiro e incentivos Meli+.",
          ]
        },
        {
          period: "JAN 2021 — MAI 2025",
          company: "Hurb",
          role: "Tech Lead | Sr. II Software Engineer",
          description: [
            "Liderança de time de 8 engenheiros em plataformas web servindo 25 milhões de viajantes.",
            "Redução de $300k/ano em custos operacionais através de automações SAP e autoatendimento.",
            "Economia de infraestrutura de $66k/ano migrando mensageria de alto volume para NSQ.",
            "Aumento de 25% na produtividade técnica via workflows CI/CD (GitHub Actions).",
            "Definição de padrões de arquitetura frontend e consultoria técnica transversal entre squads.",
          ]
        }
      ]
    },
    skills: {
      title: "Arquitetura & Skills.",
      frontend: "Engenharia Frontend",
      backend: "Backend & APIs",
      devops: "DevOps",
      devopsDetails: ["Docker & K8s", "CI/CD Pipelines", "AWS / GCP"],
      differentials: "Diferenciais",
      differentialsDetails: [
        "Liderança técnica e mentoria de times ágeis.",
        "Foco em Performance (Core Web Vitals).",
        "Design Systems escaláveis e atômicos.",
        "Arquitetura de microsserviços orientada a eventos.",
      ],
      tags: ["Liderança", "Arquitetura de Sistemas", "Foco em resultados"]
    },
    contact: {
      title: "Vamos criar o próximo capítulo?",
      description: "Estou sempre aberto a discutir novas oportunidades, palestras ou colaborações técnicas de alto nível.",
      location: "Rio de Janeiro, Brasil (Flexível para Remoto)",
      education: "Educação",
      educationDetails: "Ciência da Computação\nUniversidade Federal — 2018",
      languages: "Idiomas",
      languagesDetails: "PT Nativo\nEN C1 (Advanced)",
      email: email,
      form: {
        name: "Nome",
        phone: "Número de Telefone",
        email: "E-mail",
        message: "Mensagem",
        submit: "Enviar Mensagem",
        success: "Mensagem enviada com sucesso!",
        successDescription: "Retornarei o contato em breve.",
        error: "Falha ao enviar mensagem. Por favor, tente novamente mais tarde.",
        errorDescription: "Ocorreu um erro. Por favor, tente novamente.",
        validation: {
          nameRequired: "Nome é obrigatório",
          emailInvalid: "E-mail inválido",
          messageRequired: "Mensagem é obrigatória",
        },
        placeholders: {
          name: "Renato Lins",
          email: "exemplo@email.com",
          message: "Conte-me sobre o seu projeto...",
        },
        cooldown: "Aguarde",
        sending: "Enviando",
      }
    },
    nav: {
      about: "Sobre",
      skills: "Skills",
      experience: "Experiência",
      contact: "Contato",
    },
    footer: {
      copy: `© ${currentYear} Renato Lins`,
    }
  }
};

export type Dictionary = typeof dictionaries["pt-BR"];

