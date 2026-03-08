import axios from "axios";
import { API_BASE_URL, BASE_API_URL_VCCA } from "./config";

// VCCA API client for SOAP requests using axios
const apiRootVCCA = {
  get: (url, soapBody, options = {}) => {
    return axios.get(url, {
      data: soapBody,
      headers: {
        "Content-Type": "text/xml; charset=utf-8",
        ...options.headers,
      },
      transformResponse: [(data) => data],
    });
  },
};

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

// Parse news item from response data
function parseNewsItem(item, index = 0) {
  return {
    id: item.sId || item.id || `news-${index}`,
    title: item.sTieuDe || item.tieu_de || item.title || "Untitled",
    summary: item.sTomTat || item.tom_tat || item.summary || (item.sNoidung || item.content || "").substring(0, 150),
    content: item.sNoidung || item.noi_dung || item.content || "",
    sourceUrl: item.sLink || item.link || item.sourceUrl || undefined,
    publishedAt: item.dNgayTao || item.ngay_tao || item.publishedAt || new Date().toISOString(),
    imageUrl: item.sHinhDaiDien || item.hinh_dai_dien || item.sHinh || item.hinh || item.imageUrl || undefined,
    modify: item.dNgayCapNhat || item.ngay_cap_nhat || item.modify || item.dNgayTao || item.ngay_tao || undefined,
    category_ids: item.category_ids || item.danh_muc || item.category || undefined,
    files_url: item.files_url || item.sHinhDaiDien || item.hinh_dai_dien || undefined,
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
export const xmlStringToList=(xml) =>{
  // 1) Lấy nội dung bên trong thẻ <string ...>...</string>
  // (dùng regex gọn nhẹ; nếu chạy trong browser có thể dùng DOMParser – xem bên dưới)
  const match = xml.match(/<string\b[^>]*>([\s\S]*?)<\/string>/i);
  if (!match) throw new Error("Không tìm thấy thẻ <string> trong XML.");
  // Nội dung văn bản bên trong <string>...</string>
  let inner = match[1].trim();

  // 2) Nếu chưa phải là JSON array, bọc thêm [ ... ]
  if (!inner.startsWith("[") || !inner.endsWith("]")) {
    inner = `[${inner}]`;
  }

  // 3) Parse JSON -> trả về mảng object
  return JSON.parse(inner);
}
export const getListNews = () =>
  new Promise((resolve, reject) => {
    const xmls = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
        <VccaListTin1 xmlns="http://tempuri.org/" />
      </soap:Body>
    </soap:Envelope>`;
    apiRootVCCA
      .get(BASE_API_URL_VCCA + "/VccaListTin1", xmls, {
        headers: {
          SOAPAction: "http://tempuri.org/VccaListTin1",
          "Content-Type": "text/xml; charset=utf-8",
        },
      })
      .then((response) => {
        const xmlText = response.data;
        console.log( xmlStringToList(response.data))
        const formattedNews =xmlStringToList(response.data);
        resolve(formattedNews);
      })
      .catch((error) => {
        console.error("Error fetching news list:", error);
        reject(error);
      });
  });

/**
 * Fetch detailed news by ID from VCCA SOAP API
 * @param {string} sId - News ID
 * @returns {Promise<Object>} News item details
 */
export const getNewsDetail = (sId) =>
  new Promise((resolve, reject) => {
    const xmls = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <VccaTin xmlns="http://tempuri.org/">
          <sId>${sId}</sId>
        </VccaTin>
      </soap:Body>
    </soap:Envelope>`;

    apiRootVCCA
      .get(BASE_API_URL_VCCA + `/VccaTin?sId=${sId}`, xmls, {
        headers: {
          SOAPAction: "http://tempuri.org/VccaTin",
          "Content-Type": "text/xml; charset=utf-8",
        },
      })
      .then((response) => {
        const xmlText = response.data;
        // Parse SOAP XML response
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "text/xml");

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

/**
 * Fetch multi-level marketing companies from VCCA SOAP API
 * @returns {Promise<Array>} Array of MLM companies
 */
export const getListCompany = () =>
  new Promise((resolve, reject) => {
    let xmls = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
        <VccaListDNBHDC xmlns="http://tempuri.org/" />
    </soap:Body>
    </soap:Envelope>`;
    apiRootVCCA
      .get(BASE_API_URL_VCCA + '/VccaListDNBHDC', xmls, {
        headers: {
          SOAPAction: 'http://tempuri.org/VccaListDNBHDC',
          'Content-Type': 'text/xml; charset=utf-8',
        },
      })
      .then(response => {
        try {
          const companies = xmlStringToList(response.data);
          console.log("[v0] MLM companies fetched:", companies);
          resolve(companies);
        } catch (parseError) {
          console.error("[v0] Error parsing MLM companies:", parseError);
          reject(parseError);
        }
      })
      .catch(error => {
        console.error("[v0] Error fetching MLM companies:", error);
        reject(error);
      });
  });

/**
 * Fetch multi-level marketing company detail from VCCA SOAP API
 * @param {string} sId - Company ID
 * @returns {Promise} Company detail data
 */
export const getCompanyDetail = (sId) =>
  new Promise((resolve, reject) => {
    let xmls = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
    <VccaDNBHDCDetail xmlns="http://tempuri.org/">
        <sId>${sId}</sId>
    </VccaDNBHDCDetail>
    </soap:Body>
    </soap:Envelope>`;
    apiRootVCCA
      .get(BASE_API_URL_VCCA + '/VccaDNBHDCDetail?sId=' + sId, xmls, {
        headers: {
          SOAPAction: 'http://tempuri.org/VccaDNBHDCDetail',
          'Content-Type': 'text/xml; charset=utf-8',
        },
      })
      .then(response => {
        try {
          const detail = xmlStringToObject(response.data);
          console.log("[v0] MLM company detail fetched:", detail);
          resolve(detail);
        } catch (parseError) {
          console.error("[v0] Error parsing MLM company detail:", parseError);
          reject(parseError);
        }
      })
      .catch(error => {
        console.error("[v0] Error fetching MLM company detail:", error);
        reject(error);
      });
  });
