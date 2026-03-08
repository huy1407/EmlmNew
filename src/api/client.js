import { API_BASE_URL, BASE_API_URL_VCCA } from "./config";

// Standard REST API request function
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

// SOAP API request function for VCCA endpoints
async function soapRequest(endpoint, soapBody, soapAction) {
  try {
    const response = await fetch(BASE_API_URL_VCCA + endpoint, {
      method: "POST",
      headers: {
        "SOAPAction": soapAction,
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
    
    // Check for SOAP fault
    const fault = xmlDoc.querySelector("soap\\:Fault, Fault");
    if (fault) {
      const faultString = fault.querySelector("faultstring")?.textContent || "SOAP Fault";
      throw new Error(faultString);
    }
    
    return xmlDoc;
  } catch (error) {
    console.error("SOAP request error:", error);
    throw error;
  }
}

// Parse news item from response data
function parseNewsItem(item, index = 0) {
  return {
    id: item.sId || item.id || `news-${index}`,
    title: item.sTieuDe || item.tieu_de || item.title || "Untitled",
    summary: item.sTomTat || item.tom_tat || item.summary || (item.sNoidung || item.content || "").substring(0, 150),
    content: item.sNoidung || item.noi_dung || item.content || "",
    sourceUrl: item.sLuotxem || item.link || undefined,
    publishedAt: item.dNgayTao || item.ngay_tao || item.publishedAt || new Date().toISOString(),
  };
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
 * Fetch news list from VCCA SOAP API
 * @returns {Promise<Array>} Array of news items
 */
export async function getListNews() {
  return new Promise((resolve, reject) => {
    const soapBody = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
        <VccaListTin1 xmlns="http://tempuri.org/" />
      </soap:Body>
    </soap:Envelope>`;

    soapRequest("/VccaListTin1", soapBody, "http://tempuri.org/VccaListTin1")
      .then((xmlDoc) => {
        // Extract the result element
        const resultElement = xmlDoc.querySelector("VccaListTin1Result");
        if (!resultElement) {
          console.warn("No VccaListTin1Result found in SOAP response");
          resolve([]);
          return;
        }

        const resultText = resultElement.textContent || "";
        let newsArray = [];

        if (resultText) {
          try {
            // Parse JSON response
            newsArray = JSON.parse(resultText);
            // Ensure it's an array
            if (!Array.isArray(newsArray)) {
              newsArray = [newsArray];
            }
          } catch (e) {
            console.error("Failed to parse news JSON:", e);
            resolve([]);
            return;
          }
        }

        // Transform to NewsItem format
        const formattedNews = newsArray.map((item, index) => parseNewsItem(item, index));
        resolve(formattedNews);
      })
      .catch((error) => {
        console.error("Error fetching news list:", error);
        reject(error);
      });
  });
}

/**
 * Fetch detailed news by ID from VCCA SOAP API
 * @param {string} sId - News ID
 * @returns {Promise<Object>} News item details
 */
export async function getNewsDetail(sId) {
  return new Promise((resolve, reject) => {
    const soapBody = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <VccaTin xmlns="http://tempuri.org/">
          <sId>${sId}</sId>
        </VccaTin>
      </soap:Body>
    </soap:Envelope>`;

    soapRequest(`/VccaTin?sId=${sId}`, soapBody, "http://tempuri.org/VccaTin")
      .then((xmlDoc) => {
        const resultElement = xmlDoc.querySelector("VccaTinResult");
        if (!resultElement) {
          console.warn("No VccaTinResult found in SOAP response");
          resolve(null);
          return;
        }

        const resultText = resultElement.textContent || "";
        if (!resultText) {
          resolve(null);
          return;
        }

        try {
          const item = JSON.parse(resultText);
          const formattedNews = parseNewsItem(item, 0);
          resolve(formattedNews);
        } catch (e) {
          console.error("Failed to parse news detail JSON:", e);
          reject(e);
        }
      })
      .catch((error) => {
        console.error("Error fetching news detail:", error);
        reject(error);
      });
  });
}

/**
 * Fetch news list (wrapper for getListNews with error handling)
 * @returns {Promise<Array>} Array of news items, empty array on error
 */
export async function fetchNews() {
  try {
    const news = await getListNews();
    return news || [];
  } catch (error) {
    console.error("Error fetching news from VCCA API:", error);
    return [];
  }
}
