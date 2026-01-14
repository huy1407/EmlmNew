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
