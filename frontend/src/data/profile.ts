export interface Profile {
  name: string;
  tagline: string;
  bio: string;
  email: string;
  phone: string;
  previous: string;
  github: string;
  linkedin: string;
  location: string;
  obsession: string;
  resume: string;
}

export const profile: Profile = {
  name: "Jaya Sabarish Reddy Remala",
  tagline: "Software Engineer · Qualcomm Edge AI Hackathon Winner · Agentic AI & Distributed Infra at Scale",
  bio: "I build AI systems that work under real production pressure. At NYU, I cut RAG query latency by 78% on a Multi-Agent research engine serving 3K+ RPS, and pushed LLM inference to 15ms on Snapdragon NPUs via QLoRA + AWQ quantization. Before that, I kept Shell's maritime telemetry alive 115GB/day, 200+ offshore stations, zero data loss.",
  email: "jr6421@nyu.edu",
  phone: "+1 (516) 907-8727",
  previous: "NYU IT High-Speed Research Network, Shell, Wipro",
  github: "https://github.com/sabarishreddy99",
  linkedin: "https://linkedin.com/in/jayasabarishreddyr",
  location: "New York, NY · Open to relocation",
  obsession: "Currently, I'm obsessed with recommendation systems and the search technology at scale, where it powers the way humans think and behave with intention and responsibility.",
  resume: "https://drive.google.com/drive/u/0/folders/1vm35z-6VQjtO9A8ZBgCvvSP_7_POPTrV",
};
