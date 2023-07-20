export const getTicketsApi = async () => {
  const access_token = localStorage.getItem("access_token") || false;
  const response = await fetch("/api/tickets/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });

  return response.json();
};

export const retrieveTicketApi = async (id) => {
  const access_token = localStorage.getItem("access_token") || false;
  const response = await fetch(`/api/tickets/${id}/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });

  return response.json();
};

export const retrieveTicketCategoriesApi = async () => {
  const access_token = localStorage.getItem("access_token") || false;

  const response = await fetch(`/api/tickets/category/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });

  return response.json();
};

export const retrieveTicketPrioritiesApi = async () => {
  const access_token = localStorage.getItem("access_token") || false;

  const response = await fetch(`/api/tickets/priority/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });

  return response.json();
};

export const replyTicketApi = async (body) => {
  const access_token = localStorage.getItem("access_token") || false;
  const formData = new FormData();

  formData.append("parent", body?.parent);
  formData.append("title", body?.title);
  formData.append("category", body?.category || '');
  formData.append("priority", body?.priority);
  formData.append("message", body?.message);
  formData.append("attachment", body?.attachment);

  const response = await fetch(`/api/tickets/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    body: formData,
  });

  return response.json();
};

export const addTicketApi = async (body) => {
  const access_token = localStorage.getItem("access_token") || false;
  const formData = new FormData();

  formData.append("title", body?.title);
  formData.append("category", body?.category);
  formData.append("priority", body?.priority);
  formData.append("message", body?.message);
  formData.append("attachment", body?.attachment);

  const response = await fetch(`/api/tickets/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    body: formData,
  });

  return response.json();
};
