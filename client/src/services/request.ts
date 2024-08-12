type PrimitiveDataType = number | string | boolean | null | FileList | File;
type NestedDataType = PrimitiveDataType | NestedObject | NestedDataType[];

interface NestedObject {
    [key: string]: NestedDataType;
}

type DataType = PrimitiveDataType | NestedObject;

const parseJSON = (data: NestedObject): FormData => {
    const formData = new FormData();

    for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
            const value = data[key];

            if (key === "files") {
                if (value instanceof FileList) {
                    if (value.length > 0) {
                        formData.append("files", value[0]);
                    }
                } else if (Array.isArray(value)) {
                    (value as File[]).forEach((file) => {
                        formData.append("files", file);
                    });
                }
            } else if (typeof value === "object" && value !== null && !(value instanceof File)) {
                formData.append(key, JSON.stringify(value));
            } else {
                formData.append(key, value as string | Blob);
            }
        }
    }

    return formData;
};

type MethodType = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD";
type RequestType = "FORM_DATA" | "JSON";
type RequestHeadersType = {
    [key: string]: string;
};

type RequestInitType = {
    method: MethodType;
    headers: RequestHeadersType;
    body?: FormData | string;
};

const createHeaders = (type: RequestType): RequestHeadersType => {
    const headers: RequestHeadersType = {};
    const token = localStorage.getItem("token");

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    if (type === "JSON") {
        headers["Content-Type"] = "application/json";
    }

    return headers;
};

const prepareBody = (data: DataType, type: RequestType): FormData | string | undefined => {
    if (!data) return undefined;

    if (type === "JSON") {
        return JSON.stringify(data);
    } else {
        return parseJSON(data as NestedObject);
    }
};

const request = async (
    url: string,
    data: DataType = null,
    method: MethodType = "GET",
    type: RequestType = "FORM_DATA"
): Promise<Response> => {
    const options: RequestInitType = {
        method,
        headers: createHeaders(type),
        body: prepareBody(data, type),
    };

    try {
        const response = await fetch(url, options);
        return response;
    } catch (error) {
        console.error("Hata oluştu:", error);
        throw error;
    }
};

// API metotları
const createRequestFunction =
    (method: MethodType, type: RequestType = "FORM_DATA") =>
    (url: string, data?: DataType) =>
        request(url, data, method, type);

export const get = createRequestFunction("GET");
export const post = createRequestFunction("POST");
export const postJSON = createRequestFunction("POST", "JSON");
export const put = createRequestFunction("PUT");
export const putJSON = createRequestFunction("PUT", "JSON");
export const del = createRequestFunction("DELETE");
export const delJSON = createRequestFunction("DELETE", "JSON");
export const patch = createRequestFunction("PATCH");
export const patchJSON = createRequestFunction("PATCH", "JSON");
export const head = createRequestFunction("HEAD");
export const headJSON = createRequestFunction("HEAD", "JSON");
