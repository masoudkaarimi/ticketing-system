export const getTicketsAdminApi = async () => {
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

export const newTicketApi = async (body) => {
  const access_token = localStorage.getItem("access_token") || false;
  const formData = new FormData();

  formData.append("parent", body?.parent);
  formData.append("title", body?.title);
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

export const ticketActionApi = async (id, type, value) => {
  const access_token = localStorage.getItem("access_token") || false;

  const response = await fetch(`/api/tickets/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    body: { type, value },
  });

  const data = await response.json();

  if (response.status === 200) {
    return data;
  } else {
    throw new Error(data.error);
  }
};
