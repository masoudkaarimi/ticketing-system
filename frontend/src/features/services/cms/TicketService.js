// TODO Best practice for this example, each service be with in their group (Folder structure -> for example cms folder)
export const getTicketsAdminApi = async () => {
    const access_token = localStorage.getItem("access_token") || false;
    const response = await fetch("/api/cms/tickets/", {
        method : "GET",
        headers: {
            "Content-Type": "application/json",
            Accept        : "application/json",
            Authorization : `Bearer ${access_token}`
        }
    });

    return response.json();
};

export const addNewTicketAdminApi = async (body) => {
    const access_token = localStorage.getItem("access_token") || false;
    const formData = new FormData();

    formData.append("parent", body?.parent);
    formData.append("title", body?.title);
    formData.append("priority", body?.priority);
    formData.append("message", body?.message);
    formData.append("attachment", body?.attachment);

    const response = await fetch(`/api/cms/tickets/`, {
        method : "POST",
        headers: {
            Accept       : "application/json",
            Authorization: `Bearer ${access_token}`
        },
        body   : formData
    });

    return response.json();
};

export const ticketActionAdminApi = async (id, type, value) => {
    const access_token = localStorage.getItem("access_token") || false;
    const body = JSON.stringify({
        type: type,
        value: value
    })
    const response = await fetch(`/api/cms/tickets/action/${id}/`, {
                  method: "PATCH",
                  headers: {
                      "Content-Type": "application/json",
                      Accept: "application/json",
                      Authorization: `Bearer ${access_token}`,
                  },
                  body:body,
              }
          )
    ;

    const data = await response.json();

    if (response.status === 200) {
        return data;
    } else {
        throw new Error(data.error);
    }
};
