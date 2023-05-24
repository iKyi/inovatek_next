export const setConsentCookie = (value: boolean) => {
  localStorage.setItem("consent", value.toString());
};

export const getConsentCookie = () => {
  return localStorage.getItem("consent");
};
