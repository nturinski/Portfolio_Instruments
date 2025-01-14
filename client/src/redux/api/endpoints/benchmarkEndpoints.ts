import axios from "axios";
import { getToken } from "../../User/userUtils";
import {
  IncomingGetBenchmarkFetchRaw,
  IncomingGetBenchmarkFetchStandardized,
  IncomingSetBenchmarkFetchRaw,
  IncomingSetBenchmarkFetchStandardized,
} from "../types";
import { BENCHMARK_ENDPOINT } from "./constants";

export async function getBenchmarkEndpoint(): Promise<IncomingGetBenchmarkFetchStandardized> {
  try {
    const benchmarkResponse: IncomingGetBenchmarkFetchRaw = await axios.get(
      BENCHMARK_ENDPOINT.GET_BENCHMARK,
      {
        headers: {
          authorization: getToken(),
        },
      }
    );
    return {
      data: benchmarkResponse.data.benchmark,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: {
        status: error.response.status,
        message: error.message,
      },
    };
  }
}

export async function setBenchmarkEndpoint(
  benchmark: string
): Promise<IncomingSetBenchmarkFetchStandardized> {
  try {
    const benchmarkResponse: IncomingSetBenchmarkFetchRaw = await axios.post(
      BENCHMARK_ENDPOINT.SET_BENCHMARK,
      { benchmark },
      {
        headers: {
          authorization: getToken(),
        },
      }
    );
    return {
      data: benchmarkResponse.data.message,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: {
        status: error.response.status,
        message: error.message,
      },
    };
  }
}
