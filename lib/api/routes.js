export const API_ROUTES = {
  AUTH: {
    LOGIN: "/api/auth/login",
    REGISTER: "/api/auth/register",
    SEND_OTP: "/api/auth/send-otp",
    RESET_PASSWORD: "/api/auth/change-password",
    VERIFY_OTP: "/api/auth/verify-otp",
    UPDATE_ROLE: "api/auth/update-role",
  },
  // Add more route categories as needed
  USER: {
    UPDATE: "/api/user-update",
    GET: "/api/user-info",
    COLLABORATION: "/api/collaboration",
  },
  // Add this CONTRIBUTOR section
  CONTRIBUTOR: {
    GET_PROFILE: (id) => `/api/collaborators/${id}`,
    UPDATE_PROFILE: (id) => `/api/collaborators/${id}`,
    GET_GIGS: (id) => `/api/contributor-gigs/${id}`,
    CREATE_GIGS: `/api/contributor-gigs`,
  },
  ARTIST: {
    GET_PROFILE: (search) => `/api/artist?search=${search}`,
  },
};
