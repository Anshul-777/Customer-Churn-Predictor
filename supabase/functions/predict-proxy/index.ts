import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const RENDER_API = "https://customer-churn-predictor-zdez.onrender.com";

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const rawBody = await req.json();

    // Explicitly sanitize every field to guaranteed scalar primitives
    // to prevent "[1]" array wrapping from react-hook-form state
    const payload = {
      gender:          String(rawBody.gender),
      SeniorCitizen:   Number(rawBody.SeniorCitizen),
      Partner:         String(rawBody.Partner),
      Dependents:      String(rawBody.Dependents),
      tenure:          Number(rawBody.tenure),
      PhoneService:    String(rawBody.PhoneService),
      MultipleLines:   String(rawBody.MultipleLines),
      InternetService: String(rawBody.InternetService),
      OnlineSecurity:  String(rawBody.OnlineSecurity),
      OnlineBackup:    String(rawBody.OnlineBackup),
      DeviceProtection:String(rawBody.DeviceProtection),
      TechSupport:     String(rawBody.TechSupport),
      StreamingTV:     String(rawBody.StreamingTV),
      StreamingMovies: String(rawBody.StreamingMovies),
      Contract:        String(rawBody.Contract),
      PaperlessBilling:String(rawBody.PaperlessBilling),
      PaymentMethod:   String(rawBody.PaymentMethod),
      MonthlyCharges:  Number(rawBody.MonthlyCharges),
      TotalCharges:    Number(rawBody.TotalCharges),
    };

    console.log("Sanitized payload being sent to Render:", JSON.stringify(payload));

    // Use AbortController with 55s timeout (Render free tier cold-starts can take ~30s)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 55000);

    let renderRes: Response;
    try {
      renderRes = await fetch(`${RENDER_API}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeoutId);
    }

    const text = await renderRes.text();
    console.log("Render response status:", renderRes.status, "body:", text.slice(0, 500));

    if (!renderRes.ok) {
      return new Response(
        JSON.stringify({ error: `Render API error ${renderRes.status}`, detail: text }),
        { status: renderRes.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(text, {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    const isTimeout = err instanceof Error && err.name === "AbortError";
    const detail = isTimeout
      ? "Render backend timed out. The free-tier server may be cold-starting — please retry in 30 seconds."
      : String(err);
    console.error("Proxy error:", detail);
    return new Response(
      JSON.stringify({ error: "Proxy error", detail }),
      { status: isTimeout ? 504 : 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
