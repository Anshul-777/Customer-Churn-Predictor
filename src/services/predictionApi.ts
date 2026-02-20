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
  predicted_churn_status: string;   // raw string from backend e.g. "Churn (Likely to leave)"
  risk_level: "Low" | "Medium" | "High";
  recommendations: string[];
}

export async function predictChurn(data: CustomerFormData): Promise<PredictionResult> {
  // Map React camelCase form fields → exact Python Pydantic field names
  const payload = {
    gender: data.gender,
    SeniorCitizen: data.seniorCitizen,
    Partner: data.partner,
    Dependents: data.dependents,
    tenure: data.tenure,
    PhoneService: data.phoneService,
    MultipleLines: data.multipleLines,
    InternetService: data.internetService,
    OnlineSecurity: data.onlineSecurity,
    OnlineBackup: data.onlineBackup,
    DeviceProtection: data.deviceProtection,
    TechSupport: data.techSupport,
    StreamingTV: data.streamingTV,
    StreamingMovies: data.streamingMovies,
    Contract: data.contract,
    PaperlessBilling: data.paperlessBilling,
    PaymentMethod: data.paymentMethod,
    MonthlyCharges: data.monthlyCharges,
    TotalCharges: data.tenure * data.monthlyCharges,
  };

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
    throw new Error(`Prediction API Error ${response.status}: ${errorText}`);
  }

  // Backend returns: { predicted_churn_status, probability_of_churn, risk_level, recommendations }
  const result = await response.json();

  return {
    churn_probability: result.probability_of_churn,
    predicted_churn: result.probability_of_churn >= 0.5,
    predicted_churn_status: result.predicted_churn_status,
    risk_level: result.risk_level as "Low" | "Medium" | "High",
    recommendations: result.recommendations ?? [],
  };
}
