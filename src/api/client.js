import { API_BASE_URL } from "./config";

async function request(path, options = {}) {
  const url = API_BASE_URL + path;
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });

  const text = await res.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch (e) {
    data = { raw: text };
  }

  if (!res.ok) {
    const msg = data?.error || data?.message || `HTTP ${res.status}`;
    throw new Error(msg);
  }
  return data;
}

export async function fetchCompanies() {
  const data = await request("/companies");
  return data.items || [];
}

export async function createCompany(payload) {
  const data = await request("/companies", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return data.item;
}

export async function deleteCompany(id) {
  const data = await request(`/companies/${id}`, { method: "DELETE" });
  return data;
}

export async function fetchCaseStudies() {
  const data = await request("/case-studies");
  return data.items || [];
}

/**
 * Fetch news from VCCA SOAP API
 * Parses SOAP XML response and returns formatted news items
 */
export async function fetchNews() {
  const SOAP_URL = "https://www.emlm.top";
  const soapBody = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
        <VccaListTin1 xmlns="http://tempuri.org/" />
      </soap:Body>
    </soap:Envelope>`;

  try {
    const response = await fetch(SOAP_URL + "/VccaListTin1", {
      method: "POST",
      headers: {
        "SOAPAction": "http://tempuri.org/VccaListTin1",
        "Content-Type": "text/xml; charset=utf-8",
      },
      body: soapBody,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const xmlText = await response.text();

    // Parse SOAP XML response
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "text/xml");

    // Extract the result string from SOAP response
    const resultElement = xmlDoc.querySelector("VccaListTin1Result");
    if (!resultElement) {
      console.warn("No VccaListTin1Result found in SOAP response");
      return [];
    }

    const resultText = resultElement.textContent || "";

    // Parse JSON array from result
    let newsArray = [];
    if (resultText) {
      try {
        // Try to parse as JSON directly
        if (resultText.startsWith("[")) {
          newsArray = JSON.parse(resultText);
        } else {
          // Wrap in array if needed
          newsArray = JSON.parse(`[${resultText}]`);
        }
      } catch (e) {
        console.error("Failed to parse news JSON:", e);
        return [];
      }
    }

    // Transform API response to NewsItem format
    return newsArray.map((item, index) => ({
      id: item.id || `news-${index}`,
      title: item.title || item.tieu_de || "Untitled",
      summary: item.summary || item.tom_tat || (item.content || "").substring(0, 150),
      content: item.content || item.noi_dung || "",
      sourceUrl: item.sourceUrl || item.link || undefined,
      publishedAt: item.publishedAt || item.ngay_tao || new Date().toISOString(),
    }));
  } catch (error) {
    console.error("Error fetching news from VCCA API:", error);
    return [];
  }
}
