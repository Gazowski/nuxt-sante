


export const handleAPI = async (apiUrl: string, options: Object = {}): Promise<Object> => {
    const config = useRuntimeConfig();
    const baseApiUrl = config.public.apiBase;
    // const baseApiUrl = 'http://localhost:3013/';
    const { data } = await useFetch(`${baseApiUrl}/api/${apiUrl}`, {
        ...options,
        onRequestError({ request, options, error }) {
            // Handle the request errors
            console.log('onRequestError', error);
            console.log('onRequestError', options);
            console.log('onRequestError', request);
        },
        onResponse({ request, response, options }) {
            if (response.ok) {
                // toast.add({ severity: 'success', summary: 'Profil créé', detail: response._data.message, life: 8000 });
                console.log('onResponse', response);
            }
        },
        onResponseError({ request, response, options }) {
            // Handle the response errors
            if (!response.ok) {
                // toast.add({ severity: 'error', summary: 'Erreur', detail: response._data.error, life: 8000 });
                console.log('onResponseError', response._data.error);
            }
        }
    });

    return data;
};

