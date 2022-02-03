export const baseUrl = "https://frontend-take-home.fetchrewards.com/form";

export const getUsersData = async () => {
  try {
    const response = await fetch(baseUrl);
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};

