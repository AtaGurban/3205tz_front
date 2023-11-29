type FormDataInput = {
  [key: string]: string | Date | number | File | Blob | null;
};
interface queryType {
  [key: string]: string | number | Date | undefined;
}

export function objectToFormData(obj: FormDataInput): FormData {
  const formData = new FormData();

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      if (!value) continue
      if (value instanceof Date) {
        formData.append(key, value.toISOString()); // преобразуем дату в строку
      } else if (value instanceof File) {
        formData.append(key, value); // если value - объект типа File, просто добавляем его в FormData
      } else {
        formData.append(key, value.toString());
      }
    }
  }

  return formData;
}


export const buildQueryParams = (params:queryType) => {
  const queryParams = [];

  for (const key in params) {
    if (Object.prototype.hasOwnProperty.call(params, key)) {
      const value = params[key];
      if (value){
        queryParams.push(`${key}=${encodeURIComponent(value.toString())}`);
      }
    }
  }

  return queryParams.join('&');
};