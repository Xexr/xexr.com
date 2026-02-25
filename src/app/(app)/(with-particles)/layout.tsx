import { ParticleCanvas } from "@components/ParticleCanvas";

export default function WithParticlesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <ParticleCanvas className="pointer-events-none fixed inset-0 -z-10" />
      {children}
    </>
  );
}
