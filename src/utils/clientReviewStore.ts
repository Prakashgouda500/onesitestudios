export interface RegisteredClient {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  projectType: string;
  budget?: string;
  registeredAt: string;
}

export interface ClientReview {
  id: string;
  name: string;
  email: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  projectType?: string;
  verified: boolean;
  createdAt: string;
}

const REGISTERED_CLIENTS_KEY = "onesite_registered_clients";
const CURRENT_CLIENT_KEY = "onesite_current_client";
const CLIENT_REVIEWS_KEY = "onesite_client_reviews";

// Normalize email for consistent matching
const normalizeEmail = (email: string) => email.trim().toLowerCase();

export const getRegisteredClients = (): RegisteredClient[] => {
  try {
    const raw = localStorage.getItem(REGISTERED_CLIENTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.error("Error reading registered clients from localStorage:", error);
    return [];
  }
};

export const registerClient = (
  clientData: Omit<RegisteredClient, "id" | "registeredAt">
): RegisteredClient => {
  const clients = getRegisteredClients();
  const normalized = normalizeEmail(clientData.email);

  const existingIndex = clients.findIndex(
    (c) => normalizeEmail(c.email) === normalized
  );

  const clientRecord: RegisteredClient = {
    ...clientData,
    id: existingIndex >= 0 ? clients[existingIndex].id : `client_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    registeredAt: existingIndex >= 0 ? clients[existingIndex].registeredAt : new Date().toISOString(),
  };

  if (existingIndex >= 0) {
    clients[existingIndex] = clientRecord;
  } else {
    clients.push(clientRecord);
  }

  try {
    localStorage.setItem(REGISTERED_CLIENTS_KEY, JSON.stringify(clients));
    localStorage.setItem(CURRENT_CLIENT_KEY, JSON.stringify(clientRecord));
    window.dispatchEvent(new CustomEvent("onesite_client_registered", { detail: clientRecord }));
  } catch (error) {
    console.error("Error saving registered client to localStorage:", error);
  }

  return clientRecord;
};

export const getCurrentClient = (): RegisteredClient | null => {
  try {
    const raw = localStorage.getItem(CURRENT_CLIENT_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (error) {
    console.error("Error reading current client from localStorage:", error);
    return null;
  }
};

export const findClientByEmail = (email: string): RegisteredClient | undefined => {
  const clients = getRegisteredClients();
  const normalized = normalizeEmail(email);
  return clients.find((c) => normalizeEmail(c.email) === normalized);
};

export const getClientReviews = (): ClientReview[] => {
  try {
    const raw = localStorage.getItem(CLIENT_REVIEWS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.error("Error reading client reviews from localStorage:", error);
    return [];
  }
};

export const submitClientReview = (reviewInput: {
  email: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
}): { success: boolean; error?: string; review?: ClientReview } => {
  const client = findClientByEmail(reviewInput.email);

  if (!client) {
    return {
      success: false,
      error: "Only clients who have registered a project with OneSiteStudios are authorized to submit a review.",
    };
  }

  const newReview: ClientReview = {
    id: `rev_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name: reviewInput.name.trim() || client.name,
    email: normalizeEmail(reviewInput.email),
    role: reviewInput.role.trim() || "Client",
    company: reviewInput.company.trim() || client.company || "Verified Project",
    quote: reviewInput.quote.trim(),
    rating: Math.min(5, Math.max(1, reviewInput.rating || 5)),
    projectType: client.projectType,
    verified: true,
    createdAt: new Date().toISOString(),
  };

  const reviews = getClientReviews();
  reviews.unshift(newReview);

  try {
    localStorage.setItem(CLIENT_REVIEWS_KEY, JSON.stringify(reviews));
    window.dispatchEvent(new CustomEvent("onesite_review_added", { detail: newReview }));
  } catch (error) {
    console.error("Error saving review to localStorage:", error);
  }

  return { success: true, review: newReview };
};
