/** Marcador temporal de una página aún no construida. Se elimina al construirla. */
export function PhaseStub({ title, phase }: { title: string; phase: number }) {
  return (
    <div className="mx-auto flex min-h-[70svh] max-w-content flex-col justify-center gap-6 px-(--gutter) pt-40 pb-16">
      <h1 className="text-display-sm text-on-surface sm:text-display-lg">{title}</h1>
      <p className="pendiente max-w-prose text-body-lg text-on-surface-variant">
        Página pendiente: se construye en la fase {phase}.
      </p>
    </div>
  );
}
