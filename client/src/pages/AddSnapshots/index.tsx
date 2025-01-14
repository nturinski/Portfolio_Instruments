import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import CardAddSnapshotsForm from "../../components/CardAddSnapshotsForm";
import CardAddSnapshotsTable from "../../components/CardAddSnapshotsTable";
import SnapshotsFallback from "../../components/ErrorFallbacks/SnapshotsFallback";
import {
  selectBenchmarkTitle,
  selectHasBenchmark,
} from "../../redux/Benchmarks/Selectors";
import { selectSnapshotErrors } from "../../redux/Snapshots/Selectors";
import { postSnapshotAction } from "../../redux/Snapshots/snapshotSlice";
import { HoldingForm, SnapshotForm } from "../../validation/types";
import { Account, Holding, Snapshot } from "./types";

const AddSnapshots = () => {
  const [snapshot, setSnapshot] = useState<Snapshot>([]);
  const error = useSelector(selectSnapshotErrors);
  const benchmark = useSelector(selectBenchmarkTitle);
  const hasBenchmark = useSelector(selectHasBenchmark);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!hasBenchmark) {
      history.push("/gettingStarted");
    }
  }, [hasBenchmark]);

  const addHolding = (holding: HoldingForm) => {
    const newSnapshot: Snapshot = [...snapshot];
    const newHolding: Holding = {
      holdingTitle: holding.holdingTitle,
      holdingTicker: holding.holdingTicker,
      holdingExpenseRatio: parseFloat(
        parseFloat(holding.holdingExpenseRatio).toFixed(2)
      ),
      holdingAmount: parseFloat(parseFloat(holding.holdingAmount).toFixed(2)),
      holdingVP: holding.holdingVP,
      assetType: holding.assetType,
    };
    let accountNameExists = false;

    newSnapshot.forEach((account) => {
      if (account.accountName === holding.holdingLocation.toLowerCase()) {
        if (
          account.accountType[holding.accountType.toLowerCase()].length !== 0
        ) {
          // If account name and account type exist
          const tickerIndex = account.accountType[
            holding.accountType.toLowerCase()
          ].findIndex(
            (accountHolding) =>
              holding.holdingTicker === accountHolding.holdingTicker
          );

          if (tickerIndex !== -1) {
            // Ticker already exists
            account.accountType[holding.accountType.toLowerCase()][
              tickerIndex
            ] = newHolding;
          } else {
            // But unique ticker
            account.accountType[holding.accountType.toLowerCase()].push(
              newHolding
            );
          }
        } else {
          // If account name exists but account type does not exist
          account.accountType[holding.accountType.toLowerCase()] = [newHolding];
        }
        accountNameExists = true;
      }
    });

    if (!accountNameExists) {
      const newAccount: Account = {
        accountName: holding.holdingLocation.toLowerCase(),
        accountType: {
          traditional: [],
          roth: [],
          taxable: [],
        },
      };
      newAccount.accountType[holding.accountType.toLowerCase()].push(
        newHolding
      );
      newSnapshot.push(newAccount);
    }

    setSnapshot(newSnapshot);
  };

  const deleteHolding = (
    _e: React.MouseEvent<HTMLElement>,
    accountName: string,
    accountType: string,
    holdingTicker: string
  ) => {
    const newSnapshot = [...snapshot];
    let accIndex = 0;

    newSnapshot.forEach((account, accountIndex) => {
      if (account.accountName === accountName) {
        accIndex = accountIndex;
        account.accountType[accountType].forEach((holding, holdingIndex) => {
          if (holding.holdingTicker === holdingTicker) {
            newSnapshot[accountIndex].accountType[accountType].splice(
              holdingIndex,
              1
            );
          }
        });
      }
    });

    // If all account arrays are empty, clear object from array
    if (
      newSnapshot[accIndex].accountType.roth.length === 0 &&
      newSnapshot[accIndex].accountType.traditional.length === 0 &&
      newSnapshot[accIndex].accountType.taxable.length === 0
    ) {
      newSnapshot.splice(accIndex, 1);
    }

    setSnapshot(newSnapshot);
  };

  const resetSnapshotData = () => {
    setSnapshot([]);
  };

  const submitSnapshotData = (snapshotParams: SnapshotForm) => {
    const outgoingSnapshot = {
      ...snapshotParams,
      snapshotBenchmark: benchmark,
      accounts: snapshot,
    };
    dispatch(postSnapshotAction(outgoingSnapshot));
  };

  return (
    <div className="row">
      <div className="col-md-12 col-lg-12">
        {!error.message && hasBenchmark && (
          <>
            <div className="card card-body p-6 about-con pabout">
              <h2 className="mb-4 font-weight-semibold">
                <u>General Information</u>
              </h2>
              <p className="leading-normal">
                Add any assets that you own using the "Holdings" form below. As
                you add holdings, the snapshots table below will populate. When
                you are done adding assets, finish by hitting the save snapshot
                button to store your data.
              </p>
              <p className="leading-normal">
                Additional Notes (1): Clicking the "Variable Portfolio"
                checkmark tells us that this holding is not part of your normal
                portfolio. We will still track the holding, but will not factor
                this in when analyzing your final portfolio's rebalance
                requirements when compared against your benchmark portfolio.
              </p>
              <p className="leading-normal">
                Additional Notes (2): For account holdings that don't carry
                tickers, we suggest that you make up/standardize a placeholder.
                For example, if I have a cash position in my USAA checking
                account, I could use the fake ticker "USAACHK" or standardize
                bank cash positions with something more generic like "BANKCHK"
                which could be used across multiple bank accounts.
              </p>
            </div>{" "}
            <br></br>
          </>
        )}
      </div>

      <div className="col-md-12 col-lg-12">
        {!error.message && hasBenchmark && (
          <>
            <CardAddSnapshotsForm addHolding={addHolding} />
            <CardAddSnapshotsTable
              deleteHolding={deleteHolding}
              resetSnapshotData={resetSnapshotData}
              submitSnapshotData={submitSnapshotData}
              snapshot={snapshot}
            />
          </>
        )}

        {error.message && <SnapshotsFallback />}
      </div>
    </div>
  );
};

export default AddSnapshots;
