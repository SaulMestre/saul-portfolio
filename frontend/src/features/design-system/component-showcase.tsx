import { Button, actionSizes, actionVariants } from "../../components/ui/button";
import { ActionLink } from "../../components/ui/action-link";
import { Card } from "../../components/ui/card";
import type { Locale } from "../../localization/messages";

const copy = {
  es: {
    title: "Sistema de diseño",
    description: "Referencia de desarrollo de los componentes compartidos.",
    buttons: "Botones",
    links: "Enlaces",
    states: "Estados",
    surfaces: "Superficies",
    disabled: "No disponible",
    busy: "Guardando",
    surface: "Superficie principal",
    muted: "Superficie secundaria",
    variants: {
      primary: "Principal",
      secondary: "Secundario",
      outline: "Contorno",
      ghost: "Discreto",
      destructive: "Destructivo",
    },
    sizes: { sm: "Pequeño", md: "Mediano", lg: "Grande" },
  },
  en: {
    title: "Design system",
    description: "Development reference for shared components.",
    buttons: "Buttons",
    links: "Links",
    states: "States",
    surfaces: "Surfaces",
    disabled: "Unavailable",
    busy: "Saving",
    surface: "Primary surface",
    muted: "Secondary surface",
    variants: {
      primary: "Primary",
      secondary: "Secondary",
      outline: "Outline",
      ghost: "Ghost",
      destructive: "Destructive",
    },
    sizes: { sm: "Small", md: "Medium", lg: "Large" },
  },
};

export function ComponentShowcase({ locale }: { locale: Locale }) {
  const labels = copy[locale];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold">{labels.title}</h1>
        <p className="mt-4 text-ink-muted">{labels.description}</p>
      </div>
      <section aria-labelledby="showcase-buttons" className="space-y-4">
        <h2 id="showcase-buttons" className="text-2xl font-semibold">
          {labels.buttons}
        </h2>
        {actionVariants.map((variant) => (
          <div key={variant} className="flex flex-wrap items-center gap-3">
            {actionSizes.map((size) => (
              <Button key={size} variant={variant} size={size}>
                {labels.variants[variant]} · {labels.sizes[size]}
              </Button>
            ))}
          </div>
        ))}
      </section>
      <section aria-labelledby="showcase-links" className="space-y-4">
        <h2 id="showcase-links" className="text-2xl font-semibold">
          {labels.links}
        </h2>
        {actionVariants.map((variant) => (
          <div key={variant} className="flex flex-wrap items-center gap-3">
            {actionSizes.map((size) => (
              <ActionLink key={size} href={`/${locale}`} variant={variant} size={size}>
                {labels.variants[variant]} · {labels.sizes[size]}
              </ActionLink>
            ))}
          </div>
        ))}
      </section>
      <section aria-labelledby="showcase-states" className="space-y-4">
        <h2 id="showcase-states" className="text-2xl font-semibold">
          {labels.states}
        </h2>
        <div className="flex flex-wrap gap-3">
          <Button disabled>{labels.disabled}</Button>
          <Button isLoading>{labels.busy}</Button>
        </div>
      </section>
      <section aria-labelledby="showcase-surfaces" className="space-y-4">
        <h2 id="showcase-surfaces" className="text-2xl font-semibold">
          {labels.surfaces}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>{labels.surface}</Card>
          <Card surface="muted">{labels.muted}</Card>
        </div>
      </section>
    </div>
  );
}
