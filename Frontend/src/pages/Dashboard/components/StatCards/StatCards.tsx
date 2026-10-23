import Lineicons from "@lineiconshq/react-lineicons";
import { useStatCards } from "./StatCards.hooks";
import type { StatCardTone } from "./StatCards.types";

const TONE_CLASSES: Record<StatCardTone, string> = {
  success: "bg-emerald-500/10 text-emerald-600",
  danger: "bg-red-500/10 text-red-500",
  warning: "bg-amber-500/10 text-amber-600",
  accent: "bg-accent/10 text-accent",
};

const ROUND = [
  "max-sm:rounded-t-2xl sm:max-lg:rounded-tl-xl lg:rounded-l-2xl",
  "sm:max-lg:rounded-tr-2xl",
  "sm:max-lg:rounded-bl-2xl",
  "max-sm:rounded-b-2xl sm:max-lg:rounded-br-2xl lg:rounded-r-2xl",
];

/** Tarjetas con las métricas principales del dashboard. */
const StatCards = () => {
  const { data, status } = useStatCards();

  if (status === "loading") {
    return (
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {ROUND.map((round, index) => (
          <li key={index} className={`border border-line bg-void p-4 sm:p-5 ${round}`}>
            <div className="h-10 w-10 animate-pulse rounded-xl bg-black/5" />
            <div className="mt-4 h-4 w-28 animate-pulse rounded bg-black/5" />
            <div className="mt-1.5 h-7 w-20 animate-pulse rounded bg-black/5" />
          </li>
        ))}
      </ul>
    );
  }

  if (status === "error") {
    return (
      <p className="rounded-2xl border border-line bg-void p-4 text-sm text-red-500">
        No se pudieron cargar los datos del dashboard.
      </p>
    );
  }

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {data.map((card, index) => (
        <li
          key={card.id}
          className={`border border-line bg-void p-4 sm:p-5 ${ROUND[index] ?? ""}`}
        >
          <div className="flex items-center justify-between gap-3">
            <span
              className={`grid h-10 w-10 place-items-center rounded-xl ${TONE_CLASSES[card.tone]}`}
            >
              <Lineicons
                icon={card.icon}
                size={20}
                strokeWidth={1.8}
                aria-hidden="true"
                focusable="false"
                className="shrink-0"
              />
            </span>
          </div>

          <p className="mt-4 text-sm text-muted">{card.label}</p>
          <p className="mt-0.5 text-2xl font-bold tracking-tight">
            {card.value}
          </p>
        </li>
      ))}
    </ul>
  );
};

export default StatCards;
