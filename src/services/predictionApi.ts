// src/services/predictionApi.ts
// All prediction requests are routed through a server-side edge function proxy
// to avoid CORS issues with the Render-hosted FastAPI backend.

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const PROXY_URL = `${SUPABASE_URL}/functions/v1/predict-proxy`;

export interface CustomerFormData {
  gender: string;
  seniorCitizen: number;
  partner: string;
  dependents: string;
  tenure: number;
  contract: string;
  paymentMethod: string;
  paperlessBilling: string;
  monthlyCharges: number;
  phoneService: string;
  multipleLines: string;
  internetService: string;
  onlineSecurity: string;
  onlineBackup: string;
  deviceProtection: string;
  techSupport: string;
  streamingTV: string;
  streamingMovies: string;
}

export interface PredictionResult {
  churn_probability: number;
  predicted_churn: boolean;
  predicted_churn_status: string;
  risk_level: "Low" | "Medium" | "High";
  recommendations: string[];
}

export async function predictChurn(data: CustomerFormData): Promise<PredictionResult> {
  // Explicitly construct payload with guaranteed scalar primitive types.
  // This prevents react-hook-form Slider state from accidentally wrapping
  // numeric values in arrays (e.g. [65] instead of 65), which causes
  // FastAPI Pydantic to throw "Invalid value '[1]' for dtype 'str'".
  const tenure = Number(data.tenure);
  const monthlyCharges = Number(data.monthlyCharges);

  const payload = {
    gender:           String(data.gender),
    SeniorCitizen:    Number(data.seniorCitizen),
    Partner:          String(data.partner),
    Dependents:       String(data.dependents),
    tenure:           tenure,
    PhoneService:     String(data.phoneService),
    MultipleLines:    String(data.multipleLines),
    InternetService:  String(data.internetService),
    OnlineSecurity:   String(data.onlineSecurity),
    OnlineBackup:     String(data.onlineBackup),
    DeviceProtection: String(data.deviceProtection),
    TechSupport:      String(data.techSupport),
    StreamingTV:      String(data.streamingTV),
    StreamingMovies:  String(data.streamingMovies),
    Contract:         String(data.contract),
    PaperlessBilling: String(data.paperlessBilling),
    PaymentMethod:    String(data.paymentMethod),
    MonthlyCharges:   monthlyCharges,
    TotalCharges:     tenure * monthlyCharges,
  };

  console.log("=== ChurnSense Payload Inspector ===");
  console.log(JSON.stringify(payload, null, 2));
  console.log("Types check — SeniorCitizen:", typeof payload.SeniorCitizen, payload.SeniorCitizen);
  console.log("Types check — tenure:", typeof payload.tenure, payload.tenure);
  console.log("Types check — MonthlyCharges:", typeof payload.MonthlyCharges, payload.MonthlyCharges);

  // Retry up to 2 times to handle Render free-tier cold-start (can take 30s on first request)
  const MAX_RETRIES = 2;
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      console.log(`Attempt ${attempt}/${MAX_RETRIES} → sending to proxy...`);

      const response = await fetch(PROXY_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": SUPABASE_ANON_KEY,
          "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Prediction API Error (attempt ${attempt}):`, response.status, errorText);

        // 504 = proxy timeout (Render cold-start) — retry
        if (response.status === 504 && attempt < MAX_RETRIES) {
          console.log("Gateway timeout (Render cold-start). Retrying...");
          lastError = new Error(`Render backend timed out (cold-start). Retrying... (attempt ${attempt})`);
          continue;
        }

        throw new Error(`Prediction API Error ${response.status}: ${errorText}`);
      }

      // Backend returns: { predicted_churn_status, probability_of_churn, risk_level, recommendations }
      const result = await response.json();
      console.log("=== Backend Response ===", result);

      return {
        churn_probability: result.probability_of_churn,
        predicted_churn: result.probability_of_churn >= 0.5,
        predicted_churn_status: result.predicted_churn_status,
        risk_level: result.risk_level as "Low" | "Medium" | "High",
        recommendations: result.recommendations ?? [],
      };
    } catch (err) {
      if (err instanceof Error && err.message.includes("Retrying")) {
        lastError = err;
        continue;
      }
      throw err;
    }
  }

  throw lastError ?? new Error("Prediction failed after retries.");
}
