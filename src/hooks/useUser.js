import { useContext } from "react";
import { userContext } from "../contexts/UserContext";

export default function useUser() {
  return useContext(userContext);
}
