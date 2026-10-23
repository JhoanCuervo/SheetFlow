import MovementsByMonth from "./components/MovementsByMonth/MovementsByMonth";
import InOutChart from "./components/InOutChart/InOutChart";
import CategoryValueChart from "./components/CategoryValueChart/CategoryValueChart";
import StatCards from "./components/StatCards/StatCards";

const CHART_CARD = "border border-line rounded-2xl bg-void p-4";

/** Página principal con las métricas y gráficas del negocio. */
const Dashboard = () => {
  return (
    <>
      <StatCards />

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className={CHART_CARD}>
          <InOutChart />
        </div>
        <div className={CHART_CARD}>
          <CategoryValueChart />
        </div>
        <div className={`${CHART_CARD} sm:col-span-2`}>
          <MovementsByMonth />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
