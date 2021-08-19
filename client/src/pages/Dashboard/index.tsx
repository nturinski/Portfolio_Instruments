import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardInstitutions from "../../components/CardInstitutions";
import CardPieChart from "../../components/CardPieChart";
import CardTaxShelter from "../../components/CardTaxShelter";
import CardTotals from "../../components/CardTotals";
import Linechart from "../../components/Linechart";
import {
  selectAssetRatios,
  selectAssetTitles,
  selectBenchmarkBreakdownPercentage,
  selectBenchmarkTitle,
} from "../../redux/Benchmarks/benchmarkSelector";
import { initGetBenchmarkAction } from "../../redux/Benchmarks/benchmarkSlice";
import {
  selectMacroBreakdown,
  selectVpAssets,
} from "../../redux/Holdings/holdingSelectors";
import { selectHasSnapshots } from "../../redux/Snapshots/snapshotSelector";
import { initDashboardSnapshotsAction } from "../../redux/Snapshots/snapshotSlice";

const Dashboard = () => {
  const benchmarkTitle = useSelector(selectBenchmarkTitle);
  const assetTitles = useSelector(selectAssetTitles);
  const assetRatios = useSelector(selectAssetRatios);
  const benchmarkBreakdown = useSelector(selectBenchmarkBreakdownPercentage);
  const [vpAssetTitles, vpAssetRatios] = useSelector(selectVpAssets);
  const macroBreakdown = useSelector(selectMacroBreakdown);
  const hasSnapshots = useSelector(selectHasSnapshots);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initDashboardSnapshotsAction());
    dispatch(initGetBenchmarkAction());
  }, []);

  return (
    <>
      {hasSnapshots && benchmarkTitle && (
        <>
          <div className="row row-cards">
            <CardTotals accountType={"Traditional"} color={"purple"} />
            <CardTotals accountType={"Roth"} color={"green"} />
            <CardTotals accountType={"Taxable"} color={"yellow"} />
            <CardTotals accountType={"Net Worth"} color={"blue"} />
          </div>
          <Linechart />
          <div className="row">
            <CardInstitutions />
            <CardTaxShelter />
          </div>
          <div className="row">
            <CardPieChart
              cardTitle={`Current Portfolio - Macro Breakdown: `}
              titles={["Main", "Variable"]}
              ratios={macroBreakdown}
            />
            <CardPieChart
              cardTitle={`Variable Portfolio - Asset Breakdown: `}
              titles={vpAssetTitles}
              ratios={vpAssetRatios}
            />
          </div>
          <div className="row">
            <CardPieChart
              cardTitle={`Current Portfolio (Main) - Benchmark Breakdown: `}
              titles={(() => {
                const newAssetTitles = [...assetTitles, "other (non-VP)"];
                return newAssetTitles;
              })()}
              ratios={benchmarkBreakdown}
            />
            <CardPieChart
              cardTitle={`Current Benchmark: ${benchmarkTitle}`}
              titles={assetTitles}
              ratios={assetRatios}
            />
          </div>{" "}
        </>
      )}
    </>
  );
};

export default Dashboard;
